import type { CategoryKey } from "./categories";

export interface BeaconMessage {
  id: string;
  content: string;
  category: CategoryKey;
  lat: number;
  lng: number;
  createdAt: string;
}

export interface CreateMessagePayload {
  content: string;
  category: CategoryKey;
  lat: number;
  lng: number;
}

export interface MapClickEvent {
  lat: number;
  lng: number;
}
