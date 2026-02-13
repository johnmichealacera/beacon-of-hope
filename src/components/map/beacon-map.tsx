"use client";

import { useState, useSyncExternalStore } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import type { BeaconMessage, MapClickEvent } from "@/lib/types";
import { MapClickHandler } from "./map-click-handler";
import { BeaconMarker } from "./beacon-marker";
import { Header } from "@/components/header";
import { CreateLightDialog } from "@/components/modals/create-light-dialog";
import { ViewMessageDialog } from "@/components/modals/view-message-dialog";

interface BeaconMapProps {
  initialMessages: BeaconMessage[];
}

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

const BUCAS_GRANDE_CENTER: [number, number] = [9.85, 125.97];
const SATELLITE_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
const LABELS_URL =
  "https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png";

export function BeaconMap({ initialMessages }: BeaconMapProps) {
  const [messages, setMessages] = useState<BeaconMessage[]>(initialMessages);
  const [clickedPosition, setClickedPosition] = useState<MapClickEvent | null>(
    null
  );
  const [viewingMessage, setViewingMessage] = useState<BeaconMessage | null>(
    null
  );
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function handleMapClick(event: MapClickEvent) {
    console.log("[Beacon] Map clicked at:", event.lat, event.lng);
    setClickedPosition(event);
  }

  function handleMessageCreated(newMessage: BeaconMessage) {
    setMessages((prev) => [newMessage, ...prev]);
    setClickedPosition(null);
  }

  if (!mounted) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#0a0a0f]">
        <p className="animate-pulse font-serif text-lg tracking-wide text-[#8a8a9a]">
          Gathering light...
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Header />

      <MapContainer
        center={BUCAS_GRANDE_CENTER}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
        attributionControl={true}
      >
        <TileLayer
          attribution='Tiles &copy; <a href="https://www.esri.com/">Esri</a> — Source: Esri, Maxar, Earthstar Geographics'
          url={SATELLITE_URL}
        />
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url={LABELS_URL}
        />

        <MapClickHandler onClick={handleMapClick} />

        {messages.map((message) => (
          <BeaconMarker
            key={message.id}
            message={message}
            onClick={setViewingMessage}
          />
        ))}
      </MapContainer>

      <CreateLightDialog
        position={clickedPosition}
        onClose={() => setClickedPosition(null)}
        onCreated={handleMessageCreated}
      />

      <ViewMessageDialog
        message={viewingMessage}
        onClose={() => setViewingMessage(null)}
      />
    </div>
  );
}
