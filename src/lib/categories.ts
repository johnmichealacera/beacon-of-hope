export const CATEGORIES = {
  GRATITUDE: {
    label: "Gratitude",
    color: "#D4A574",
    glowColor: "rgba(212, 165, 116, 0.6)",
    cssClass: "beacon-gratitude",
  },
  HOPE: {
    label: "Hope",
    color: "#7BA7CC",
    glowColor: "rgba(123, 167, 204, 0.6)",
    cssClass: "beacon-hope",
  },
  PRAYER: {
    label: "Prayer",
    color: "#E8E0D4",
    glowColor: "rgba(232, 224, 212, 0.6)",
    cssClass: "beacon-prayer",
  },
  CONFESSION: {
    label: "Confession",
    color: "#9B7DB8",
    glowColor: "rgba(155, 125, 184, 0.6)",
    cssClass: "beacon-confession",
  },
  DREAM: {
    label: "Dream",
    color: "#8FB896",
    glowColor: "rgba(143, 184, 150, 0.6)",
    cssClass: "beacon-dream",
  },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

export const CATEGORY_KEYS = Object.keys(CATEGORIES) as CategoryKey[];
