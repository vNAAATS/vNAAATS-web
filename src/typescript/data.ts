import { CronJob } from 'cron';
import { onMount } from 'svelte';
import type { Aircraft, NatTrack, Waypoint, TrackDirection } from './objects';

// Link constants
const natTracksApi = "https://tracks.ganderoceanic.ca/data";
const singleAircraftGet = "https://vnaaats-net.ganderoceanic.ca/api/FlightDataSingleGet?callsign=";
const allAircraftGet = "https://vnaaats-net.ganderoceanic.ca/api/FlightDataAllGet";

// Data lists
export let trackError: boolean = false;
export let currentTMI: string = "";
export let currentNatTracks: NatTrack[] = [];
export let networkAircraft: Aircraft[] =  [];

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

export function parseNatTracks() : void {
    // Dynamic data variable
    let res = "";
    console.log("Downloading Track Data.");

    // Get the data
    fetch(natTracksApi)
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
            currentNatTracks = [];

            // Assign TMI
            currentTMI = objArr[0].tmi;

            // Now assign
            for(let i:number = 0; i < objArr.length; i++) {
                let track: NatTrack = {
                    Identifier: objArr[i].id,
                    TMI: objArr[i].tmi,
                    Route: objArr[i].route,
                    FlightLevels: objArr[i].flightLevels,
                    Direction: objArr[i].direction,
                    ValidFrom: Date.parse(objArr[i].validFrom),
                    ValidTo: Date.parse(objArr[i].validTo)
                }
                currentNatTracks.push(track);
            }

            console.log(currentNatTracks);
        });
    });
    return;
}

export function populateAllAircraft() {
    // Dynamic data variable
    let res = "";
    console.log("Populating aircraft array.");

    fetch(allAircraftGet)
    .then(function(response) {
        response.text().then(function(text) {
            // Parse json
            res = text;
            let objArr: JsonAcObj[] = JSON.parse(res);

            // Overwrite data
            let temp: Aircraft[] =  [];

            for(let i:number = 0; i < objArr.length; i++) {
                // Parse route
                let routePoints: string[] = objArr[i].route.split(' ');
                let routeEtas: string[] = objArr[i].routeEtas.split(' ');
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
                    LastUpdated: Date.parse(objArr[i].lastUpdated)
                }          
                temp.push(ac);
            }

            // Overwrite
            networkAircraft = temp;
            console.log(networkAircraft);
        });
    });
    return;
}

export function getSingleAircraft(callsign: string) : void {

}

export function runDataFetcher() {        
    console.log("Cron starting...")
    
    // First population
    populateAllAircraft();
    parseNatTracks();

    // Aircraft cron
    let acJob = new CronJob('*/15 * * * * *', populateAllAircraft, null, true);
    
    // Tracks cron
    let tkJob = new CronJob('0 */5 * * * *', parseNatTracks, null, true);

    acJob.start();
    tkJob.start();
}