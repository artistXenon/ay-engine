import { Scene } from 'artistic-engine/sprite';
import { Config, RunningEngine } from '../state';
import { Engine } from 'artistic-engine';
import { MainContinueButton, MainExtraButton, MainLoadButton, MainQuitButton, MainSettingsButton, MainStartButton } from '../elements/main-menu';
import BaseModal from '../elements/base-modal';

const cfg = Config();

class MainScene extends Scene {
    // Buttons
    // 처음부터 이어서 엑스트라 설정 종료
    private startButton: MainStartButton;

    private continueButton: MainContinueButton;

    private loadButton: MainLoadButton;

    private extraButton: MainExtraButton;

    private settingsButton: MainSettingsButton;

    private quitButton: MainQuitButton;

    constructor() {
        super({ W: cfg.resolution.x, H: cfg.resolution.y }); 
        
        this.startButton = new MainStartButton();
        this.continueButton = new MainContinueButton();
        this.loadButton = new MainLoadButton();
        this.extraButton = new MainExtraButton();
        this.settingsButton = new MainSettingsButton();
        this.quitButton = new MainQuitButton();
        const buttons = [ this.startButton, this.continueButton, this.loadButton, this.extraButton, this.settingsButton, this.quitButton ];

        this.startButton.X = 100;
        this.startButton.Y = 100;

        this.continueButton.X = 100;
        this.continueButton.Y = 250;
        
        this.loadButton.X = 100;
        this.loadButton.Y = 400;

        this.extraButton.X = 100;
        this.extraButton.Y = 550;

        this.settingsButton.X = 100;
        this.settingsButton.Y = 700;
        
        this.quitButton.X = 100;
        this.quitButton.Y = 850;

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
