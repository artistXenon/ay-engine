import { Config } from "./config";

export type DisplayConfig = {
    resolution: number[];
    fullscreen: boolean;
};

export function applyDisplayConfig(config: Config, displayConfig: DisplayConfig) {
    if (!displayConfig) return;
    const [ x, y ] = displayConfig.resolution;
    config.resolution.x = x;
    config.resolution.y = y;

    config.fullscreen = displayConfig.fullscreen;
}
