/*
 *  Script for handling data uplink and downlink
 *  Created by Andrew Ogden
 */

/*
 *  Imports
 */
import { CronJob } from "cron";
import type { Aircraft, NatTrack, NatTrakData } from "./objects";

/*
 *  Definitions
 */
// Json interface
interface JsonAcObj {
  callsign: string;
  type: string;
  assignedLevel: number;
  assignedMach: number;
  track: string;
  route: string;
  routeEtas: string;
  departure: string;
  arrival: string;
  direction: boolean;
  etd: string;
  selcal: string;
  datalinkConnected: boolean;
  isEquipped: boolean;
  state: string;
  relevant: boolean;
  targetMode: number;
  trackedBy: string;
  trackedById: string;
  lastUpdated: string;
}

/*
 *  Properties
 */
// Link constants
const natTracksApi: string = "https://api.vnaaats.net/GetAllNatTracks";
//const singleAircraftGet: string = "https://api.vnaaats.net/GetSingleFlightData?callsign=";
const allAircraftGet: string =
  "https://api.vnaaats.net/GetAllFlightData";
const allNatTrakGet: string = "https://nattrak.vatsim.net/pluginapi.php";
const vatsimStatusData: string = "https://data.vatsim.net/v3/vatsim-data.json";
const corsProxy: string = "https://floating-crag-56199.herokuapp.com/"

// Data lists
export let trackError: boolean = false;
export let currentTMI: string = "";
export let currentNatTracks: Map<string, NatTrack> = new Map();
export let networkAircraft: Map<string, Map<string, Aircraft>> = new Map();
export let natTrakData: Map<string, NatTrakData> = new Map();
export let onlineControllers: string[];
export let aircraftCount: number = 0;
export let relevantAircraftCount: number = 0;
export let sortDescending: boolean = true;
// Selected aircraft
export let asel: Aircraft = null!;

// Crons
export let acUpdateJob;
export let tkUpdateJob;

/*
 *  Functions
 */
export function findAircraftLocal(callsign: string): Aircraft {
  let found: boolean = false;
  let ac: Aircraft = null!;

  // Loop through each of the aircraft maps to check for  matches
  networkAircraft.forEach((value: Map<string, Aircraft>, key: string) => {
    if (value.size < 1) return; // no data to check so skip
    // If not undefined then we have a match so set it
    if (
      value.get(callsign) != null &&
      value.get(callsign)?.Callsign != undefined
    ) {
      // we found it
      ac = value.get(callsign)!;
      found = true;
      return;
    }
    return;
  });

  // Return it
  // we didn't find it :(
  return found ? ac : null!;
}

export function setAsel(callsign: string): void {
  // Check if exists and check to see if it matches
  if (asel != null && callsign === asel.Callsign) {
    return;
  }

  // Doesn't match so assign
  const found: Aircraft = findAircraftLocal(callsign);

  if (found != null) {
    asel = found;
  }
}

export async function parseNatTracks(): Promise<void> {
  // Dynamic data variable
  let res: string = "";

  // Get the data
  await fetch(natTracksApi).then(function (response: Response) {
    response.text().then(function (text: string) {
      // Parse to json
      res = text;
      const objArr: any = JSON.parse(res);

      let isUpdateReqd: boolean = false;

      // Safety check to see if the array is empty
      if (objArr.length != 0) {
        trackError = false;
        // Compare the TMIs if not first run
        if (currentTMI != "") {
          // If the TMI is different then we need to update the tracks
          currentTMI !== objArr?.[0]?.tmi
            ? (isUpdateReqd = true)
            : (isUpdateReqd = false);
        } else {
          // First run so request update
          isUpdateReqd = true;
        }
      } else {
        trackError = true;
      }

      // Skip next part if no update needed
      if (!isUpdateReqd) return;

      // Purge existing tracks
      currentNatTracks = new Map();
      // Now assign
      for (let i: number = 0; i < objArr.length; i++) {
        const track: NatTrack = {
          Identifier: objArr[i].id,
          TMI: objArr[i].tmi,
          Route: objArr[i].route,
          FlightLevels: objArr[i].flightLevels,
          Direction:
            objArr[i].direction == 1 || objArr[i].direction == 2
              ? objArr[i].direction - 1
              : objArr[i].direction,
          ValidFrom: parseInt(objArr[i].validFrom),
          ValidTo: parseInt(objArr[i].validTo),
        };

        if (!track.Direction)
          track.Route = track.Route.reverse();

        console.log(track.Identifier)
        currentNatTracks.set(track.Identifier, track);
      }

      // Force svelte to update the dom
      currentNatTracks = currentNatTracks;

      // Assign TMI
      currentTMI = objArr[0].tmi;
    });
  });
  return;
}

