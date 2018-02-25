export default class FloorCoords {

    public static getCoords(roomNumber: string): {X: string, Y: string} {
        switch (roomNumber) {
            case "58":
                return {X: "40%", Y: "13%"};
            default:
                return null;
        }
    }
}
