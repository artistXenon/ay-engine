import Scenario from "./scenario";
import { Directives } from "./directives";
import { ScenarioToC } from "./local-types";
import { getSaveFile } from "../tauri";
import { defaultSaveBook, Saves } from "./saves";

let scenarioMap: Map<string, Scenario> = new Map<string, Scenario>();
let directives: Directives;
let saves: Saves;

const loadScenarios = async () => {
    const rawScenarioToC = await fetch("/scenarios/index.json");
    const scenarioToC = <ScenarioToC>await rawScenarioToC.json();

    const keys = Object.keys(scenarioToC);
    for await (const key of keys) {
        const loadedScenario = await new Promise<Scenario>(
            (resolve) => new Scenario(key, scenarioToC[key]!, resolve),
        );
        scenarioMap.set(key, loadedScenario);
    }
    await loadDirectives();
    await loadSaves();
};

const loadDirectives = async () => {
    directives = await new Promise<Directives>(
        (resolve) => new Directives(resolve),
    );
};

const getMainScenario = () => {
    return scenarioMap.get("main")!;
};
// TODO: get extra scenarios

const getDirectives = () => {
    return directives;
};

const loadSaves = async () => {
    const save = await getSaveFile(defaultSaveBook);
    saves = new Saves(save);
};

const getSaves = () => {
    return saves;
};

export {
    Scenario,
    loadScenarios,
    getMainScenario,
    Directives,
    getDirectives,
    Saves,
    getSaves,
};
