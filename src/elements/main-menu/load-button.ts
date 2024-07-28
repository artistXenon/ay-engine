import MainMenuButton from "./button";

export default class LoadButton extends MainMenuButton {
    constructor() {
        super("불러오기", "purple");
    }
    
    public onUp(e: PointerEvent): void {
        console.log("not implemented")
    }
}