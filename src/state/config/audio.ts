type volume_key = "master" | "voice" | "music";

export type AudioConfig = {
    [key in volume_key]: number;
};
