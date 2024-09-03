import { SaveLoadScene } from "../../scenes";
import SaveLoadButton from "./button";

export default class QuitButton extends SaveLoadButton {
    constructor() {
        super("나가기");
    }

    public onUp(e: PointerEvent): void {
        SaveLoadScene().close();
    }
}
