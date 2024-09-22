// predefined directives applied to scenes

const predefinedDirectives = {
    bgm: function (audio_asset?: string) {
        // Stub
    },
    bgi: function (image_asset?: string) {
        // Stub
    },
    cg: function (...image_assets: string[]) {
        // Stub
    },
    voice: function () {
        // Stub
    },
    transition: function () {
        // Stub
    },

    jump: function (index: string) {
        // Stub
    },
};

export class Directives {
    private directives: Map<string, (...args: unknown[]) => void> = new Map();

    constructor(onLoad: (dir: Directives) => void) {
        // Stub
        this.overwriteDirevtives(predefinedDirectives);

        fetch("/directives.js")
            .then((response) => response.text())
            .then((rawDir) => {
                this.overwriteDirevtives(eval(rawDir));
            })
            .then(() => onLoad(this))
            .catch((e) => window.tauri_panic(`Directives#constructor`, e));
    }

    // TODO: define return value
    public get(name: string) {
        return this.directives.get(name);
    }

    // TODO: arguments need to be standardized for further use/extend
    // INFO: player, engine, media, frame etc
    public invoke(name: string, ...args: any) {
        this.directives.get(name)?.(...args);
    }

    private overwriteDirevtives(directives: any) {
        const dirKeys = Object.keys(directives);
        for (const dirKey of dirKeys) {
            this.directives.set(dirKey, directives[dirKey]);
        }
    }
}
