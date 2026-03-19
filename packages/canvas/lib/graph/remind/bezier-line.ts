import { JoJoObject } from "../../../core/render/object";
import type { Vector } from "../../../core/class/vector";
import type { Box } from "../../../core/class/box";

export class RemindBezierLine extends JoJoObject {
  position: Vector | null = null;
  angle: number | null = null;
  scale: number | null = null;
  aabb: Box | null = null;
  /**单箭头、双箭头、线 */
  type: 'arrow' | 'dblArrow' | 'line' = 'arrow';
  /**
   * 起始点
   */
  startPoint: Vector | null = null;
  /**
   * 终点
   */
  endPoint: Vector | null = null;
  /**
   * 控制点
   */
  controlPoint: Vector | null = null;
  /**
   * 控制点2
   */
  controlPoint2: Vector | null = null;
  /**
   * 颜色
   */
  color: string = "#000000";
  /**
   * 宽度
   */
  width: number = 1;
  constructor() {
    super();
  }
  draw(): void {
    throw new Error("Method not implemented.");
  }
}