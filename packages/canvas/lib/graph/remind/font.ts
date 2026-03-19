import type { JoJoObject } from "../../../core/render/object";

export class JoJoFontArea {
    /**字体 */
    font: string = "sans-serif";
    /**字体大小 */
    fontSize: number = 16;
    /**字体颜色 */
    fontColor: string = "#000000";
    /**字体粗细 */
    fontWeight: number = 400;
    /**是否编辑编辑 */
    isEdit: boolean = false;
    parent: JoJoObject | null = null;
    constructor() {}
}