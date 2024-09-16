import { SplashScene } from "./scenes";
import { AssetManager, Config, RunningEngine, Scenario } from "./state";
import "./style.css";

// init config file
const config = Config();

// init scenario load
const scenario = Scenario();

// read splash, main image, font assets
const engine = RunningEngine();

const assetManager = AssetManager();
assetManager.load("common", false, () => {
    const splashScene = SplashScene();
    engine.PointerGroup.registerPointerListener(splashScene);
    engine.Scene = splashScene;
    engine.start();
});
