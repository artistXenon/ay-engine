import { SplashScene } from './scenes';
import { AssetManager, Config, RunningEngine } from './state';
import './style.css'


// init config file
const config = Config();

// read splash, main image, font assets
const engine = RunningEngine();

const assetManager = AssetManager();
assetManager.load("common", false, () => {
    const splashScene = SplashScene();
    engine.PointerGroup.registerPointerListener(splashScene);
    engine.Scene = splashScene;
    engine.start();
});




