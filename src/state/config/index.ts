import { Config, ConfigData } from "./config";

import { getConfigFile } from "../../tauri";

let instance: Config | undefined;

const defaultConfig: ConfigData = {
    display: {
        resolution: [1920, 1080],
        fullscreen: false,
    },
    audio: {
        master: 100,
        voice: 100,
        music: 100,
    },
    dialog: {},
    keybind: {},
};

const loadConfig = async () => {
    try {
        const config = await getConfigFile(defaultConfig);
        instance = new Config(config);

        // TODO: debugging purpose, remove later on
        (<any>window).config = instance;
    } catch (e) {
        window.tauri_panic(`loadConfig`, e);
    }
};

const getConfig = () => {
    return instance!;
};

export { loadConfig, getConfig as Config };
