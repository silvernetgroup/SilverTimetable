import * as React from "react";
import * as config from "react-global-configuration";
import configuration from "../Config";

import ITimetable from "../models/ITimetable";

export default class FileManager {
    public static setupFiles(save, afterDone) {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, (fs) => {
            fs.root.getFile("newPersistentFile.txt", { create: true, exclusive: false }, (fileEntry) => {
                if (save === true) {
                    FileManager.writeFile(fileEntry, config.serialize());
                } else {
                    FileManager.readFile(fileEntry, afterDone);
                }
            });
        });
    }

    public static writeFile(fileEntry, dataObj) {
        fileEntry.createWriter((fileWriter) => {
            fileWriter.onwriteend = () => {
                console.log("Successful file write...");
            };
            fileWriter.onerror = (e) => {
                console.log("Failed file write: " + e.toString());
            };
            fileWriter.write(dataObj, true);
        });
    }

    public static saveTimetableStorageConfig(timetable) {
        const temp = config.get();
        temp.timetable = timetable;
        config.set(temp);
        this.setupFiles(true, null);
    }

    public static readFile(fileEntry, afterDone) {
        fileEntry.file((file) => {
            const reader = new FileReader();
            reader.onloadend = function()  {
                if (this.result === "") {
                    afterDone(false, this.result);
                    // config.set(configuration, { freeze: false });
                } else {
                    afterDone(true, this.result);
                    // config.set(JSON.parse(this.result), { freeze: false });
                }
            };
            reader.readAsText(file);
        });
    }
}
