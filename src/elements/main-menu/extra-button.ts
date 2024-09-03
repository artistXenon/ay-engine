import { ExtraScene } from "../../scenes";
import { RunningEngine } from "../../state";
import MainMenuButton from "./button";

export default class ExtraButton extends MainMenuButton {
    constructor() {
        super("엑스트라", "orange");
    }

    public onUp(e: PointerEvent): void {
        RunningEngine().Scene = ExtraScene();
    }
}
