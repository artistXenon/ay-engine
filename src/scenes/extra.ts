import { Scene } from "artistic-engine/sprite";
import { RunningEngine } from "../state";
import { Engine } from "artistic-engine";
import { ExtraQuitButton } from "../elements/extra";
import { ResolutionVector } from "../helper";

class ExtraScene extends Scene {
    private returnToScene: Scene | undefined;

    private quitButton: ExtraQuitButton;

    constructor() {
        super();
        this.Dimension = new ResolutionVector(1920, 1080);
        this.quitButton = new ExtraQuitButton();
        const buttons = [this.quitButton];

        (<ResolutionVector>this.quitButton.Position).baseX = 100;
        (<ResolutionVector>this.quitButton.Position).baseY = 100;

        this.attachChildren(buttons);
        RunningEngine().PointerGroup.registerPointerListener(...buttons);
    }

    override onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.fillStyle = "grey";
        context.fillRect(0, 0, this.W, this.H);
    }

    public close() {
        RunningEngine().Scene = this.returnToScene;
    }

    onAttachEngine(engine: Engine, previousScene: Scene): void {
        this.returnToScene = previousScene;
    }
}

let settingsScene: ExtraScene;

const getExtraScene = () => {
    if (settingsScene === undefined) {
        settingsScene = new ExtraScene();
    }
    return settingsScene;
};

export default getExtraScene;
