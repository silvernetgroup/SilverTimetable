import * as React from "react";
import * as config from "react-global-configuration";
import configuration from "../Config";

export default class FileManager {
  public static setupFiles(save) {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
        fs.root.getFile("newPersistentFile.txt", { create: true, exclusive: false }, function (fileEntry) {
            console.log("Loaded config file: " + fileEntry.isFile.toString());
            if (save === true) {
              FileManager.writeFile(fileEntry, config.serialize());
            } else {
              FileManager.readFile(fileEntry);
            }
        });
    });
  }

  public static writeFile(fileEntry, dataObj) {
    fileEntry.createWriter(function (fileWriter) {
        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
            FileManager.readFile(fileEntry);
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };

        fileWriter.write(dataObj, true);
    });
}

  public static readFile(fileEntry) {
    fileEntry.file(function (file) {
        const reader = new FileReader();
        reader.onloadend = function() {
            if (this.result === "") {
                console.log("Wczytuje domyślne");
                config.set(configuration, { freeze: false });
            } else {
                console.log("Wczytuje z pliku: " + this.result);
                config.set(JSON.parse(this.result), { freeze: false });
            }
        };
        reader.readAsText(file);
    });
  }
}
