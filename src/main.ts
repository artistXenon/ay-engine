import "./style.css";
import { tauri_init } from "./tauri";
import { loadScenarios } from "./scenario";
import { SplashScene } from "./scenes";
import { AssetManager, RunningEngine } from "./state";
import { loadConfig } from "./state/config";

(async () => {
    tauri_init();

    await loadConfig();

    await loadScenarios();

    const engine = RunningEngine();
    const assetManager = AssetManager();
    assetManager.load("common", false, () => {
        engine.Scene = SplashScene();
        engine.start();
    });
})();
