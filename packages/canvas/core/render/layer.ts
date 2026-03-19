import type { JoJoObject } from "./object";

export class JoJoLayer {
  constructor() {}
  /**
   * 层级
   */
  index: number = 0;
  objects: JoJoObject[] = [];
}