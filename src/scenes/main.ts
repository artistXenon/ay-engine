import { Scene } from 'artistic-engine/sprite';
import { Config, RunningEngine } from '../state';
import { Engine } from 'artistic-engine';
import { MainMenuButton } from '../elements';

const cfg = Config();

class MainScene extends Scene {
    // 처음부터 이어서 엑스트라 설정 종료
    public startButton: MainMenuButton;

    public continueButton: MainMenuButton;

    public extraButton: MainMenuButton;

    public settingsButton: MainMenuButton;

    constructor() {
        super({ W: cfg.resolution.x, H: cfg.resolution.y }); 
        
        this.startButton = new MainMenuButton();
        this.continueButton = new MainMenuButton('blue');
        this.extraButton = new MainMenuButton('orange');
        this.settingsButton = new MainMenuButton('green');
        const buttons = [ this.startButton, this.continueButton, this.extraButton, this.settingsButton ];

        this.startButton.X = 100;
        this.startButton.Y = 100;

        this.continueButton.X = 200;
        this.continueButton.Y = 200;

        this.extraButton.X = 300;
        this.extraButton.Y = 300;

        this.settingsButton.X = 400;
        this.settingsButton.Y = 400;

        this.attachChildren(buttons);
        RunningEngine().PointerGroup.registerPointerListener(buttons);
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
