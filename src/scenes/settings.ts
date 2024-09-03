import { Scene } from "artistic-engine/sprite";
import { RunningEngine } from "../state";
import { Engine } from "artistic-engine";
import { SettingsQuitButton } from "../elements/settings";
import { ResolutionVector } from "../helper";

class SettingsScene extends Scene {
    private returnToScene: Scene | undefined;

    private quitButton: SettingsQuitButton;

    constructor() {
        super();
        this.Dimension = new ResolutionVector(1920, 1080);

        this.quitButton = new SettingsQuitButton();
        const buttons = [this.quitButton];

        (<ResolutionVector>this.quitButton.Position).baseX = 100;
        (<ResolutionVector>this.quitButton.Position).baseY = 100;

        this.attachChildren(buttons);
        RunningEngine().PointerGroup.registerPointerListener(...buttons);
    }

    override onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.fillStyle = "skyblue";
        context.fillRect(0, 0, this.W, this.H);
    }

    public close() {
        RunningEngine().Scene = this.returnToScene;
    }

    onAttachEngine(engine: Engine, previousScene: Scene): void {
        this.returnToScene = previousScene;
    }
}

let settingsScene: SettingsScene;

const getSettingsScene = () => {
    if (settingsScene === undefined) {
        settingsScene = new SettingsScene();
    }
    return settingsScene;
};

export default getSettingsScene;
