import BaseButton from "./base-button";

export default class MainMenuButton extends BaseButton {
    private color;
    constructor(color = 'red') {
        super({ W: 200, H: 100 });
        this.color = color;
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
