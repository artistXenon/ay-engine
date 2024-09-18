import { SettingsQuitButton } from "../elements/settings";
import { ResolutionVector } from "../helper";
import AYScene from "../helper/ay-scene";

class SettingsScene extends AYScene {
    private quitButton: SettingsQuitButton;

    constructor() {
        super();
        this.Dimension = new ResolutionVector(1920, 1080);

        this.quitButton = new SettingsQuitButton();
        this.iPointerListeners.push(this.quitButton);

        (<ResolutionVector>this.quitButton.Position).baseX = 100;
        (<ResolutionVector>this.quitButton.Position).baseY = 100;

        this.attachChildren(this.iPointerListeners);
    }

    override onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.fillStyle = "skyblue";
        context.fillRect(0, 0, this.W, this.H);
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
