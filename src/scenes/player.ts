import { Scene } from 'artistic-engine/sprite';
import { Config } from '../state';
import { Engine } from 'artistic-engine';

const cfg = Config();

class PlayerScene extends Scene {
    constructor() {
        super({ W: cfg.resolution.x, H: cfg.resolution.y }); // TODO: temporary value
    }

    override onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.fillStyle = "black";
        context.fillRect(0, 0, this.W, this.H);
    }

    onAttachEngine(engine: Engine, previousScene: Scene): void {

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
