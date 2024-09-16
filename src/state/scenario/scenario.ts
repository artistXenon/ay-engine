import PredefinedDirectives from "./directives";
import { SceneData, FrameData, Save } from "./local-types";

export default class Scenario {
    public sequences: SceneData[][] = [];

    public sequenceIndex = 0;

    public sceneIndex = 0;

    public frameIndex = -1;

    private directives: any;

    constructor(path: string, savePath: string) {
        // get local save head
        // TODO: test purpose - head is null
        const head: Save = {
            index: [0, 0, 0], // sequence, scene, frame
            extra: {},
        };

        const sequences = ["/sequence.json"];

        this.sequences.length = sequences.length;

        for (const sci in sequences) {
            fetch(sequences[sci])
                .then((response) => response.json())
                .then((scenes) => (this.sequences[sci] = scenes));
        }

        fetch("/directives.js")
            .then((response) => response.text())
            .then((directives) => (this.directives = eval(directives)));

        // WARN: DEBUG remove
        (<any>window).scenario = this;
    }

    public Reset() {
        this.sequenceIndex = 0;
        this.sceneIndex = 0;
        this.frameIndex = -1;
    }

    public resolveNextFrame(save?: Save): FrameData | undefined {
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
        directives: string[],
        to: (() => void)[] = [],
    ): (() => void)[] {
        const resolvedDirectives = to;

        for (const directive of directives) {
            // parse to method and arguments
            const argIndex = directive.indexOf("(");
            const argEndIndex = directive.lastIndexOf(")");

            const methodName = directive.substring(0, argIndex);
            const rawArgs = directive.substring(argIndex + 1, argEndIndex);
            const args = rawArgs.split(",");

            // WARN: parse fail > warn; continue;
            // look for user directives
            let index = Object.keys(this.directives).indexOf(methodName);
            let resolvedDirective;
            if (index !== -1) {
                resolvedDirective = (<() => void>(
                    this.directives[methodName]
                )).bind(undefined, ...args); // TODO: write default arguments to function. player, engine media etc
            } else {
                // look for pre directives
                index = Object.keys(PredefinedDirectives).indexOf(methodName);
                if (index !== -1) {
                    resolvedDirective = (<() => void>(
                        PredefinedDirectives[methodName]
                    )).bind(undefined, ...args);
                } else {
                    // WARN: directive not found;
                }
            }
            if (resolvedDirective !== undefined) {
                resolvedDirectives.push(resolvedDirective);
            }
        }

        return resolvedDirectives;
    }
}
