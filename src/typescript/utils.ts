import type { Waypoint } from "./objects"

// Convert a waypoint object to "XX/XX" coordinate format
export function decimalLatLonToText(wp: Waypoint) : string {
    return  Math.floor(Math.abs(wp.latitude)).toString() + "/" + Math.floor(Math.abs(wp.longitude)).toString();
}