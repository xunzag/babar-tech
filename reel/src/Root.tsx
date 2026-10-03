import { Composition } from "remotion";
import { DURATION, Reel } from "./Reel";
import { FPS } from "./theme";

export function Root() {
  return <Composition id="Reel" component={Reel} durationInFrames={DURATION} fps={FPS} width={1080} height={1920} />;
}
