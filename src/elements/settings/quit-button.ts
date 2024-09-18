import { SettingsScene } from "../../scenes";
import SettingsButton from "./button";

export default class QuitButton extends SettingsButton {
    constructor() {
        super("나가기");
    }

    public onUp(e: PointerEvent): void {
        SettingsScene().exitScene();
    }
}
