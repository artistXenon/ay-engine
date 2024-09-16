import { IPointerListener } from "artistic-engine/event";
import { Sprite } from "artistic-engine/sprite";
import { ResolutionVector } from "../../helper";

export default class PlayerDialog extends Sprite implements IPointerListener {
    private speaker: DialogSpeaker;

    private line: DialogLine;

    private next: DialogCursor; // info: 대화창 다음을 나타내는 ▼

    private opacity: number = 1;

    constructor() {
        super();
        this.Position = new ResolutionVector(0, 1080 * 0.7);
        this.Dimension = new ResolutionVector(1920, 1080 * 0.3);
        this.speaker = new DialogSpeaker();
        this.line = new DialogLine();
        this.next = new DialogCursor();
    }

    public setNextData(speaker: string | undefined, line: string = "") {
        // TODO
    }

    public playNext() {}

    public skipPlay() {}

    onPointer(
        type: string,
        localX: number,
        localY: number,
        inBound: boolean,
        e: PointerEvent,
    ): boolean {
        //  Stub
        if (!inBound) return false;
        if (type === "pointerdown")
            console.log("player-dialog", localX, localY);
        return true;
    }

    onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.fillStyle = "pink";
        context.fillRect(0, 0, this.W, this.H);
    }
}

class DialogSpeaker extends Sprite {
    onDraw(context: CanvasRenderingContext2D, delay: number): void {}
}

class DialogLine extends Sprite {
    onDraw(context: CanvasRenderingContext2D, delay: number): void {}
}

class DialogCursor extends Sprite {
    onDraw(context: CanvasRenderingContext2D, delay: number): void {}
}
