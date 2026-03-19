import type { Box } from "../class/box";
import { Vector } from "../class/vector";
import type { JoJoLayer } from "./layer";

export abstract class JoJoObject {
  constructor() {}
  abstract position: Vector | null
  abstract angle: number | null
  abstract scale: number | null
  abstract aabb: Box | null
  children: JoJoObject[] = [];
  parent: JoJoObject | null = null;
  layer: JoJoLayer | null = null;
  abstract draw(): void;
}