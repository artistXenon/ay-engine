import { Scene } from 'artistic-engine/sprite';
import { Config, RunningEngine } from '../state';
import { Engine } from 'artistic-engine';
import { MainContinueButton, MainExtraButton, MainSettingsButton, MainStartButton } from '../elements/main-menu';

const cfg = Config();

class MainScene extends Scene {
    // 처음부터 이어서 엑스트라 설정 종료
    public startButton: MainStartButton;

    public continueButton: MainContinueButton;

    public extraButton: MainExtraButton;

    public settingsButton: MainSettingsButton;

    constructor() {
        super({ W: cfg.resolution.x, H: cfg.resolution.y }); 
        
        this.startButton = new MainStartButton();
        this.continueButton = new MainContinueButton();
        this.extraButton = new MainExtraButton();
        this.settingsButton = new MainSettingsButton();
        const buttons = [ this.startButton, this.continueButton, this.extraButton, this.settingsButton ];

        this.startButton.X = 100;
        this.startButton.Y = 100;

        this.continueButton.X = 100;
        this.continueButton.Y = 300;

        this.extraButton.X = 100;
        this.extraButton.Y = 500;

        this.settingsButton.X = 100;
        this.settingsButton.Y = 700;

        this.attachChildren(buttons);
        RunningEngine().PointerGroup.registerPointerListener(...buttons);
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
