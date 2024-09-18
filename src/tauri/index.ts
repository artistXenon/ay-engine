import { invoke } from "@tauri-apps/api/core";
// import { listen } from "@tauri-apps/api/event";

export function getConfigFile(defaultConfig: string) {
    return invoke<string>("get_config_file", {
        defaultConfig,
    });
}

export function greet(name: string) {
    return invoke("greet", {
        name,
    });
}

export function throwingFunction(throwit: boolean) {
    return invoke("throwing_function", {
        throwit,
    });
}
