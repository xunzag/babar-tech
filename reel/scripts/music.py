"""
Original soundtrack for the Babar Tech reel, synthesised from scratch (no samples),
so it is free to use anywhere. 120 BPM, A minor, Am-F-C-G, 17 bars = 34 s.

Arrangement follows the edit (one bar = 2 s = 60 video frames):
  bars 0-1   hook      filtered pad, ticking hats, riser, snare build
  bars 2-9   brand/list/services   DROP: full groove
  bars 10-11 hours     breakdown (no kick), arp + pad, riser back in
  bars 12-14 proof     second drop
  bars 15-16 CTA       groove, then final chord rings out
Run: python3 scripts/music.py  ->  public/music.wav
"""
import wave
from pathlib import Path

import numpy as np
from scipy.signal import butter, lfilter

SR = 44100
BPM = 120
BEAT = 60 / BPM
BAR = BEAT * 4
BARS = 17
LEN = int(SR * (BARS * BAR + 0.0))
rng = np.random.default_rng(7)


def t_of(sec):
    return int(round(sec * SR))


def env_exp(n, decay):
    return np.exp(-np.arange(n) / (decay * SR))


def lp(x, hz, order=2):
    b, a = butter(order, min(hz, SR / 2 - 100) / (SR / 2), "low")
    return lfilter(b, a, x)


def hp(x, hz, order=2):
    b, a = butter(order, hz / (SR / 2), "high")
    return lfilter(b, a, x)


def bp(x, lo, hi, order=2):
    b, a = butter(order, [lo / (SR / 2), hi / (SR / 2)], "band")
    return lfilter(b, a, x)


def note_hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


def add(buf, sig, start):
    s = t_of(start)
    e = min(len(buf), s + len(sig))
    if e > s:
        buf[s:e] += sig[: e - s]


# ── instruments ───────────────────────────────────────────────
def kick():
    n = t_of(0.45)
    t = np.arange(n) / SR
    f = 45 + 110 * np.exp(-t * 28)
    ph = 2 * np.pi * np.cumsum(f) / SR
    body = np.sin(ph) * env_exp(n, 0.16)
    click = hp(rng.standard_normal(n), 3000) * env_exp(n, 0.004) * 0.25
    return np.tanh((body + click) * 1.6)


def clap():
    n = t_of(0.35)
    noise = bp(rng.standard_normal(n), 900, 2600)
    e = np.zeros(n)
    for off in (0, 0.011, 0.022):
        s = t_of(off)
        e[s:] += env_exp(n - s, 0.012 if off < 0.02 else 0.11)
    return noise * e * 0.55


def hat(open_=False):
    n = t_of(0.22 if open_ else 0.06)
    return hp(rng.standard_normal(n), 7500) * env_exp(n, 0.09 if open_ else 0.018) * (0.16 if open_ else 0.13)


def saw(f, n, detune=(0.0,), phase_rand=True):
    t = np.arange(n) / SR
    out = np.zeros(n)
    for d in detune:
        ff = f * 2 ** (d / 1200)
        ph = rng.random() if phase_rand else 0
        out += 2 * ((t * ff + ph) % 1) - 1
    return out / len(detune)


def pad_chord(notes, dur, cutoff):
    n = t_of(dur)
    sig = sum(saw(note_hz(m), n, detune=(-9, 0, 8)) for m in notes) / len(notes)
    a = np.minimum(1, np.arange(n) / t_of(0.25))
    r = np.minimum(1, (n - np.arange(n)) / t_of(0.3))
    return lp(sig, cutoff, 2) * a * r * 0.32


def bass_note(m, dur):
    n = t_of(dur)
    t = np.arange(n) / SR
    f = note_hz(m)
    sig = np.sin(2 * np.pi * f * t) * 0.55 + lp(saw(f, n, phase_rand=False), 1400) * 0.6
    e = np.minimum(1, np.arange(n) / t_of(0.005)) * np.minimum(1, (n - np.arange(n)) / t_of(0.03))
    return np.tanh(sig * e * 1.4) * 0.5


def pluck(m, dur=0.22):
    n = t_of(dur)
    t = np.arange(n) / SR
    f = note_hz(m)
    sq = np.sign(np.sin(2 * np.pi * f * t)) * 0.4 + np.sin(2 * np.pi * f * 2 * t) * 0.3
    return lp(sq, 4200) * env_exp(n, 0.07) * 0.16


def bell(m, dur=0.7):
    n = t_of(dur)
    t = np.arange(n) / SR
    f = note_hz(m)
    mod = np.sin(2 * np.pi * f * 3.5 * t) * 2.2 * env_exp(n, 0.08)
    sig = np.sin(2 * np.pi * f * t + mod) + 0.3 * np.sin(2 * np.pi * f * 2 * t)
    return sig * env_exp(n, 0.28) * np.minimum(1, np.arange(n) / t_of(0.004)) * 0.2


# Lead motif, one bar per chord (quarter notes); None = rest
MELODY = [
    [76, 72, 74, 76],   # Am
    [77, 76, 72, None], # F
    [76, 74, 72, 67],   # C
    [74, 71, 74, 79],   # G
]


def riser(dur):
    n = t_of(dur)
    noise = rng.standard_normal(n)
    out = np.zeros(n)
    seg = t_of(0.05)
    for i in range(0, n, seg):
        p = i / n
        out[i:i + seg] = bp(noise[i:i + seg], 300 + 5000 * p ** 2, 900 + 9000 * p ** 2)
    return out * np.linspace(0, 1, n) ** 2.2 * 0.5


