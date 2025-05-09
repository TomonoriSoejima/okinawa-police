export interface PoliceStation {
  police_station: string;
  address: string;
  phone: string;
  jurisdiction: string[];
  region: string;
}

export interface StationLocation {
  name: string;
  lat: number;
  lng: number;
}

export interface RegionColors {
  [key: string]: string;
}