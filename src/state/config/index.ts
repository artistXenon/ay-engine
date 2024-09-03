import { Config } from "./config";

import config from "../../config.json";

let instance: Config | undefined;

const getConfig = () => {
    if (instance === undefined) {
        instance = new Config(config);
        (<any>window).config = instance;
    }
    return instance;
};

export { getConfig as Config };
