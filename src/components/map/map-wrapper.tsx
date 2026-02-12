"use client";

import dynamic from "next/dynamic";
import type { BeaconMessage } from "@/lib/types";

const BeaconMap = dynamic(
  () => import("./beacon-map").then((mod) => mod.BeaconMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-screen items-center justify-center bg-[#0a0a0f]">
        <p className="font-serif text-lg tracking-wide text-[#8a8a9a] animate-pulse">
          Gathering light...
        </p>
      </div>
    ),
  }
);

interface MapWrapperProps {
  initialMessages: BeaconMessage[];
}

export function MapWrapper({ initialMessages }: MapWrapperProps) {
  return <BeaconMap initialMessages={initialMessages} />;
}
