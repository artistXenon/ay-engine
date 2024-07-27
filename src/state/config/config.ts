import { applyDisplayConfig, DisplayConfig } from './display';
// TODO: way to supply local config

type ConfigFile = {
    display: DisplayConfig;
    audio: Object;
    dialog: Object;
    keybind: Object;
}

export class Config {

    public fullscreen = false;

    public resolution = {
        x: 1920,
        y: 1080
    };

    constructor(config: ConfigFile) {
        applyDisplayConfig(this, config.display);
    }
}

