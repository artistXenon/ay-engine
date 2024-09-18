import { SplashScene } from "./scenes";
import { AssetManager, Config, getMainScenario, RunningEngine } from "./state";
import { loadConfig } from "./state/config";
import "./style.css";

// init config file
(async () => {
    await loadConfig();

    // init scenario load
    // TODO: maybe better expression. cuz this loads every scenarios.
    const scenario = getMainScenario();

    // read splash, main image, font assets
    const engine = RunningEngine();

    const assetManager = AssetManager();
    assetManager.load("common", false, () => {
        engine.Scene = SplashScene();
        engine.start();
    });

    // getConfigFile().then(alert).catch(alert);
})();
