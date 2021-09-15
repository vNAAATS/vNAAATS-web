// Split an XX/XX format coordinate to a Waypoint object
export function coordToArray(coord: string) : string[] {

    if(coord.includes("/")) {
        const splitCoord: string[]= coord.split('/');

        const res: string[] = [splitCoord[0] + "N", splitCoord[1] + "W"];

        return res;
    }
    
    return []; // Default to empty array because it's a named waypoint
}

export function parseTime(dateTime: Date) : string {
    let rawHours: number = dateTime.getUTCHours();
    let rawMinutes = dateTime.getUTCMinutes();
    
    // Pad the zeros
    let hours: string = rawHours > 9 ? rawHours.toString() : "0" + rawHours.toString();
    let minutes: string = rawMinutes > 9 ? rawMinutes.toString() : "0" + rawMinutes.toString();

    return hours + ":" + minutes;
}