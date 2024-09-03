import { StoryChapter, StoryData } from "./local-types";

export default class Scenario {
    public chapters: StoryChapter[] = [];

    public chapterIndex = 0;

    public sceneIndex = 0;

    private directives: any;

    constructor(path: string, savePath: string) {
        // get local save head

        const scenarios = ["/scenario.json"];

        this.chapters.length = scenarios.length;

        for (const sci in scenarios) {
            fetch(scenarios[sci])
                .then((response) => response.json())
                .then((scenario) => (this.chapters[sci] = scenario));
        }

        fetch("/directives.js")
            .then((response) => response.text())
            .then((directives) => (this.directives = eval(directives)));
    }

    public Log() {}

    public Scene(chp: number = -1, scn: number = -1): StoryData | undefined {
        if (
            chp !== -1 &&
            scn !== -1 &&
            this.chapters.length > chp &&
            this.chapters[chp].scenario.length > scn
        ) {
            // jump
            this.chapterIndex = chp;
            this.sceneIndex = scn;
        } else {
            if (this.chapters[chp].scenario.length === this.sceneIndex + 1) {
                if (this.chapters.length === this.chapterIndex + 1) {
                    return undefined;
                }
                this.chapterIndex++;
                this.sceneIndex = 0;
                // TODO: chapter prequisites
            } else this.sceneIndex++;
        }

        return this.chapters[this.chapterIndex].scenario[this.sceneIndex];
    }

    public resolveDirectives(directives: string[], args: any[]) {
        // TODO
        for (const directive of directives) {
            // parse to method and arguments
            //      parse fail > warn; continue;
            // look for user directives
            // look for pre directives
            // not found > warn; continue;
        }
    }
}
