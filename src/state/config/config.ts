import { Vector } from "artistic-engine";
import { applyDisplayConfig, DisplayConfig } from "./display";
// TODO: way to supply local config

export type ConfigFile = {
    display: DisplayConfig;
    audio: Object;
    dialog: Object;
    keybind: Object;
};

export class Config {
    public fullscreen = false;

    public resolution = new Vector.Vector2D(1920, 1080);

    constructor(config: ConfigFile) {
        applyDisplayConfig(this, config.display);
    }

    public setResolution(X: number, Y: number) {
        this.resolution.X = X;
        this.resolution.Y = Y;
        dispatchEvent(new Event("resize"));
    }

    public setFullscreen(fullscreen: boolean) {
        this.fullscreen = fullscreen;

        if (fullscreen) {
            document
                .querySelector("#app")!
                .requestFullscreen({ navigationUI: "hide" });
        }
    }
}
