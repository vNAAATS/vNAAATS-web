import "./objects";
import cron from 'node-cron';

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

export class DataFetcher {
    static natTracksApi = "https://tracks.ganderoceanic.ca/data";
    static singleAircraftGet = "https://vnaaats-net.ganderoceanic.ca/api/FlightDataSingleGet?callsign=";
    static allAircraftGet = "https://vnaaats-net.ganderoceanic.ca/api/FlightDataAllGet";

    // Data lists
    static currentNatTracks: NatTrack[] = new Array<NatTrack>();
    static networkAircraft: Aircraft[] = new Array<Aircraft>();

    static parseNatTracks() : void {

    }

    static async populateAllAircraft() {
        // Dynamic data variable
        let res = "";
        

        fetch(DataFetcher.allAircraftGet)
        .then(function(response) {
            response.text().then(function(text) {
                res = text;
                let obj: JsonAcObj[] = JSON.parse(res);
                for(let i:number = 0; i < obj.length; i++) {
                    // Parse route
                    let routePoints: string[] = obj[i].route.split(' ');
                    let routeEtas: string[] = obj[i].routeEtas.split(' ');
                    let ac: Aircraft = { 
                        Callsign: obj[i].callsign,
                        AssignedLevel: obj[i].assignedLevel,
                        AssignedMach: obj[i].assignedMach,
                        Track: obj[i].track,
                        Route: routePoints,
                        RouteEtas: routeEtas,
                        Departure: obj[i].departure,
                        Arrival: obj[i].arrival,
                        IsEquipped:  obj[i].isEquipped,
                        TrackedBy: obj[i].trackedBy,
                        LastUpdated: Date.parse(obj[i].lastUpdated)
                    }                    
                    DataFetcher.networkAircraft.push(ac);
                    console.log(ac.Callsign);
                }
            });
        });
        return;
    }

    static getSingleAircraft(callsign: string) : void {

    }

    static async runDataFetcher() {        
        console.log("Cron starting...")
        
        this.populateAllAircraft();

        cron.schedule("*/15 * * * * *", async () => {
            this.populateAllAircraft();
            console.log("Running cron")
            return 1;
        });
    }
}