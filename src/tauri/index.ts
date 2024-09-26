import { invoke } from "@tauri-apps/api/core";
import { SaveBook } from "../scenario/local-types";
import { ConfigData } from "../state/config/config";
// import { listen } from "@tauri-apps/api/event";

declare global {
    interface Window {
        tauri_panic: (tag: string, error: any) => void;
        tauri_quit: () => void;
    }
}

export async function getConfigFile(defaultConfig: ConfigData) {
    const rawConfig = await invoke<string>("get_config_file", {
        defaultConfig: JSON.stringify(defaultConfig),
    });
    return <ConfigData>JSON.parse(rawConfig);
}

export function setConfigFile(updateConfig: ConfigData) {
    return invoke<string>("set_config_file", {
        updateConfig: JSON.stringify(updateConfig),
    });
}

export async function getSaveFile(defaultSave: SaveBook) {
    const rawSave = await invoke<string>("get_save_file", {
        defaultSave: JSON.stringify(defaultSave),
    });
    return <SaveBook>JSON.parse(rawSave);
}

export function setSaveFile(updateSave: SaveBook) {
    return invoke<string>("set_save_file", {
        updateSave: JSON.stringify(updateSave),
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

// define global functions and dev config
export function tauri_init() {
    // declare global panic, quit
    window.tauri_panic = function (tag: string, e: any) {
        const error = `[${new Date()}@webview::${tag}] e: ${e}`;
        invoke("panic", {
            error,
        });
    };

    window.tauri_quit = function () {
        invoke("quit_game");
    };

    // remove right click on production build
    if (!import.meta.env.DEV) {
        document.oncontextmenu = (event) => {
            event.preventDefault();
        };
    }
}
