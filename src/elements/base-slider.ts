import { IPointerListener } from "artistic-engine/event";
import { Sprite } from "artistic-engine/sprite";
import { Config, RunningEngine } from "../state";
import { Vector } from "artistic-engine";
import { ResolutionVector } from "../helper";

export default abstract class BaseSlider extends Sprite implements IPointerListener {
    private pointerVector = new Vector.Vector2D();

    public Disabled = false;

    private downed = false;

    public abstract onDraw(context: CanvasRenderingContext2D, delay: number): void;

    constructor() {
        super();
        this.Dimension = new ResolutionVector();
    }
    PointerRegistered?: boolean | undefined;

    onPointer(type: string, localX: number, localY: number, inBound: boolean, e: PointerEvent): boolean {
        if (this.Disabled) return true;

        if (inBound) {
            if (type === "pointerdown") {
                this.downed = true;
                this.onDown(e);
            } else if (type === "pointerup" && this.downed) {
                this.downed = false;
                this.onUp(e);
            } else if (type === "pointermove") { // pointerover, pointerenter
                this.onHover(e);
            }
            return true;
        } else {
            if (type === "pointermove") {
                this.downed = false;
                this.onDrop(e);
            }
            return false;
        }
    }

    public abstract onDown(e: PointerEvent): void;
    public abstract onUp(e: PointerEvent): void;
    public abstract onHover(e: PointerEvent): void;
    public abstract onDrop(e: PointerEvent): void;

}
