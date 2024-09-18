import { Engine } from "artistic-engine";
import { Scene } from "artistic-engine/sprite";
import { IPointerListener } from "artistic-engine/event";
import { CustomEngine, RunningEngine } from "../state";
import { MainScene } from ".";
import { ResolutionVector } from "../helper";

class SplashScene extends Scene implements IPointerListener {
    constructor() {
        super();
        this.Dimension = new ResolutionVector(1920, 1080);
    }

    override onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.fillStyle = "white";
        context.fillRect(0, 0, this.W, this.H);
    }

    public onAttachEngine(engine: Engine, previousScene: Scene): void {
        (<CustomEngine>engine).PointerGroup.registerPointerListener(this);

        // TODO: this is auto skip but require click
        // TODO: start playing animation about publish and dev
        // setTimeout(() => {
        //     this.skip();
        // }, 2000);
    }

    public onDetachEngine(engine: Engine, nextScene: Scene): void {
        (<CustomEngine>engine).PointerGroup.unregisterPointerListener(this);
    }

    onPointer(
        type: string,
        localX: number,
        localY: number,
        inBound: boolean,
        e: PointerEvent,
    ): boolean {
        // throw new Error('Method not implemented.');
        if (type === "pointerdown") {
            this.skip();
        }

        return true;
    }

    private skip() {
        const engine = RunningEngine();
        if (engine.Scene !== this) return;
        engine.Scene = MainScene();
        engine.PointerGroup.unregisterPointerListener(this);
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
