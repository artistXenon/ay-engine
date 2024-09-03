import { IPointerListener } from "artistic-engine/event";
import { Sprite } from "artistic-engine/sprite";

export default class PlayerDialog extends Sprite implements IPointerListener {
    private speaker: DialogSpeaker;

    private line: DialogLine;

    private next: DialogCursor; // 대화창 다음을 나타내는 ▼

    private opacity: number = 1;

    constructor() {
        super();
        this.speaker = new DialogSpeaker();
        this.line = new DialogLine();
        this.next = new DialogCursor();

    }

    onPointer(type: string, localX: number, localY: number, inBound: boolean, e: PointerEvent): boolean {
        //  Stub
        return true;
    }

    onDraw(context: CanvasRenderingContext2D, delay: number): void {
        // Stub
    }

}

class DialogSpeaker extends Sprite {
    onDraw(context: CanvasRenderingContext2D, delay: number): void {
    }
}

class DialogLine extends Sprite {
    onDraw(context: CanvasRenderingContext2D, delay: number): void {
        
    }

}

class DialogCursor extends Sprite {
    onDraw(context: CanvasRenderingContext2D, delay: number): void {

    }
}
