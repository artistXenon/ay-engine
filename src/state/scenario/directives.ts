// predefined directives applied to scenes

const PredefinedDirectives = {
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

export default <any>PredefinedDirectives;
