import { getMainScenario } from "../../scenario";
import { PlayerScene } from "../../scenes";
import { RunningEngine } from "../../state";
import MainMenuButton from "./button";

export default class StartButton extends MainMenuButton {
    constructor() {
        super("처음부터", "red");
    }

    public onUp(e: PointerEvent): void {
        // TODO: branch. if saved game: select chapter; else: start 0
        const playerScene = PlayerScene();
        RunningEngine().Scene = playerScene;
        playerScene.load(getMainScenario()); // instruct where the player to begin
    }
}
