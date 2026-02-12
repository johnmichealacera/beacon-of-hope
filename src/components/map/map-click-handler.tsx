"use client";

import { useMapEvents } from "react-leaflet";
import type { MapClickEvent } from "@/lib/types";

interface MapClickHandlerProps {
  onClick: (event: MapClickEvent) => void;
}

export function MapClickHandler({ onClick }: MapClickHandlerProps) {
  useMapEvents({
    click(e) {
      onClick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}
