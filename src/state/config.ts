
// TODO: way to supply local config

class Config {
    public a = 0;

    public resolution = {
        x: 1920,
        y: 1080
    };

    constructor() {

    }
}

let instance: Config | undefined;

const getConfig = () => {
    if (instance === undefined) {
        instance = new Config(/* config link? file? some kind of data */)
    }
    return instance;
}

export default getConfig;