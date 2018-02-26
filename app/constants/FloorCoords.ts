/*export const coordinates = {
    "3/58": {X: "40%", Y: "13%"},
    "Aula IV": {X: "57%", Y: "40%"},
    "Aula III": {X: "37%", Y: "40%"},
};*/

export default class FloorCoords {

    public static getCoords(roomNumber?: string): {X: string, Y: string} {
      //  roomNumber = "III";
        switch (roomNumber) {

            case "58":
            case "3/58":
                return {X: "40%", Y: "13%"};

            case "IV":
            case "Aula IV":
                return {X: "57%", Y: "40%"};

            case "III":
            case "Aula III":
                return {X: "37%", Y: "40%"};

            case null:
            default:
                return {X: "-10%", Y: "-10%"};
        }
    }
}
