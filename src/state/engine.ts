import { Engine, FontBuilder } from "artistic-engine";
import { KeyboardEventGroup, PointerEventGroup } from "artistic-engine/event";
import { Config } from ".";

const canvas = document.querySelector<HTMLCanvasElement>("#main")!;

export class CustomEngine extends Engine {
    public KeyboardGroup: KeyboardEventGroup;

    public PointerGroup: PointerEventGroup;

    private fontBuilderMap: Map<string, FontBuilder>;

    constructor() {
        super(canvas);
        this.KeyboardGroup = new KeyboardEventGroup(canvas);
        this.PointerGroup = new PointerEventGroup(this);
        this.PointerGroup.setListenSequenceFirstInFirstTrigger(false);
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

let engine: CustomEngine;
const getEngine: () => CustomEngine = () => {
    if (engine === undefined) {
        engine = new CustomEngine();
        const cfg = Config();

        // resolution
        const fitScreen = () => {
            const fitWidth =
                cfg.Resolution.X * innerHeight > cfg.Resolution.Y * innerWidth;
            if (fitWidth)
                engine.resizeCanvas({
                    W: innerWidth,
                    H: (innerWidth * cfg.Resolution.Y) / cfg.Resolution.X,
                });
            else
                engine.resizeCanvas({
                    W: (innerHeight * cfg.Resolution.X) / cfg.Resolution.Y,
                    H: innerHeight,
                });
            engine.Camera.reset();
            engine.Camera.scale(
                fitWidth
                    ? innerWidth / cfg.Resolution.X
                    : innerHeight / cfg.Resolution.Y,
            );

            // if (cfg.fullscreen) canvas.requestFullscreen({ navigationUI: "hide" });

            (<any>window).engine = engine;
        };
        fitScreen();
        addEventListener("resize", fitScreen);

        // event
    }
    return engine;
};

export { getEngine };
