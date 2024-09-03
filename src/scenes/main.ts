import { Scene } from "artistic-engine/sprite";
import { RunningEngine } from "../state";
import { Engine } from "artistic-engine";
import {
    MainContinueButton,
    MainExtraButton,
    MainLoadButton,
    MainQuitButton,
    MainSettingsButton,
    MainStartButton,
} from "../elements/main-menu";
import { ResolutionVector } from "../helper";

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
        super();
        this.Dimension = new ResolutionVector(1920, 1080);

        this.startButton = new MainStartButton();
        this.continueButton = new MainContinueButton();
        this.loadButton = new MainLoadButton();
        this.extraButton = new MainExtraButton();
        this.settingsButton = new MainSettingsButton();
        this.quitButton = new MainQuitButton();
        const buttons = [
            this.startButton,
            this.continueButton,
            this.loadButton,
            this.extraButton,
            this.settingsButton,
            this.quitButton,
        ];

        (<ResolutionVector>this.startButton.Position).baseX = 100;
        (<ResolutionVector>this.startButton.Position).baseY = 100;

        (<ResolutionVector>this.continueButton.Position).baseX = 100;
        (<ResolutionVector>this.continueButton.Position).baseY = 250;

        (<ResolutionVector>this.loadButton.Position).baseX = 100;
        (<ResolutionVector>this.loadButton.Position).baseY = 400;

        (<ResolutionVector>this.extraButton.Position).baseX = 100;
        (<ResolutionVector>this.extraButton.Position).baseY = 550;

        (<ResolutionVector>this.settingsButton.Position).baseX = 100;
        (<ResolutionVector>this.settingsButton.Position).baseY = 700;

        (<ResolutionVector>this.quitButton.Position).baseX = 100;
        (<ResolutionVector>this.quitButton.Position).baseY = 850;

        this.attachChildren(buttons);
        RunningEngine().PointerGroup.registerPointerListener(...buttons);
    }

    override onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.fillStyle = "black";
        context.fillRect(0, 0, this.W, this.H);
    }

    onAttachEngine(engine: Engine, previousScene: Scene): void {}
}

let mainScene: MainScene;

const getMainScene = () => {
    if (mainScene === undefined) {
        mainScene = new MainScene();
    }
    return mainScene;
};

export default getMainScene;
