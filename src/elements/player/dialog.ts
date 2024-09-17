import { Sprite } from "artistic-engine/sprite";
import { ResolutionVector } from "../../helper";

export default class PlayerDialog extends Sprite {
    private speaker: string | undefined;

    private line: string = "";

    private speakerSprite: DialogSpeaker;

    private lineSprite: DialogLine;

    private cursorSprite: DialogCursor; // info: 대화창 다음을 나타내는 ▼

    private isplaying: boolean = false;

    constructor() {
        super();
        this.Position = new ResolutionVector(0, 1080 * 0.7);
        this.Dimension = new ResolutionVector(1920, 1080 * 0.3);
        this.speakerSprite = new DialogSpeaker();
        this.lineSprite = new DialogLine();
        this.cursorSprite = new DialogCursor();
    }

    public get isPlaying() {
        return this.isplaying;
    }

    public setNextData(speaker: string | undefined, line: string = "") {
        // TODO
        this.speaker = speaker;
        this.line = line;
    }

    public playNext() {
        this.isplaying = true;
    }

    public skipPlay() {
        this.isplaying = false;
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
