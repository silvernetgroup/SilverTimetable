export class TimeTableServices {


    public static downloadTimetableFile(url: string): string {

        var result: string=""
        var xhttp = new XMLHttpRequest();
       xhttp.onreadystatechange=function(){
           if(this.readyState==4 && this.status==200){
               result=xhttp.responseText
           }
       }
        xhttp.open("GET",url,true)
        xhttp.send()
        return "Ready state: "+xhttp.readyState+"\nStatus: "+xhttp.status
    }
}