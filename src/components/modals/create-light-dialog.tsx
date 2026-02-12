"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES, CATEGORY_KEYS, type CategoryKey } from "@/lib/categories";
import type { BeaconMessage, MapClickEvent } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CreateLightDialogProps {
  position: MapClickEvent | null;
  onClose: () => void;
  onCreated: (message: BeaconMessage) => void;
}

export function CreateLightDialog({
  position,
  onClose,
  onCreated,
}: CreateLightDialogProps) {
  const [category, setCategory] = useState<CategoryKey | null>(null);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleOpenChange(open: boolean) {
    if (!open) {
      setCategory(null);
      setContent("");
      onClose();
    }
  }

  async function handleSubmit() {
    if (!position || !category || !content.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content.trim(),
          category,
          lat: position.lat,
          lng: position.lng,
        }),
      });

      if (!res.ok) throw new Error("Failed to create message");

      const message: BeaconMessage = await res.json();
      onCreated(message);
      setCategory(null);
      setContent("");
    } catch {
      // silently fail — keep dialog open for retry
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={!!position} onOpenChange={handleOpenChange}>
      <DialogContent className="border-[rgba(232,224,212,0.06)] bg-[#0e0e14] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl font-normal tracking-wide text-[#e8e0d4]">
            Leave a light
          </DialogTitle>
          <DialogDescription className="font-serif text-sm italic text-[#6a6a7a]">
            What does your heart carry tonight?
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap gap-2 pt-2">
          {CATEGORY_KEYS.map((key) => {
            const cat = CATEGORIES[key];
            const isSelected = category === key;
            return (
              <button
                key={key}
                onClick={() => setCategory(key)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-all",
                  "border",
                  isSelected
                    ? "border-transparent text-[#0a0a0f]"
                    : "border-[rgba(232,224,212,0.1)] text-[#8a8a9a] hover:border-[rgba(232,224,212,0.2)] hover:text-[#e8e0d4]"
                )}
                style={
                  isSelected
                    ? {
                        backgroundColor: cat.color,
                        boxShadow: `0 0 12px ${cat.glowColor}`,
                      }
                    : undefined
                }
                type="button"
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <Textarea
          placeholder="Speak softly into the dark..."
          value={content}
          onChange={(e) => setContent(e.target.value.slice(0, 300))}
          className="mt-2 min-h-[120px] resize-none border-[rgba(232,224,212,0.08)] bg-[#111118] font-serif text-sm leading-relaxed text-[#e8e0d4] placeholder:text-[#4a4a5a] focus-visible:ring-[rgba(212,165,116,0.3)]"
        />

        <div className="flex items-center justify-between">
          <span className="text-xs text-[#4a4a5a]">
            {content.length}/300
          </span>
          <Button
            onClick={handleSubmit}
            disabled={!category || !content.trim() || isSubmitting}
            className="rounded-full border-0 bg-[rgba(232,224,212,0.08)] px-6 font-serif text-sm tracking-wide text-[#e8e0d4] transition-all hover:bg-[rgba(232,224,212,0.14)] disabled:opacity-30"
          >
            {isSubmitting ? "Releasing..." : "Release into the night"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
