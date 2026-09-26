"use client";

import { useCallback, useSyncExternalStore } from "react";

const noop = () => () => {};

/** `Date.now()` rounded to `step` ms and ticking on the boundary; null during SSR/hydration. */
export function useNow(step = 1000) {
  const subscribe = useCallback(
    (cb: () => void) => {
      let t: number;
      const tick = () => {
        cb();
        t = window.setTimeout(tick, step - (Date.now() % step));
      };
      t = window.setTimeout(tick, step - (Date.now() % step));
      return () => window.clearTimeout(t);
    },
    [step],
  );
  return useSyncExternalStore(subscribe, () => Math.floor(Date.now() / step) * step, () => null);
}

/** The visitor's IANA time zone; null during SSR/hydration. */
export function useTimeZone() {
  return useSyncExternalStore(
    noop,
    () => {
      try { return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"; } catch { return "UTC"; }
    },
    () => null,
  );
}

const fmtCache = new Map<string, Intl.DateTimeFormat>();
export function fmtTime(ms: number, timeZone: string, seconds = false) {
  const k = `${timeZone}|${seconds}`;
  let f = fmtCache.get(k);
  if (!f) {
    f = new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit", second: seconds ? "2-digit" : undefined, hour12: false });
    fmtCache.set(k, f);
  }
  return f.format(ms);
}

/** Hour of day (fractional) in a time zone. */
export function hourIn(ms: number, timeZone: string) {
  const [h, m] = fmtTime(ms, timeZone).split(":").map(Number);
  return (h % 24) + m / 60;
}

/** Offset in hours of a time zone relative to UTC at a given instant. */
export function tzOffset(ms: number, timeZone: string) {
  const d = new Date(ms);
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })
    .formatToParts(d)
    .reduce<Record<string, string>>((a, p) => ((a[p.type] = p.value), a), {});
  const asUTC = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute);
  return Math.round((asUTC - Math.floor(ms / 60000) * 60000) / 36e5 * 4) / 4;
}
