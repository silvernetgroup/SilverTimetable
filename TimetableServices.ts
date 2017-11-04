export class TimeTableServices {

    SERVER_URL: string

    constructor(){
        this.SERVER_URL=""
    }


    public DownloadTimetableFile() {
        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', this.SERVER_URL, true);
        xhttp.send(null)
        return xhttp.responseText
        
    }
}