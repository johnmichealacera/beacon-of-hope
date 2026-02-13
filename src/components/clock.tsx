"use client";

import { useState, useEffect } from "react";

export function Clock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    function getPhilippineTime() {
      return new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Manila",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    }

    const tick = () => setTime(getPhilippineTime());
    queueMicrotask(tick);
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <time className="mt-2 block font-serif text-sm tracking-widest text-[#6a6a7a]">
      {time}
    </time>
  );
}
