import { Config } from "./config";

export type DisplayConfig = {
    resolution: number[];
    fullscreen: boolean;
};

export function applyDisplayConfig(
    config: Config,
    displayConfig: DisplayConfig,
) {
    const [x, y] = displayConfig.resolution;
    config.setResolution(x, y);
    config.setFullscreen(displayConfig.fullscreen);
}
