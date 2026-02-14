"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import type { Map as LeafletMap } from "leaflet";
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
const BUCAS_GRANDE_CENTER: [number, number] = [9.620258, 125.958631];

const SATELLITE_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
const LIGHT_LABELS_URL =
  "https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png";
const DARK_ALL_URL =
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

function MapRef({ mapRef }: { mapRef: React.MutableRefObject<LeafletMap | null> }) {
  const map = useMap();
  mapRef.current = map;
  return null;
}

function isDaytime(): boolean {
  const now = new Date();
  const phHour = parseInt(
    now.toLocaleString("en-US", { timeZone: "Asia/Manila", hour: "numeric", hour12: false })
  );
  return phHour >= 6 && phHour < 18;
}

export function BeaconMap({ initialMessages }: BeaconMapProps) {
  const [messages, setMessages] = useState<BeaconMessage[]>(initialMessages);
  const [clickedPosition, setClickedPosition] = useState<MapClickEvent | null>(
    null
  );
  const [viewingMessage, setViewingMessage] = useState<BeaconMessage | null>(
    null
  );
  const [isDay, setIsDay] = useState(isDaytime);
  const [locating, setLocating] = useState(false);
  const fromGeolocation = useRef(false);
  const mapRef = useRef<LeafletMap | null>(null);
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    const interval = setInterval(() => setIsDay(isDaytime()), 60_000);
    return () => clearInterval(interval);
  }, []);

  function handleMapClick(event: MapClickEvent) {
    fromGeolocation.current = false;
    setClickedPosition(event);
  }

  function handleUseMyLocation() {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fromGeolocation.current = true;
        setClickedPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function handleMessageCreated(newMessage: BeaconMessage) {
    setMessages((prev) => [newMessage, ...prev]);
    setClickedPosition(null);

    if (fromGeolocation.current && mapRef.current) {
      mapRef.current.flyTo([newMessage.lat, newMessage.lng], 14, { duration: 2 });
      fromGeolocation.current = false;
    }
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
        minZoom={3}
        maxBoundsViscosity={1.0}
        maxBounds={[[-85, -180], [85, 180]]}
        worldCopyJump={false}
        style={{
          height: "100%",
          width: "100%",
          background: isDay ? "#0d1117" : "#0a0a0f",
        }}
        zoomControl={true}
        attributionControl={true}
      >
        {isDay ? (
          <>
            <TileLayer
              key="satellite"
              attribution='Tiles &copy; <a href="https://www.esri.com/">Esri</a> — Source: Esri, Maxar, Earthstar Geographics'
              url={SATELLITE_URL}
              noWrap={true}
            />
            <TileLayer
              key="light-labels"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url={LIGHT_LABELS_URL}
              noWrap={true}
            />
          </>
        ) : (
          <TileLayer
            key="dark-all"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url={DARK_ALL_URL}
            noWrap={true}
          />
        )}

        <MapRef mapRef={mapRef} />
        <MapClickHandler onClick={handleMapClick} />

        {messages.map((message) => (
          <BeaconMarker
            key={message.id}
            message={message}
            onClick={setViewingMessage}
          />
        ))}
      </MapContainer>

      <div className="pointer-events-none fixed inset-x-0 bottom-8 z-[1000] flex justify-center">
        <button
          onClick={handleUseMyLocation}
          disabled={locating}
          className="pointer-events-auto flex items-center gap-2 rounded-full bg-[#0a0a0f]/70 px-5 py-2.5 font-serif text-sm tracking-wide text-[#e8e0d4] ring-1 ring-white/5 backdrop-blur-md transition-all hover:bg-[#0a0a0f]/90 disabled:opacity-50"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={locating ? "animate-pulse" : ""}
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
          </svg>
          {locating ? "Locating..." : "Light from my location"}
        </button>
      </div>

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
