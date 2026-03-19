export class Box {
  constructor() {}
  width: number = 0;
  height: number = 0;
  x: number = 0;
  y: number = 0;
  /**
   * 碰撞检测
   */
  checkCollision(box: Box): boolean;
  checkCollision(box: Box[]): boolean;
  checkCollision(box: Box[] | Box): boolean {
    if (Array.isArray(box)) {
      return box.some((item) => this.isIntersect(item));
    }
    return this.isIntersect(box);
  }
  /**
   * 相交
   */
  isIntersect(box: Box): boolean {
    const { x, y, width, height } = this;
    const { x: bx, y: by, width: bw, height: bh } = box;
    return (
      x < bx + bw &&
      x + width > bx &&
      y < by + bh &&
      y + height > by
    );
  }
}
