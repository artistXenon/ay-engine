import { ExtraQuitButton } from "../elements/extra";
import { ResolutionVector } from "../helper";
import AYScene from "../helper/ay-scene";

class ExtraScene extends AYScene {
    private quitButton: ExtraQuitButton;

    constructor() {
        super();
        this.Dimension = new ResolutionVector(1920, 1080);
        this.quitButton = new ExtraQuitButton();
        const buttons = [this.quitButton];

        (<ResolutionVector>this.quitButton.Position).baseX = 100;
        (<ResolutionVector>this.quitButton.Position).baseY = 100;

        this.attachChildren(buttons);
        this.iPointerListeners.push(...buttons);
    }

    override onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.fillStyle = "grey";
        context.fillRect(0, 0, this.W, this.H);
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
