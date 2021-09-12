export type Aircraft = {
    Callsign: string;
    Type?: string;
    AssignedLevel: number;
    AssignedMach: number;
    Track: string;
    Route: string[];
    RouteEtas: string[];
    Departure: string;
    Arrival: string;
    Direction?: boolean;
    IsEquipped: boolean;
    TrackedBy: string;
    LastUpdated: number;
}

export type Waypoint = {
    name: string;
    latitude: number;
    longitude: number;
}

export enum TrackDirection {
    Unknown = 0,
    Westbound = 1,
    Eastbound = 2
}

export type NatTrack = {
    Identifier: string;
    TMI: string;
    Route: Waypoint[];
    FlightLevels: number[];
    Direction: number;
    ValidTo: number;
    ValidFrom: number;
}

