import Scenario from "./scenario";

let scenarioMap: Map<string, Scenario>;

const initScenario = () => {
    if (scenarioMap === undefined) {
        scenarioMap = new Map<string, Scenario>();
        const key = "main";
        scenarioMap.set(key, new Scenario(key));
    }
    return scenarioMap;
};

const getMainScenario = () => {
    return initScenario().get("main")!;
};
// TODO: get extra scenario

export { Scenario, getMainScenario };
