import { Engine } from "artistic-engine";
import { KeyboardEventGroup, PointerEventGroup } from "artistic-engine/event";
import { Config } from ".";

const canvas = document.querySelector<HTMLCanvasElement>('#main')!;

class CustomEngine extends Engine {
    public KeyboardGroup: KeyboardEventGroup;

    public PointerGroup: PointerEventGroup;

    constructor() {
        super(canvas);
        this.KeyboardGroup = new KeyboardEventGroup(document.body);
        this.PointerGroup = new PointerEventGroup(this);

        this.KeyboardGroup.registerEvent();
        this.PointerGroup.registerEvent();
    }
}

let engine: CustomEngine
const getEngine: () => CustomEngine = () => {
    if (engine === undefined) {
        engine = new CustomEngine();
        const cfg = Config();

        // resolution
        const fitScreen = () => {
            const fitWidth = cfg.resolution.x * innerHeight > cfg.resolution.y * innerWidth;
            if (fitWidth) engine.resizeCanvas({ W: innerWidth, H: innerWidth * cfg.resolution.y / cfg.resolution.x });
            else engine.resizeCanvas({ W: innerHeight * cfg.resolution.x / cfg.resolution.y, H: innerHeight });
            engine.Camera.reset();
            engine.Camera.scale(fitWidth ? innerWidth / cfg.resolution.x : innerHeight / cfg.resolution.y)
        };
        fitScreen();
        addEventListener('resize', fitScreen);

        // event

    }
    return engine;
}

export default getEngine;
