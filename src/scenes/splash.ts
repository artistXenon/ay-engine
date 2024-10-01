import { Engine } from "artistic-engine";
import { Scene } from "artistic-engine/sprite";
import { IPointerListener } from "artistic-engine/event";
import { Modifier, SequentialModifier } from "artistic-engine/modifiers";
import { AssetManager, CustomEngine, RunningEngine } from "../state";
import { MainScene } from ".";
import { ResolutionVector } from "../helper";

class SplashScene extends Scene implements IPointerListener {
    private title: ImageBitmap | undefined;

    private logoOpacity: number = 0;

    private animationModifier: Modifier;

    constructor() {
        super();
        this.Dimension = new ResolutionVector(1920, 1080);
        AssetManager()
            .getImage("title-logo")
            .then((ibm) => (this.title = ibm));

        this.animationModifier = new SequentialModifier(
            new Modifier(0, 1, 2500, (v) => (this.logoOpacity = v)),
            new Modifier(1, 1, 3000, () => {}),
            new Modifier(1, 0, 1500, (v) => {
                this.logoOpacity = v;
                if (v === 0) {
                    this.skip();
                }
            }),
        );
    }

    override onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.fillStyle = "black";
        context.fillRect(0, 0, this.W, this.H);
        if (this.title) {
            context.globalAlpha = this.logoOpacity;
            // TODO: hard-coded logo position, size
            context.drawImage(this.title, 320, 180, 1280, 720);
            context.globalAlpha = 1;
        }
        // context.strokeStyle = "red";
        // context.lineWidth = 2;
        // context.strokeRect(320, 180, 1280, 720);
    }

    public onAttachEngine(engine: Engine, previousScene: Scene): void {
        const e = <CustomEngine>engine;
        e.PointerGroup.registerPointerListener(this);

        e.registerModifier(this.animationModifier);
    }

    public onDetachEngine(engine: Engine): void {
        (<CustomEngine>engine).PointerGroup.unregisterPointerListener(this);
        engine.unregisterModifier(this.animationModifier);
    }

    onPointer(
        type: string,
        button: number,
        localX: number,
        localY: number,
        inBound: boolean,
        e: PointerEvent,
    ): boolean {
        // TODO: button check?
        if (type === "pointerdown") {
            this.skip();
        }

        return true;
    }

    private skip() {
        const engine = RunningEngine();
        if (engine.Scene !== this) return;
        engine.Scene = MainScene();
    }
}

let splashScene: SplashScene;

const getSplashScene = () => {
    if (splashScene === undefined) {
        splashScene = new SplashScene();
    }
    return splashScene;
};

export default getSplashScene;
