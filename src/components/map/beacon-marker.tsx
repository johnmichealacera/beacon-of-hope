"use client";

import L from "leaflet";
import { Marker } from "react-leaflet";
import { CATEGORIES } from "@/lib/categories";
import type { BeaconMessage } from "@/lib/types";

interface BeaconMarkerProps {
  message: BeaconMessage;
  onClick: (message: BeaconMessage) => void;
}

export function BeaconMarker({ message, onClick }: BeaconMarkerProps) {
  const category = CATEGORIES[message.category];

  const icon = L.divIcon({
    className: "",
    html: `<div class="beacon-marker ${category.cssClass}"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });

  return (
    <Marker
      position={[message.lat, message.lng]}
      icon={icon}
      eventHandlers={{
        click: () => onClick(message),
      }}
    />
  );
}
