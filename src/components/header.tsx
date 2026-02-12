"use client";

export function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[1000] px-6 pt-8">
      <div className="mx-auto max-w-md text-center">
        <h1 className="font-serif text-2xl font-medium tracking-wide text-[#e8e0d4]">
          Beacon of Hope
        </h1>
        <p className="mt-1 font-serif text-xs tracking-widest uppercase text-[#8a8a9a]">
          Bucas Grande, Socorro
        </p>
        <p className="mt-4 font-serif text-sm italic leading-relaxed text-[#6a6a7a]">
          Tap anywhere on the water to leave a light in the dark.
        </p>
      </div>
    </header>
  );
}
