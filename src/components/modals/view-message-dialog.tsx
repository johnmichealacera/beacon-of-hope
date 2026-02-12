"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CATEGORIES } from "@/lib/categories";
import type { BeaconMessage } from "@/lib/types";

interface ViewMessageDialogProps {
  message: BeaconMessage | null;
  onClose: () => void;
}

export function ViewMessageDialog({ message, onClose }: ViewMessageDialogProps) {
  if (!message) return null;

  const category = CATEGORIES[message.category];
  const date = new Date(message.createdAt);
  const timeAgo = getRelativeTime(date);

  return (
    <Dialog open={!!message} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="border-[rgba(232,224,212,0.06)] bg-[#0e0e14] sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: category.color,
                boxShadow: `0 0 8px ${category.glowColor}`,
              }}
            />
            <DialogTitle className="font-serif text-sm font-normal tracking-widest uppercase text-[#8a8a9a]">
              {category.label}
            </DialogTitle>
          </div>
          <DialogDescription className="sr-only">
            A message of {category.label.toLowerCase()}
          </DialogDescription>
        </DialogHeader>

        <p className="py-4 font-serif text-lg leading-relaxed text-[#e8e0d4]">
          {message.content}
        </p>

        <p className="text-right text-xs text-[#4a4a5a]">{timeAgo}</p>
      </DialogContent>
    </Dialog>
  );
}

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
