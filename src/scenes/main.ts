import { Scene } from 'artistic-engine/sprite';
import { Config, RunningEngine } from '../state';
import { Engine } from 'artistic-engine';
import { MainMenuButton } from '../elements';

const cfg = Config();

class MainScene extends Scene {
    public startButton: MainMenuButton;
    public continueButton: MainMenuButton;
    public settingsButton: MainMenuButton;
    public extraButton: MainMenuButton;
    constructor() {
        super({ W: cfg.resolution.x, H: cfg.resolution.y }); // TODO: temporary value
        
        this.startButton = new MainMenuButton();
        this.continueButton = new MainMenuButton();
        this.settingsButton = new MainMenuButton();
        this.extraButton = new MainMenuButton();
        const buttons = [ this.startButton, this.continueButton, this.settingsButton, this.extraButton ];

        this.startButton.X = 200;
        this.startButton.Y = 200;
        this.attachChildren(this.startButton);
        RunningEngine().PointerGroup.registerPointerListener(this.startButton);
    }

    override onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.fillStyle = "black";
        context.fillRect(0, 0, this.W, this.H);
    }

    onAttachEngine(engine: Engine, previousScene: Scene): void {

    }
}

let mainScene: MainScene;

const getMainScene = () => {
    if (mainScene === undefined) {
        mainScene = new MainScene();
    }
    return mainScene;
};

export default getMainScene;