def impact():
    n = t_of(1.6)
    t = np.arange(n) / SR
    boom = np.sin(2 * np.pi * (38 + 40 * np.exp(-t * 6)) * t) * env_exp(n, 0.5)
    air = lp(rng.standard_normal(n), 2500) * env_exp(n, 0.35) * 0.35
    return np.tanh((boom + air) * 1.2) * 0.8


# ── arrangement ───────────────────────────────────────────────
# Am  F  C  G   (A3 voicings, bass an octave + below)
CHORDS = [(57, 60, 64, 69), (53, 57, 60, 65), (55, 60, 64, 67), (55, 59, 62, 67)]
ROOTS = [45, 41, 48, 43]

drums = np.zeros(LEN)
bass = np.zeros(LEN)
pads = np.zeros(LEN)
plucks = np.zeros(LEN)
lead = np.zeros(LEN)
fx = np.zeros(LEN)
kick_times = []

K, C, HC, HO = kick(), clap(), hat(), hat(True)

for bar in range(BARS):
    t0 = bar * BAR
    ci = bar % 4
    intro = bar < 2
    breakdown = bar in (10, 11)
    final = bar == BARS - 1

    # pad: dark in intro, open elsewhere, final chord rings longer
    cutoff = 900 + 700 * bar if intro else (2200 if breakdown else 4200)
    add(pads, pad_chord(CHORDS[ci], BAR + (1.5 if final else 0.05), cutoff), t0)

    for beat in range(4):
        tb = t0 + beat * BEAT
        if not intro and not breakdown and not final:
            add(drums, K, tb)
            kick_times.append(tb)
            if beat in (1, 3):
                add(drums, C, tb)
        if final and beat == 0:
            add(drums, K, tb)
            kick_times.append(tb)
        # hats: 16ths in the hook (ticking clock), 8ths + open offbeats in the groove
        if intro:
            for s in range(4):
                add(drums, HC * (0.6 + 0.4 * (s == 0)), tb + s * BEAT / 4)
        elif not final:
            add(drums, HC, tb)
            add(drums, HO if not breakdown else HC, tb + BEAT / 2)

        # bass: 8th notes on the root, octave jump on the last 8th of the bar
        if not intro and not breakdown and not final:
            for h in range(2):
                m = ROOTS[ci] + (12 if (beat == 3 and h == 1) else 0)
                add(bass, bass_note(m, BEAT / 2 * 0.9), tb + h * BEAT / 2)
        if final and beat == 0:
            add(bass, bass_note(ROOTS[ci], BAR * 0.9), tb)

        # arp: 16ths over chord tones, two octaves up (in from the drop, and in the breakdown)
        if not intro and not final:
            tones = [m + 12 for m in CHORDS[ci]]
            for s in range(4):
                idx = (beat * 4 + s) % 8
                seq = [0, 1, 2, 3, 2, 1, 3, 2]
                add(plucks, pluck(tones[seq[idx]]), tb + s * BEAT / 4)

    # lead melody in the two main grooves
    if 4 <= bar <= 9 or 12 <= bar <= 15:
        for beat, m in enumerate(MELODY[ci]):
            if m is not None:
                add(lead, bell(m), t0 + beat * BEAT)

    # snare build in the last beat of the hook
    if bar == 1:
        for s in range(8):
            add(drums, C * (0.35 + s * 0.08), t0 + 3 * BEAT + s * BEAT / 8)

# risers into the two drops, impacts on them
add(fx, riser(BAR * 2), 0)
add(fx, impact(), 2 * BAR)
add(fx, riser(BAR * 1.5), 10.5 * BAR)
add(fx, impact() * 0.8, 12 * BAR)

# sidechain: duck pads/arp/bass under every kick
duck = np.ones(LEN)
for kt in kick_times:
    s = t_of(kt)
    n = t_of(0.28)
    curve = 1 - 0.6 * np.exp(-np.arange(n) / (0.07 * SR))
    e = min(LEN, s + n)
    duck[s:e] = np.minimum(duck[s:e], curve[: e - s])
pads *= duck
plucks *= 0.6 + 0.4 * duck
bass *= 0.5 + 0.5 * duck

# simple feedback delay on the arp (dotted 8th), panned
d = t_of(BEAT * 0.75)
echo = np.zeros(LEN)
for i in range(1, 4):
    echo[d * i:] += plucks[: LEN - d * i] * (0.35 ** i)

lead_echo = np.zeros(LEN)
for i in range(1, 3):
    lead_echo[d * i:] += lead[: LEN - d * i] * (0.3 ** i)

# drums: tame the kick's sub, keep the click and claps forward
drums = hp(drums, 35) * 0.75
mono = drums + bass * 0.75 + pads * 1.5 + fx * 0.6 + lead * 1.1
left = mono + plucks * 1.6 + echo * 1.2 + lead_echo * 0.8
right = mono + plucks * 1.3 + np.roll(echo, t_of(0.012)) * 1.4 + np.roll(lead_echo, t_of(0.009)) * 0.8

# master: gentle glue saturation, fades, normalise to -1 dBFS
stereo = np.stack([left, right], axis=1)
stereo = np.tanh(stereo * 1.1)
fade_in = t_of(0.02)
fade_out = t_of(1.2)
stereo[:fade_in] *= np.linspace(0, 1, fade_in)[:, None]
stereo[-fade_out:] *= np.linspace(1, 0, fade_out)[:, None] ** 1.5
stereo /= np.max(np.abs(stereo)) / 10 ** (-1 / 20)

out = Path(__file__).resolve().parent.parent / "public" / "music.wav"
out.parent.mkdir(parents=True, exist_ok=True)
with wave.open(str(out), "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes((stereo * 32767).astype("<i2").tobytes())
print(f"wrote {out} ({LEN / SR:.1f}s)")
