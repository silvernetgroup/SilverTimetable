export class TimeTableServices {


    public static downloadTimetableFile(url: string): string {

        var xhttp: XMLHttpRequest = new XMLHttpRequest();
        xhttp.open("GET", url, true);
        xhttp.send(null);
        return xhttp.responseText;
    }
}