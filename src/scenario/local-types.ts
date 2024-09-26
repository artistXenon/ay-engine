export type FrameType = "speak" | "cg" | "choice" | "custom";

export type ScenarioToC = {
    [key: string]: number | undefined;
    main: number;
};

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

export type SaveData = {
    index: [number, number, number];
    extra: any;
};

type saveKey = "head" | `${number}`;

export type SaveBook = {
    [key in saveKey]: SaveData;
};

export interface IPlayer {
    shenanigan(): never;
}
