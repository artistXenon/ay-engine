import { Scene } from "artistic-engine/sprite";
import { Engine } from "artistic-engine";
import { ResolutionVector } from "../helper";
import Scenario from "../state/scenario/scenario";

class PlayerScene extends Scene {
    constructor(scenario: Scenario) {
        super(); // TODO: temporary value
        this.Dimension = new ResolutionVector(1920, 1080);
    }

    override onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.fillStyle = "black";
        context.fillRect(0, 0, this.W, this.H);
    }

    public open(from: any | undefined) {}

    onAttachEngine(engine: Engine, previousScene: Scene): void {}
}

let playerScene: PlayerScene;

const getPlayerScene = (scenario: Scenario) => {
    if (playerScene === undefined) {
        playerScene = new PlayerScene(scenario);
    }
    return playerScene;
};

export default getPlayerScene;
