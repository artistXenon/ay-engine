import { MainScene } from "../../scenes";
import { RunningEngine } from "../../state";
import BaseModal from "../base-modal";
import MainMenuButton from "./button";

export default class QuitButton extends MainMenuButton {
    private modal: BaseModal | undefined;
    constructor() {
        super("끝내기", "brown");
    }

    public onUp(e: PointerEvent): void {
        if (this.modal === undefined) {
            this.modal = new BaseModal("정말로 종료하시겠슴까", "나가면 쓸쓸할텐디...\n한번만 더 생각해 보시오...", (baseModal) => {
                // TODO: replace with actual functionality
                console.log("종료되어따!");
            }, (baseModal) => {
                baseModal.close();
            });
        }
        MainScene().attachChildren(this.modal);
        RunningEngine().PointerGroup.registerPointerListener(this.modal);
    }
}