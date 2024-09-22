import { setSaveFile } from "../tauri";
import { SaveBook, SaveData } from "./local-types";

const defaultSave: SaveBook = {
    head: {
        index: [0, 0],
        extra: {},
    },
};

export { defaultSave };

export class Saves {
    private saveBook: SaveBook;

    constructor(saveBook: SaveBook) {
        this.saveBook = saveBook;
    }

    public get Head(): SaveData {
        return this.saveBook.head;
    }

    public getSaveDataAt(index: number): SaveData {
        return this.saveBook[`${index}`];
    }

    /**
     * @returns Must check if a function is returned, it indicates a save data already exists.
     */
    public setSaveDataAt(
        index: number,
        saveData: SaveData,
        overwrite: boolean = false,
    ) {
        if (this.saveBook[`${index}`] === undefined || overwrite) {
            this.saveBook[`${index}`] = saveData;
            this.writeFile();
            return undefined;
        }
        return () => this.setSaveDataAt(index, saveData, true);
    }

    private writeFile() {
        return setSaveFile(this.saveBook);
    }
}