export async function populateAllAircraft() : Promise<void> {
  // Dynamic data variable
  let res: string = "";

  await fetch(allAircraftGet + (sortDescending ? "?sort=1" : "?sort=0")).then(
    function (response: Response) {
      response.text().then(function (text: string) {
        // Parse json
        res = text;
        const objArr: JsonAcObj[] = JSON.parse(res);

        // Purge map if new tracks found
        if (networkAircraft.size != currentNatTracks.size - 1) {
          // Bye bye
          networkAircraft = new Map();

          // Re-instantiate tracks
          currentNatTracks.forEach(function (value: NatTrack, key: string) {
            networkAircraft.set(key, new Map());
          });

          // And add random route for good measure :)
          networkAircraft.set("RR", new Map());
        } else {
          // Just reset the already existing aircraft maps
          networkAircraft.forEach(function (value: Map<string, Aircraft>, key: string) {
            networkAircraft.set(key, new Map());
          });
          // Just in case
          networkAircraft.set("RR", new Map());
        }

        // Set counter
        aircraftCount = objArr.length;
        relevantAircraftCount = 0;


        for (let i: number = 0; i < aircraftCount; i++) {
          // Parse route
          const routePoints: string[] = objArr[i].route.split(" ");
          const routeEtas: string[] = objArr[i].routeEtas.split(" ");
          
          // Handle for when tracks become outdated
          if (currentNatTracks.get(objArr[i].track) == null) {
            objArr[i].track = "RR";
          }

          const ac: Aircraft = {
            Callsign: objArr[i]?.callsign,
            Type: objArr[i]?.type,
            AssignedLevel: objArr[i]?.assignedLevel,
            AssignedMach: objArr[i]?.assignedMach,
            Track: objArr[i]?.track,
            Route: routePoints,
            RouteEtas: routeEtas,
            Departure: objArr[i]?.departure,
            Arrival: objArr[i]?.arrival,
            Etd: objArr[i]?.etd,
            Selcal: objArr[i]?.selcal,
            Datalink: objArr[i]?.datalinkConnected,
            SectorID: objArr[i]?.trackedById,
            State: objArr[i]?.state,
            Relevant: objArr[i]?.relevant ?? false, // TEMPORARY TODO
            IsEquipped: objArr[i]?.isEquipped,
            TrackedBy: objArr[i]?.trackedBy,
            TargetMode: objArr[i]?.targetMode,
            Direction: objArr[i]?.direction,
            LastUpdated: Date.parse(objArr[i]?.lastUpdated),
          };
          // Check the track
          if (ac.Track != "RR" && currentNatTracks.has(ac.Track)) {
            networkAircraft.get(ac.Track)?.set(ac.Callsign, ac);
          } else {
            networkAircraft.get("RR")?.set(ac.Callsign, ac);
          }

          if (ac.Relevant) {
            relevantAircraftCount++;
          }
          // Reverse route if needed
          if (!ac.Direction) {
            ac.Route = ac.Route.reverse();
            ac.RouteEtas = ac.RouteEtas.reverse();
          }
        }
      });
    }
  );
  return;
}

export async function natTrakFetch() : Promise<void> {
  let res: string = "";

  // Get the data
  await fetch(corsProxy + allNatTrakGet).then(function (response: Response) {
    response.text().then(function (text: string) {
        // Parse json
        res = text;
        const objArr: NatTrakData[] = JSON.parse(res);

        // Reset the list
        natTrakData = new Map();
        // Loop and assign
        for(let i: number = 0; i < objArr.length; i++) {
          objArr[i].mach = objArr[i].mach * 100;
          natTrakData.set(objArr[i].callsign, objArr[i]);
        }
    })
  });
}

export async function parseOnlineControllers() : Promise<void> {
  let res: string = "";

  // Get the data
  await fetch(corsProxy + vatsimStatusData).then(function (response: Response) {
    response.text().then(function (text: string) {
        // Parse json
        res = text;
        const objArr: any[] = JSON.parse(res);

        // Reset the list
        natTrakData = new Map();
        // Loop and assign
        for(let i: number = 0; i < objArr.length; i++) {
          objArr[i].mach = objArr[i].mach * 100;
          natTrakData.set(objArr[i].callsign, objArr[i]);
        }
    })
  });
}

export function runDataFetcher() : void {
  console.log("Crons starting...");

  // First population
  parseNatTracks();
  populateAllAircraft();
  natTrakFetch();
  
  // Aircraft & natTrak cron (run every 5 seconds)
  acUpdateJob = setInterval(() => {
    populateAllAircraft();
    natTrakFetch();
  }, 5000);

  /* NB: We need to do the cron with each increment of 5 otherwise the methods run several times */
  // Tracks cron (run every 5 seconds)
  tkUpdateJob = setInterval(() => {
    parseNatTracks();
  }, 300000);
}
