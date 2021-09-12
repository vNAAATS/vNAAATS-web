// Split an XX/XX format coordinate to a Waypoint object
export function coordToArray(coord: string) : string[] {

    if(coord.includes("/")) {
        const splitCoord: string[]= coord.split('/');

        const res: string[] = [splitCoord[0] + "N", splitCoord[1] + "W"];

        return res;
    }
    
    return []; // Default to empty array because it's a named waypoint
}