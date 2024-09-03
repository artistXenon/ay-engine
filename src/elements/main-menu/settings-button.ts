import { SettingsScene } from "../../scenes";
import { RunningEngine } from "../../state";
import MainMenuButton from "./button";

export default class SettingsButton extends MainMenuButton {
    constructor() {
        super("설정", "green");
    }

    public onUp(e: PointerEvent): void {
        RunningEngine().Scene = SettingsScene();
    }
}
