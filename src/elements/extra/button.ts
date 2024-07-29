import { TextSprite } from "artistic-engine/sprite";
import BaseButton from "../base-button";
import { RunningEngine } from "../../state";
import { ResolutionVector } from "../../helper";
import { Vector } from "artistic-engine";

export default class ExtraButton extends BaseButton {
    private name;

    private color;

    // text sprite

    private text: TextSprite;

    constructor(name = "", color = 'red') {
        super(0, 0, 200, 100);
        this.name = name;
        this.color = color;

        this.text = new TextSprite();
        const textPosition = new ResolutionVector();
        textPosition.X = this.W / 2;
        textPosition.Y = this.H / 2;
        this.text.Position = textPosition;
        new Vector.Vector2D(this.W / 2, this.H / 2);
        this.text.Property.fill = "white";
        this.text.Text = this.name;
        this.text.Property.textAlign = "center";
        this.text.Property.textBaseLine = "middle";
        const fontBuilder = RunningEngine().getFontBuilder("GowunBatang");
        if (fontBuilder) {
            this.text.Property.font = fontBuilder.setSize("30px").toString();
        }
        
        this.attachChildren(this.text);
    }
    
    public onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.W, this.H);
    }

    public onDown(e: PointerEvent): void {
    }
    public onUp(e: PointerEvent): void {
        console.log("CLICKED OMG");
    }
    public onHover(e: PointerEvent): void {
    }
    public onDrop(e: PointerEvent): void {
    }
}
