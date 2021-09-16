/*
 * Defines the objects used in the app
 * Created by Andrew Ogden
 */
export type Aircraft = {
  Callsign: string;
  Type: string;
  AssignedLevel: number;
  AssignedMach: number;
  Track: string;
  Route: string[];
  RouteEtas: string[];
  Departure: string;
  Arrival: string;
  Etd: string;
  Selcal: string;
  Datalink: boolean;
  SectorID: string;
  Direction: boolean;
  IsEquipped: boolean;
  TrackedBy: string;
  State: string;
  Relevant: boolean;
  TargetMode: number;
  LastUpdated: number;
};

export type NatTrakData = {
  callsign: string;
  status: string;
  nat: string;
  fix: string;
  level: number;
  mach: number;
  estimating_time: string;
  clearance_issued: string;
  extra_info: string;
}

export type Waypoint = {
  name: string;
  latitude: number;
  longitude: number;
};

export enum TrackDirection {
  Unknown = 0,
  Westbound = 1,
  Eastbound = 2,
}

export type NatTrack = {
  Identifier: string;
  TMI: string;
  Route: Waypoint[];
  FlightLevels: number[];
  Direction: number;
  ValidTo: number;
  ValidFrom: number;
};
