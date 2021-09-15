/*
 * Utility variables and functions
 * Created by Andrew Ogden
 */

/*
 *  Imports
 */

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
