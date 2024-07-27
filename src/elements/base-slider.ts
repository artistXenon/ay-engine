import { IPointerListener } from "artistic-engine/event";
import { Sprite } from "artistic-engine/sprite";
import { RunningEngine } from "../state";
import { Vector } from "artistic-engine";

export default abstract class BaseSlider extends Sprite implements IPointerListener {
    private pointerVector = new Vector.Vector2D();

    public Disabled = false;

    private downed = false;

    public RecieveEventsOutOfBound = true;

    public abstract onDraw(context: CanvasRenderingContext2D, delay: number): void;

    get PointerRegistered(): boolean {
        return RunningEngine().Scene === this.Root;
    }

    onPointer(e: PointerEvent): boolean {
        // TODO: engine update - give bound info as parameter
        if (this.Disabled) return true;
    
        const { type, clientX, clientY } = e;
        this.pointerVector.X = this.AbsoluteX;
        this.pointerVector.Y = this.AbsoluteY;
        const { X, Y } = RunningEngine().Camera.apply(this.pointerVector);
        const relativeX = clientX - X, relativeY = clientY - Y;        
        this.pointerVector.X = this.W;
        this.pointerVector.Y = this.H;
        const { X: W, Y: H } = RunningEngine().Camera.apply(this.pointerVector);
        const inBound = relativeX > 0 && relativeX < W && relativeY > 0 && relativeY < H;
    
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
