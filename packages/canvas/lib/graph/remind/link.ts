import type { Box } from "../../../core/class/box";
import type { Vector } from "../../../core/class/vector";
import { JoJoObject } from "../../../core/render/object";

export class RemindLinkPoint extends JoJoObject {
  position: Vector | null = null;
  angle: number | null = null;
  scale: number | null = null;
  aabb: Box | null = null;
  constructor() {
    super();
  }
  draw(): void {
    throw new Error("Method not implemented.");
  }
}