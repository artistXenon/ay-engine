import { SaveLoadScene } from "../../scenes";
import { RunningEngine } from "../../state";
import MainMenuButton from "./button";

export default class LoadButton extends MainMenuButton {
    constructor() {
        super("불러오기", "purple");
    }
    
    public onUp(e: PointerEvent): void {
        RunningEngine().Scene = SaveLoadScene();
    }
}
