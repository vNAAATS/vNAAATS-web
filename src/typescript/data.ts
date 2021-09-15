/* eslint-disable no-self-assign */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { CronJob } from 'cron';
import { find } from 'lodash';
import type { Aircraft, NatTrack, Waypoint, TrackDirection } from './objects';

// Link constants
const natTracksApi = "https://tracks.ganderoceanic.ca/data";
const singleAircraftGet = "https://vnaaats-net.ganderoceanic.ca/api/FlightDataSingleGet?callsign=";
const allAircraftGet = "https://vnaaats-net.ganderoceanic.ca/api/FlightDataAllGet";

// Data lists
export let trackError: boolean = false;
export let currentTMI: string = "";
export let currentNatTracks: Map<string, NatTrack> = new Map();
export let networkAircraft: Map<string, Map<string, Aircraft>> =  new Map();
export let aircraftCount: number = 0;
export let sortAscending: boolean = false;

// Selected aircraft
export let asel: Aircraft = null;

// Json interface
interface JsonAcObj {
    callsign: string;
    type?: string;
    assignedLevel: number;
    assignedMach: number;
    track: string;
    route: string;
    routeEtas: string;
    departure: string;
    arrival: string;
    direction?: string;
    isEquipped: boolean;
    trackedBy: string;
    lastUpdated: string;
}

export function findAircraftLocal(callsign: string) : Aircraft {
    let found: boolean = false;
    let ac: Aircraft;
    
    // Loop through each of the aircraft maps to check for  matches
    networkAircraft.forEach((value, key) => {
        if (value.size < 1) return; // no data to check so skip
        // If not undefined then we have a match so set it
        if (value.get(callsign) != null && value.get(callsign).Callsign != undefined) {
            // we found it
            ac = value.get(callsign);
            found = true;
            return;
        }
        return;
    });

    // Return it
    // we didn't find it :(
    return found ? ac : null;
}

export function setAsel(callsign: string) : void {
    // Check if exists and check to see if it matches
    if (asel != null && callsign === asel.Callsign) {
        return;
    }

    // Doesn't match so assign
    let found: Aircraft  = findAircraftLocal(callsign);

    if (found != null) {
        asel = found;
    }
}

export async function parseNatTracks() {
    // Dynamic data variable
    let res = "";
    console.log("Downloading Track Data.");

    // Get the data
    await fetch(natTracksApi)
    .then(function(response) {
        response.text().then(function(text) {
            // Parse to json
            res = text;
            let objArr: [] = JSON.parse(res);
            
            let isUpdateReqd: boolean = false;

            // Safety check to see if the array is empty
            if (objArr.length != 0) {
                trackError = false;
                // Compare the TMIs if not first run
                if (currentTMI != "") {
                    // If the TMI is different then we need to update the tracks
                    currentTMI !== objArr[0].tmi ? isUpdateReqd = true : isUpdateReqd = false;
                    console.log("Tracks not downloaded: Already to date.")
                } else {
                    // First run so request update
                    isUpdateReqd = true
                }
            } else {
                trackError = true;
            }
            
            // Skip next part if no update needed
            if (!isUpdateReqd) return;

            // Purge existing tracks
            currentNatTracks = new Map();
            // Now assign
            for(let i:number = 0; i < objArr.length; i++) {
                let track: NatTrack = {
                    Identifier: objArr[i].id,
                    TMI: objArr[i].tmi,
                    Route: objArr[i].route,
                    FlightLevels: objArr[i].flightLevels,
                    Direction: objArr[i].direction == 1 || objArr[i].direction == 2 ? (objArr[i].direction - 1) : objArr[i].direction,
                    ValidFrom: parseInt(objArr[i].validFrom),
                    ValidTo: parseInt(objArr[i].validTo)
                }
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

export async function populateAllAircraft() {
    // Dynamic data variable
    let res = "";
    console.log("Populating aircraft array.");
    
    await fetch(allAircraftGet + (sortAscending ? "?sort=1" : "?sort=0"))
    .then(function(response) {
        response.text().then(function(text) {
            // Parse json
            res = text;
            let objArr: JsonAcObj[] = JSON.parse(res);

            // Purge map if new tracks found
            if (networkAircraft.size != currentNatTracks.size-1)
            {
                // Bye bye
                networkAircraft = new Map();
                
                // Re-instantiate tracks
                currentNatTracks.forEach(function(value,key) {
                    networkAircraft.set(key, new Map());
                });

                // And add random route for good measure :)
                networkAircraft.set("RR", new Map());
            }
            else {
                // Just reset the already existing aircraft maps
                networkAircraft.forEach(function(value,key) {
                    networkAircraft.set(key, new Map());
                });
                // Just in case
                networkAircraft.set("RR", new Map());
            }

            // Set counter
            aircraftCount = objArr.length;
            
            for(let i:number = 0; i < aircraftCount; i++) {
                // Parse route
                let routePoints: string[] = objArr[i].route.split(' ');
                let routeEtas: string[] = objArr[i].routeEtas.split(' ');

                // Get direction
                let dir: boolean;
                if (objArr[i].track != "RR" && currentNatTracks.get(objArr[i].track) != null) {
                    dir = currentNatTracks.get(objArr[i].track).Direction == 1 ? true : false;
                } else {
                    dir = true;
                    objArr[i].track = "RR"
                }

                let ac: Aircraft = { 
                    Callsign: objArr[i].callsign,
                    AssignedLevel: objArr[i].assignedLevel,
                    AssignedMach: objArr[i].assignedMach,
                    Track: objArr[i].track,
                    Route: routePoints,
                    RouteEtas: routeEtas,
                    Departure: objArr[i].departure,
                    Arrival: objArr[i].arrival,
                    IsEquipped:  objArr[i].isEquipped,
                    TrackedBy: objArr[i].trackedBy,
                    Direction: dir,
                    LastUpdated: Date.parse(objArr[i].lastUpdated)
                }
                // Check the track
                if (ac.Track != "RR" && currentNatTracks.has(ac.Track)) {
                    
                    networkAircraft.get(ac.Track).set(ac.Callsign, ac);
                }
                else {
                    networkAircraft.get("RR").set(ac.Callsign, ac);
                }
            }
        });
    });
    return;
}

export function runDataFetcher() {        
    console.log("Cron starting...")
    
    // First population
    parseNatTracks();
    populateAllAircraft();

    /* NB: We need to do the cron with each increment of 5 otherwise the methods run several times */
    // Aircraft cron (run every 5 seconds)
    setInterval(() => {
        populateAllAircraft();
    }, 5000);

    // Tracks cron (run every 5 seconds)
    let tkJob = new CronJob('0 0,5,10,15,20,25,30,35,40,45,50,55 * * * *', parseNatTracks, null, true);
    tkJob.start();
}