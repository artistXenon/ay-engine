export type SceneType = "speak" | "cg";

export type StoryData = {
    type: SceneType;
    beforeBody?: string[];
    afterBody?: string[];
    speaker?: string;
    line?: string;
};

export type StoryChapter = {
    meta: { assets: string[] };
    scenario: StoryData[];
};
