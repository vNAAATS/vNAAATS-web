/*
 * Utility variables and functions
 * Created by Andrew Ogden
 */

/*
 *  Imports
 */
import * as dataHandler from "./data"
import type { Aircraft } from "./objects"

/*
 *  Properties
 */

/*
 *  Functions
 */
// Split an XX/XX format coordinate to a Waypoint object
export function coordToArray(coord: string): string[] {
  if (coord.includes("/")) {
    const splitCoord: string[] = coord.split("/");

    const res: string[] = [splitCoord[0] + "N", splitCoord[1] + "W"];

    return res;
  }

  return []; // Default to empty array because it's a named waypoint
}

// Parse time
export function parseTime(dateTime: Date): string {
  const rawHours: number = dateTime.getUTCHours();
  const rawMinutes: number = dateTime.getUTCMinutes();

  // Pad the zeros
  const hours: string = rawHours > 9 ? rawHours.toString() : "0" + rawHours.toString();
  const minutes: string = rawMinutes > 9 ? rawMinutes.toString() : "0" + rawMinutes.toString();

  return hours + ":" + minutes;
}

// Show/hide track headers if relevant/not relevant
export function determineTrackRelevance(arg: string) : boolean {
  let isRelevant: boolean = false;
  // Get the track
  if (dataHandler.currentNatTracks.get(arg) == null) {
    return false;
  }
  else {
    let tk: Map<string, Aircraft> = dataHandler.networkAircraft.get(arg)!;
    tk.forEach((value, key) => {
      if(value.Relevant && new Date().getUTCMinutes() - new Date(value.LastUpdated).getUTCMinutes() < 5) {
        isRelevant = true;
        return;
      }
    });
  }
  
  return isRelevant;
}