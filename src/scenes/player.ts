import { Scene } from "artistic-engine/sprite";
import { Engine } from "artistic-engine";
import { ResolutionVector } from "../helper";
import { Scenario } from "../scenario";
import { Dialog, Menu } from "../elements/player";
import { RunningEngine } from "../state";
import { SaveData } from "../scenario/local-types";
import { IPointerListener } from "artistic-engine/event";

class PlayerScene extends Scene implements IPointerListener {
    private scenario: Scenario | undefined;

    private dialog: Dialog;

    private menu: Menu;

    private postDirectives: (() => void)[] = [];

    private UIHidden: boolean = false;

    constructor() {
        super(); // TODO: temporary value
        this.Dimension = new ResolutionVector(1920, 1080);

        this.dialog = new Dialog();
        this.menu = new Menu();

        this.attachChildren([this.dialog, this.menu]);
    }

    public load(scenario: Scenario, save?: SaveData) {
        this.scenario = scenario;
        this.playFrame(save);
    }

    public playFrame(save?: SaveData) {
        const scenario = this.scenario!;
        const frame = scenario.resolveNextFrame(save);

        if (frame === undefined) {
            // TODO: to main scene
            return;
        }

        let preDirectives: (() => void)[] = [];
        this.postDirectives.length = 0;
        if (frame.beforeBody)
            scenario.resolveDirectives(frame.beforeBody, preDirectives);
        if (frame.afterBody)
            scenario.resolveDirectives(frame.afterBody, this.postDirectives);

        for (const dir of preDirectives) dir();

        this.dialog.setNextData(frame.speaker, frame.line ?? "");

        this.dialog.playNext();

        switch (frame.type) {
            case "speak":
                break;
            case "cg":
                break;
            case "choice":
                // TODO: show choices etc
                break;
            case "custom":
                break;
            default:
                break;
        }
    }

    public skipFrameLine() {
        this.dialog.skipPlay();
    }

    public finishFrame() {
        // TODO: cut audio
        for (const dir of this.postDirectives) dir();
        this.playFrame();
    }

    public hideUI(toggle: boolean) {
        this.UIHidden = toggle;
        this.menu.PointerRegistered = !toggle;
    }

    onPointer(
        type: string,
        localX: number,
        localY: number,
        inBound: boolean,
        e: PointerEvent,
    ): boolean {
        if (type === "pointerup") {
            console.log("player scene!!!");
            // TODO: if ui hidden, show ui.
            // TODO: else skip or next
        }
        return true;
    }

    override onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.fillStyle = "grey";
        context.fillRect(0, 0, this.W, this.H);
    }

    onAttachEngine(engine: Engine, previousScene: Scene): void {
        RunningEngine().PointerGroup.registerPointerListener(this, this.menu);
    }

    onDetachEngine(engine: Engine, nextScene: Scene): void {
        RunningEngine().PointerGroup.unregisterPointerListener(this, this.menu);
    }
}

let playerScene: PlayerScene;

const getPlayerScene = () => {
    if (playerScene === undefined) {
        playerScene = new PlayerScene();
    }
    return playerScene;
};

export default getPlayerScene;
