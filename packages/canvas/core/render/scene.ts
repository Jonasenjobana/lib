import { JoJoAnime } from "./anime";
import type { JoJoLayer } from "./layer";
export interface JoJoSceneOptions {
  el?: HTMLElement;
  width?: number;
  height?: number;
  background?: string; // 背景颜色 贴图地址
}
export class JoJoScene {
  constructor(el: HTMLElement, options: JoJoSceneOptions) {
    if (!el) {
      throw new Error("el is required");
    }
    const { width, height } = options;
    const div = document.createElement("div");
    div.classList.add("jojo-canvas");
    div.innerHTML = `
        <canvas style="width: 100%; height: 100%;" class="jojo-canvas-canvas"></canvas>
        <div class="jojo-canvas-dom-container"></div>
    `
    el.appendChild(div);
  }
  layers: JoJoLayer[] = [];
  anime: JoJoAnime = new JoJoAnime();
}
