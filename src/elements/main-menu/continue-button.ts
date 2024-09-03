import MainMenuButton from "./button";

export default class ContinueButton extends MainMenuButton {
    constructor() {
        super("이어서", "blue");
    }

    public onUp(e: PointerEvent): void {
        console.log("not implemented");
    }
}
