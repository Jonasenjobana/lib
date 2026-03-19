import type { Box } from "../../../core/class/box";
import type { Vector } from "../../../core/class/vector";
import { JoJoObject } from "../../../core/render/object";

/**
 * 思维导图
 */
export class RemindRect extends JoJoObject {
  position: Vector | null = null;
  angle: number | null = null;
  scale: number | null = null;
  aabb: Box | null = null;
  /**宽度 */
  width: number = 1;
  /**高度 */
  height: number = 1;
  /**颜色 */
  color: string = "#000000";
  constructor() {
    super();
  }
  checkCollision(): boolean {
      throw new Error("Method not implemented.");
  }
  draw(): void {
    throw new Error("Method not implemented.");
  }
}
 