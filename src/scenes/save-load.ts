import { SaveLoadQuitButton } from "../elements/save-load";
import { ResolutionVector } from "../helper";
import AYScene from "../helper/ay-scene";

class SaveLoadScene extends AYScene {
    // INFO: true> load mode, false> save mode
    private loadsaveMode: boolean = true;

    private quitButton: SaveLoadQuitButton;

    constructor() {
        super();
        this.Dimension = new ResolutionVector(1920, 1080);
        this.quitButton = new SaveLoadQuitButton();
        this.iPointerListeners.push(this.quitButton);

        (<ResolutionVector>this.quitButton.Position).baseX = 100;
        (<ResolutionVector>this.quitButton.Position).baseY = 100;

        this.attachChildren(this.iPointerListeners);
    }

    override onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.fillStyle = "pink";
        context.fillRect(0, 0, this.W, this.H);
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
