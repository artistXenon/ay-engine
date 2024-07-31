import { Engine } from 'artistic-engine';
import { Scene } from 'artistic-engine/sprite';
import { IPointerListener } from 'artistic-engine/event';
import { Config, RunningEngine } from '../state';
import { MainScene } from '.';
import { ResolutionVector } from '../helper';


class SplashScene extends Scene implements IPointerListener {
    constructor() {
        super(); 
        this.Dimension = new ResolutionVector(1920, 1080);
    }

    override onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.fillStyle = "white";
        context.fillRect(0, 0, this.W, this.H);
    }

    private skip() {
        const engine = RunningEngine();
        if (engine.Scene !== this) return;
        engine.Scene = MainScene();
        engine.PointerGroup.unregisterPointerListener(this);
    }

    public onAttachEngine(engine: Engine, previousScene: Scene): void {
        // this is auto skip but require click
        // setTimeout(() => {
        //     this.skip();
        // }, 2000);
    }
    
    onPointer(type: string, localX: number, localY: number, inBound: boolean, e: PointerEvent): boolean {
        // throw new Error('Method not implemented.');
        if (type === "pointerdown") {
            this.skip();
        }

        return true;
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