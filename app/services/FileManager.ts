import ITimetable from "../models/ITimetable";

export default class FileManager {

    public static async initialize() {
        this.fileSystem = await this.setupFileSystem();
    }

    public static async writeFile(fileName, dataObj): Promise<any> {
        const fileEntry = await this.getFileEntry(fileName, this.fileSystem);
        return new Promise((resolve, reject) => {
            fileEntry.createWriter((fileWriter) => {
                let written = false;
                fileWriter.onwriteend = () => {
                    if (!written) {
                        fileWriter.write(new Blob([JSON.stringify(dataObj)], { type: "application/json" }));
                        written = true;
                    } else {
                        resolve();
                    }
                };
                fileWriter.onerror = (e) => {
                    reject(e);
                };
                fileWriter.truncate(0);
            });
        });
    }

    public static async readFile(filename: string): Promise<any> {
        const fileEntry = await this.getFileEntry(filename, this.fileSystem);
        return new Promise<any>((resolve, reject) => {
            const reader = new FileReader();
            fileEntry.file((file) => {
                reader.onloadend = function() {
                    resolve(this.result ? JSON.parse(this.result) : null);
                };
                reader.onerror = (ev) => {
                    reject(ev.error);
                };
                reader.readAsText(file);
            });
        });
    }

    private static fileSystem: FileSystem;

    private static setupFileSystem(): Promise<FileSystem> {
        return new Promise<FileSystem>((resolve, reject) => {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, (fs) => {
                resolve(fs);
            }, (fe) => {
                reject(fe.code);
            });
        });
    }

    private static getFileEntry(fileName: string, fileSystem: FileSystem): Promise<FileEntry> {
        return new Promise<FileEntry>((resolve, reject) => {
            fileSystem.root.getFile(fileName, { create: true, exclusive: false },
                (fileEntry) => resolve(fileEntry),
                (error) => reject(error.code));
        });
    }
}
