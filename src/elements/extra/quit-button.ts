import { MainScene } from "../../scenes";
import { RunningEngine } from "../../state";
import ExtraButton from "./button";

export default class QuitButton extends ExtraButton {
    constructor() {
        super("나가기");
    }
    
    public onUp(e: PointerEvent): void {
        RunningEngine().Scene = MainScene();
    }
}