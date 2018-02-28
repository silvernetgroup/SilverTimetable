export default class FloorCoords {

    public static getCoords(roomNumber?: string): {X: string, Y: string} {
        switch (roomNumber) {
            case "IV":
            case "Aula IV":
                return {X: "57%", Y: "40%"};

            case "III":
            case "Aula III":
                return {X: "37%", Y: "40%"};

            case "3/31":
                return {X: "20%", Y: "7%"};
            case "3/33":
                return {X: "32.5%", Y: "6.5%"};
            case "3/34":
                return {X: "37.5%", Y: "6.5%"};
            case "3/35":
                return {X: "41.5%", Y: "6.5%"};
            case "3/36":
                return {X: "47.5%", Y: "6.5%"};
            case "3/37":
                return {X: "55.5%", Y: "6.5%"};
            case "3/38":
                return {X: "62.5%", Y: "6.5%"};

            case "3/40":
                return {X: "75%", Y: "7.5%"};
            case "3/41":
                return {X: "74.75%", Y: "13%"};
            case "3/42":
                return {X: "74.75%", Y: "16.5%"};
            case "3/43":
                return {X: "74.75%", Y: "21.5%"};
            case "3/44":
                return {X: "74.75%", Y: "26%"};
            case "3/24":
                return {X: "74.75%", Y: "31%"};

            case "3/3":
                return {X: "74.75%", Y: "50.5%"};
            case "3/71":
                return {X: "74.75%", Y: "55.5%"};
            case "3/72":
                return {X: "74.75%", Y: "60.25%"};
            case "3/73":
                return {X: "74.75%", Y: "65%"};
            case "3/74":
                return {X: "74.75%", Y: "72%"};

            case "3/77":
                return {X: "55%", Y: "75%"};
            case "3/78":
                return {X: "47%", Y: "75%"};

            case "3/79":
                return {X: "39%", Y: "75%"};
            case "3/80":
                return {X: "32%", Y: "75%"};

            case "3/82":
                return {X: "19.75%", Y: "72%"};
            case "3/83":
                return {X: "19.75%", Y: "65%"};
            case "3/84":
                return {X: "19.75%", Y: "60.5%"};
            case "3/85":
                return {X: "19.75%", Y: "55.5%"};
            case "3/11":
                return {X: "19.75%", Y: "50.5%"};

            case "3/14":
                return {X: "19.75%", Y: "31%"};
            case "3/27":
                return {X: "19.75%", Y: "26%"};
            case "3/28":
                return {X: "19.75%", Y: "21%"};
            case "3/29":
                return {X: "19.75%", Y: "16.5%"};
            case "3/30":
                return {X: "19.75%", Y: "12.75%"};

            case "3/58":
                return {X: "40.75%", Y: "13%"};
            case "3/57":
                return {X: "45.25%", Y: "13%"};
            case "3/56":
                return {X: "50%", Y: "13%"};
            case "3/55":
                return {X: "54.25%", Y: "13%"};
            case "3/18":
                return {X: "38.75%", Y: "31.75%"};
            case "3/19":
                return {X: "47.25%", Y: "31.75%"};
            case "3/20":
                return {X: "56%", Y: "31.75%"};
            case "3/46":
                return {X: "63.25%", Y: "27.5%"};
            case "3/69":
                return {X: "31.25%", Y: "27.5%"};
            case "3/47":
                return {X: "63.25%", Y: "25%"};
            case "3/48":
                return {X: "63.25%", Y: "22.75%"};
            case "3/49":
                return {X: "63.25%", Y: "20.25%"};
            case "3/50":
                return {X: "63.25%", Y: "17.75%"};
            case "3/51":
                return {X: "63.25%", Y: "15.5%"};

            case "3/68":
                return {X: "31.25%", Y: "25%"};
            case "3/67":
                return {X: "31.25%", Y: "22.75%"};
            case "3/66":
                return {X: "31.25%", Y: "20.25%"};
            case "3/65":
                return {X: "31.25%", Y: "17.75%"};
            case "3/64":
                return {X: "31.25%", Y: "15.5%"};

            case "3/6":
                return {X: "55.5%", Y: "50%"};
            case "3/7":
                return {X: "47%", Y: "50%"};
            case "3/8":
                return {X: "38.5%", Y: "50%"};
            case "3/109":
                return {X: "63.25%", Y: "55%"};
            case "3/108":
                return {X: "63.25%", Y: "57.25%"};
            case "3/107":
                return {X: "63.25%", Y: "59.75%"};
            case "3/106":
                return {X: "63.25%", Y: "62%"};
            case "3/105":
                return {X: "63.25%", Y: "64.5%"};
            case "3/104":
                return {X: "63.25%", Y: "66.5%"};

            case "3/91":
                return {X: "31%", Y: "66.75%"};
            case "3/90":
                return {X: "31%", Y: "64.5%"};
            case "3/89":
                return {X: "31%", Y: "62%"};
            case "3/88":
                return {X: "31%", Y: "59.75%"};
            case "3/87":
                return {X: "31%", Y: "57.25%"};
            case "3/86":
                return {X: "31%", Y: "55%"};

            case "3/95":
                return {X: "40.25%", Y: "69.5%"};
            case "3/96":
                return {X: "44.5%", Y: "69.5%"};
            case "3/97":
                return {X: "49.25%", Y: "69.5%"};
            case "3/98":
                return {X: "54%", Y: "69.5%"};

            case null:
            default:
            return {X: "-10%", Y: "-10%"};
        }
    }
}
