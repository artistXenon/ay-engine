import { Scene } from "artistic-engine/sprite";
import { RunningEngine } from "../state";
import { Engine } from "artistic-engine";
import { SaveLoadQuitButton } from "../elements/save-load";
import { ResolutionVector } from "../helper";

class SaveLoadScene extends Scene {
    private returnToScene: Scene | undefined;

    private quitButton: SaveLoadQuitButton;

    constructor() {
        super();
        this.Dimension = new ResolutionVector(1920, 1080);
        this.quitButton = new SaveLoadQuitButton();
        const buttons = [this.quitButton];

        (<ResolutionVector>this.quitButton.Position).baseX = 100;
        (<ResolutionVector>this.quitButton.Position).baseY = 100;

        this.attachChildren(buttons);
    }

    override onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.fillStyle = "pink";
        context.fillRect(0, 0, this.W, this.H);
    }

    public close() {
        RunningEngine().Scene = this.returnToScene;
    }

    onAttachEngine(engine: Engine, previousScene: Scene): void {
        this.returnToScene = previousScene;
        RunningEngine().PointerGroup.registerPointerListener(this.quitButton);
    }

    onDetachEngine(engine: Engine, nextScene: Scene): void {
        RunningEngine().PointerGroup.unregisterPointerListener(this.quitButton);
    }
}

let settingsScene: SaveLoadScene;

const getSaveLoadScene = () => {
    if (settingsScene === undefined) {
        settingsScene = new SaveLoadScene();
    }
    return settingsScene;
};

export default getSaveLoadScene;
