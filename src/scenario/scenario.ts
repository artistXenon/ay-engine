import { getDirectives } from ".";
import { SceneData, FrameData, SaveData } from "./local-types";

export default class Scenario {
    public static scenarioToC: string[];

    public sequences: SceneData[][] = [];

    public sequenceIndex = 0;

    public sceneIndex = 0;

    public frameIndex = -1;

    constructor(
        scenarioName: string,
        sequenceCount: number,
        onLoad: (scenario: Scenario) => void,
    ) {
        this.sequences.length = sequenceCount;

        const fetchs = [];
        for (let i = 1; i <= sequenceCount; i++) {
            const sequenceName = `/scenarios/${scenarioName}/sequence-${i}.json`;
            fetchs.push(
                fetch(sequenceName)
                    .then((response) => response.json())
                    .then((scenes) => (this.sequences[i - 1] = scenes))
                    .catch((e) =>
                        window.tauri_panic(
                            `Scenario#constructor(${sequenceName})`,
                            e,
                        ),
                    ),
            );
        }
        Promise.all(fetchs).then(() => onLoad(this));
    }

    public Reset() {
        this.sequenceIndex = 0;
        this.sceneIndex = 0;
        this.frameIndex = -1;
    }

    public resolveNextFrame(save?: SaveData): FrameData | undefined {
        if (
            save &&
            this.sequences.length > save.index[0] &&
            this.sequences[save.index[0]].length > save.index[1] &&
            this.sequences[save.index[0]][save.index[1]].frames.length >
                save.index[2]
        ) {
            // jump
            this.sequenceIndex = save.index[0];
            this.sceneIndex = save.index[1];
            this.frameIndex = save.index[2];
            // TODO: resolve scene metadata
        } else {
            const currentSequence = this.sequences[this.sequenceIndex],
                currentScene = currentSequence[this.sceneIndex];
            if (currentScene.frames.length !== this.frameIndex + 1) {
                this.frameIndex++;
            } else {
                this.frameIndex = 0;
                if (currentSequence.length !== this.sceneIndex + 1) {
                    this.sceneIndex++;
                } else {
                    this.sceneIndex = 0;
                    if (this.sequences.length !== this.sequenceIndex + 1) {
                        this.sequenceIndex++;
                    } else {
                        this.sequenceIndex = 0;
                        return undefined;
                    }
                }
                // TODO: resolve scene metadata
            }
        }

        return this.sequences[this.sequenceIndex][this.sceneIndex].frames[
            this.frameIndex
        ];
    }

    public resolveDirectives(
        rawDirectives: string[],
        to: (() => void)[] = [],
    ): (() => void)[] {
        const resolvedDirectives = to;

        for (const rawDirective of rawDirectives) {
            // parse to method and arguments
            const argIndex = rawDirective.indexOf("(");
            const argEndIndex = rawDirective.lastIndexOf(")");

            const functionName = rawDirective.substring(0, argIndex);
            const rawArgs = rawDirective.substring(argIndex + 1, argEndIndex);
            const args = rawArgs.split(",");

            // WARN: parse fail > warn; continue;
            // look for user directives
            let resDir = getDirectives().get(functionName);
            if (resDir) {
                // TODO: bind appropriate standard
                resolvedDirectives.push(resDir.bind(undefined));
            } else {
                // WARN: directive not found
            }
        }
        return resolvedDirectives;
    }
}
