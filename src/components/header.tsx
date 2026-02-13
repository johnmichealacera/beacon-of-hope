"use client";

import { Clock } from "@/components/clock";

export function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[1000] px-6 pt-6">
      <div className="mx-auto max-w-md rounded-2xl bg-[#0a0a0f]/70 px-6 py-5 text-center backdrop-blur-md ring-1 ring-white/5">
        <h1 className="font-serif text-2xl font-medium tracking-wide text-[#e8e0d4]">
          Beacon of Hope
        </h1>
        <p className="mt-1 font-serif text-xs tracking-widest uppercase text-[#8a8a9a]">
          Bucas Grande, Socorro
        </p>
        <Clock />
        <p className="mt-3 font-serif text-sm italic leading-relaxed text-[#6a6a7a]">
          Tap anywhere on the water to leave a light in the dark.
        </p>
      </div>
    </header>
  );
}
