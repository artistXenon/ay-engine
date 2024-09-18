import { Config, ConfigFile } from "./config";

import { getConfigFile } from "../../tauri";

let instance: Config | undefined;

const defaultConfig: ConfigFile = {
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
    return getConfigFile(JSON.stringify(defaultConfig))
        .then((config) => JSON.parse(config))
        .then((parsed_config) => {
            instance = new Config(parsed_config);
            (<any>window).config = instance;
        });
};

const getConfig = () => {
    return instance!;
};

export { loadConfig, getConfig as Config };
