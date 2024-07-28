import { Scenario } from "./scenario";

let instance: Scenario | undefined;

const getScenario = () => {
    if (instance === undefined) {
        instance = new Scenario('', '');
    }
    return instance;
}

export { getScenario as Scenario };
