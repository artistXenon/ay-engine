import { Scene } from 'artistic-engine/sprite';
import { Config, RunningEngine } from '../state';
import { Engine } from 'artistic-engine';
import QuitButton from '../elements/settings/quit-button';

class SettingsScene extends Scene {
    private returnToScene: Scene | undefined;

    private quitButton: QuitButton;

    constructor() {
        const cfg = Config();
        super({ W: cfg.resolution.x, H: cfg.resolution.y });

        this.quitButton = new QuitButton();
        const buttons = [this.quitButton];

        this.quitButton.X = 100;
        this.quitButton.Y = 100;
        
        this.attachChildren(buttons);
        RunningEngine().PointerGroup.registerPointerListener(...buttons);
    }

    override onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.fillStyle = "skyblue";
        context.fillRect(0, 0, this.W, this.H);
    }

    public close() {
        RunningEngine().Scene = this.returnToScene;
    }

    
    onAttachEngine(engine: Engine, previousScene: Scene): void {
        this.returnToScene = previousScene;
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
