import MainMenuButton from "./button";

export default class StartButton extends MainMenuButton {
    constructor() {
        super("처음부터", "red");
    }
    
    public onUp(e: PointerEvent): void {
        console.log(e)
    }
}
