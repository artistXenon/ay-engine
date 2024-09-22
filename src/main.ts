import "./style.css";
import { tauri_init } from "./tauri";
import { loadScenarios } from "./scenario";
import { SplashScene } from "./scenes";
import { AssetManager, RunningEngine } from "./state";
import { loadConfig } from "./state/config";

(async () => {
    // init tauri config
    tauri_init();

    // init config file
    await loadConfig();

    // init scenario load
    await loadScenarios();

    // read splash, main image, font assets
    const engine = RunningEngine();

    const assetManager = AssetManager();
    assetManager.load("common", false, () => {
        engine.Scene = SplashScene();
        engine.start();
    });

    // getConfigFile().then(alert).catch(alert);
})();
