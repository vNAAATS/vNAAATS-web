interface Aircraft {
    Callsign: string;
    Type?: string;
    AssignedLevel: number;
    AssignedMach: number;
    Track: string;
    Route: string[];
    RouteEtas:string[];
    Departure: string;
    Arrival: string;
    Direction?: boolean;
    IsEquipped: boolean;
    TrackedBy: string;
    LastUpdated: number;
}


interface Waypoint {
    Name: string;
    Latitude: number;
    Longitude: number;
}

enum TrackDirection {
    Unknown,
    Westbound,
    Eastbound
}

interface NatTrack {
    Identifier: string;
    TMI: string;
    Route: Waypoint[];
    FlightLevels: number[];
    Direction: TrackDirection;
    ValidTo: Date;
    ValidFrom: Date;
}