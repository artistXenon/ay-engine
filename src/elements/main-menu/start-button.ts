import { getMainScenario, getSaves } from "../../scenario";
import { PlayerScene } from "../../scenes";
import { RunningEngine } from "../../state";
import MainMenuButton from "./button";

export default class StartButton extends MainMenuButton {
    constructor() {
        super("처음부터", "red");
    }

    public onUp(e: PointerEvent): void {
        // TODO: head-is-empty check should be updated passively
        const saves = getSaves();
        if (saves.IsHeadEmpty) {
            const playerScene = PlayerScene();
            RunningEngine().Scene = playerScene;
            playerScene.load(getMainScenario(), saves.Head); // instruct where the player to begin
        } else {
            // TODO: show chapter screen wow so hard
        }
    }
}
