import { AbsoluteFill, Html5Audio, Sequence, staticFile } from "remotion";
import { Brand } from "./scenes/Brand";
import { Cta } from "./scenes/Cta";
import { Hook } from "./scenes/Hook";
import { Hours } from "./scenes/Hours";
import { Proof } from "./scenes/Proof";
import { Services } from "./scenes/Services";
import { Todo } from "./scenes/Todo";
import { BAR } from "./theme";

/* Every cut sits on a bar line of the 120 BPM soundtrack (1 bar = 60 frames). */
export const SCENES = [
  { C: Hook, bars: 2 },
  { C: Brand, bars: 2 }, // drop
  { C: Todo, bars: 3 },
  { C: Services, bars: 3 },
  { C: Hours, bars: 2 }, // breakdown
  { C: Proof, bars: 3 }, // second drop
  { C: Cta, bars: 2 },
];

export const DURATION = SCENES.reduce((n, s) => n + s.bars * BAR, 0);

export function Reel() {
  let at = 0;
  return (
    <AbsoluteFill style={{ background: "#0f1114" }}>
      {SCENES.map(({ C, bars }, i) => {
        const from = at;
        at += bars * BAR;
        return (
          <Sequence key={i} from={from} durationInFrames={bars * BAR} premountFor={30}>
            <C />
          </Sequence>
        );
      })}
      <Html5Audio src={staticFile("music.wav")} />
    </AbsoluteFill>
  );
}
