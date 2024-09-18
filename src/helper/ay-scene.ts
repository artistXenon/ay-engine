import { Engine } from "artistic-engine";
import { IPointerListener } from "artistic-engine/event";
import { Scene, Sprite } from "artistic-engine/sprite";
import { CustomEngine, RunningEngine } from "../state";

export default class AYScene extends Scene {
    protected iPointerListeners: (Sprite & IPointerListener)[] = [];

    private previousScene: Scene | undefined;

    public exitScene() {
        RunningEngine().Scene = this.previousScene;
    }

    onAttachEngine(engine: Engine, previousScene: Scene): void {
        this.previousScene = previousScene;
        (<CustomEngine>engine).PointerGroup.registerPointerListener(
            ...this.iPointerListeners,
        );
    }

    onDetachEngine(engine: Engine, nextScene: Scene): void {
        this.previousScene = nextScene;
        (<CustomEngine>engine).PointerGroup.unregisterPointerListener(
            ...this.iPointerListeners,
        );
    }
}
