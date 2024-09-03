import { Config } from "./config";

export type DisplayConfig = {
    resolution: number[];
    fullscreen: boolean;
};

export function applyDisplayConfig(
    config: Config,
    displayConfig: DisplayConfig,
) {
    if (!displayConfig) return;
    const [x, y] = displayConfig.resolution;
    config.resolution.X = x;
    config.resolution.Y = y;

    config.fullscreen = displayConfig.fullscreen;
}
