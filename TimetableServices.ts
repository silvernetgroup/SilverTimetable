export class TimeTableServices {

    constructor(){}
     downloadTimetableFile(/*url: string*/) {
        var xhttp = new XMLHttpRequest();
        //xhttp.open('GET', url, true);
        xhttp.send(null)
        return xhttp.responseText

    }
}