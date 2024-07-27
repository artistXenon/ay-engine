import { Engine, FontBuilder } from "artistic-engine";
import { KeyboardEventGroup, PointerEventGroup } from "artistic-engine/event";
import { Config } from ".";

const canvas = document.querySelector<HTMLCanvasElement>('#main')!;

class CustomEngine extends Engine {
    public KeyboardGroup: KeyboardEventGroup;

    public PointerGroup: PointerEventGroup;

    private fontBuilderMap: Map<string, FontBuilder>;

    constructor() {
        super(canvas);
        this.KeyboardGroup = new KeyboardEventGroup(document.body);
        this.PointerGroup = new PointerEventGroup(this);
        this.fontBuilderMap = new Map();

        this.KeyboardGroup.registerEvent();
        this.PointerGroup.registerEvent();
    }

    public getFontBuilder(name: string) {
        if (this.fontBuilderMap.has(name)) {
            return this.fontBuilderMap.get(name);
        }
        const fontbuilder = new FontBuilder(name);
        this.fontBuilderMap.set(name, fontbuilder);
        return fontbuilder;
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
            engine.Camera.scale(fitWidth ? innerWidth / cfg.resolution.x : innerHeight / cfg.resolution.y);
            // engine.Camera.scale(fitWidth ? cfg.resolution.x / innerWidth: cfg.resolution.y / innerHeight)
            (<any>window).engine = engine;
        };
        fitScreen();
        addEventListener('resize', fitScreen);

        // event

    }
    return engine;
}

export default getEngine;
