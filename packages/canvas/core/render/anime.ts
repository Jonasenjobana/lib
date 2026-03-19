export class JoJoAnime {
  constructor() {}
  /**动画 */
  animeFlag: number | null = null;
  maxFrame: number = 30;
  lastFrame: number = Date.now();
  tickStack: Function[] = [];
  tick(cb: Function) {
    this.tickStack.push(cb);
  }
  start() {
    this.stop();
    this.animeFlag = requestAnimationFrame(() => {
      const now = Date.now();
      if (now - this.lastFrame < 1000 / this.maxFrame) {
        return;
      }
      this.lastFrame = now;
      this.tickStack.forEach((tick) => {
        tick();
      });
    });
  }
  /**停止动画 */
  stop() {
    if (this.animeFlag) {
      cancelAnimationFrame(this.animeFlag);
      this.animeFlag = null;
    }
  }
}
