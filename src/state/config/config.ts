import { Vector } from "artistic-engine";
import { applyDisplayConfig, DisplayConfig } from "./display";
import { resizeWindow, setConfigFile } from "../../tauri";
import { AudioConfig } from "./audio";

export type ConfigData = {
    display: DisplayConfig;
    audio: AudioConfig;
    dialog: Object;
    keybind: Object;
};

export class Config {
    private data: ConfigData;

    private resolutionVector = new Vector.Vector2D(1920, 1080);

    private writeConfigFile: boolean = false;

    constructor(config: ConfigData) {
        this.data = config;
        applyDisplayConfig(this, config.display);

        this.writeConfigFile = true;
    }

    public get ConfigData(): ConfigData {
        return this.data;
    }

    public get Resolution() {
        const [X, Y] = this.data.display.resolution;
        this.resolutionVector.X = X;
        this.resolutionVector.Y = Y;
        return this.resolutionVector;
    }

    public setResolution(X: number, Y: number) {
        this.data.display.resolution[0] = X;
        this.data.display.resolution[1] = Y;
        resizeWindow(X, Y);
    }

    public setFullscreen(fullscreen: boolean) {
        this.data.display.fullscreen = fullscreen;

        if (this.writeConfigFile) this.saveConfig();

        if (fullscreen) {
            document
                .querySelector("#app")!
                .requestFullscreen({ navigationUI: "hide" });
        }
    }

    public saveConfig() {
        setConfigFile(this.data);
    }
}
