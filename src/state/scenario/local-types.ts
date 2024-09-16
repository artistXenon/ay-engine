export type FrameType = "speak" | "cg" | "choice" | "custom";

export type FrameData = {
    type: FrameType;
    beforeBody?: string[];
    afterBody?: string[];
    speaker?: string;
    line?: string;
    choices?: string[];
    choiceHandler?: string;
};

export type SceneData = {
    meta: { assets: string[] };
    frames: FrameData[];
};

export type Save = {
    index: number[];
    extra: any;
};

export interface IPlayer {
    shenanigan(): never;
}
