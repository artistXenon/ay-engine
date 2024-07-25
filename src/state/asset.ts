// import ~~ from './~~';

import { AssetLoader, Bitmap } from "artistic-engine";

const assetMap = {
    common: {
        images: [], // [ name, file?link? ]
        musics: [],
        sfxs: [],
        fonts: [],
    },
    splash: {
        images: [],
        musics: [],
        sfxs: [],
    }
};

// asset 

class AssetManager {
    private assetLoader: AssetLoader = new AssetLoader();

    private imageBitmaps: Map<string, ImageBitmap> = new Map();

    constructor() {

    }

    public load(category: string, withAudio: boolean, onLoad: () => void = () => {}) {
        // TODO: list assets


        this.assetLoader.onLoad = () => {
            onLoad();
            this.assetLoader.onLoad = () => {};
        }
        this.assetLoader.load();
    }

    public getImage(name: string): Promise<ImageBitmap> {
        return new Promise(async (res, rej) => {
            const blob = this.assetLoader.getImage(name);
            if (blob === undefined) {
                return rej(`The image asset ${name} is not loaded.`);
            }
            let imageBitmap = this.imageBitmaps.get(name);
            if (imageBitmap === undefined) {
                imageBitmap = await (new Bitmap(blob)).getImageBitmap();
                this.imageBitmaps.set(name, imageBitmap);
            }
            return res(imageBitmap);
        });
    }
}

let instance: AssetManager | undefined;

const getAssetManager = () => {
    if (instance === undefined) {
        instance = new AssetManager()
    }
    return instance;
}

export default getAssetManager;