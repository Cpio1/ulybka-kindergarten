import {
  Baby,
  Clock3,
  HeartHandshake,
  Languages,
  MessagesSquare,
  Palette,
  Puzzle,
  Sprout,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

/** Icons for the `key` fields of the dictionaries (facts, advantages, about points, activities). */
export const keyIcons: Record<string, LucideIcon> = {
  ages: Baby,
  hours: Clock3,
  meals: UtensilsCrossed,
  language: Languages,
  care: HeartHandshake,
  talk: Users,
  play: Puzzle,
  creativity: Palette,
  growth: Sprout,
  chat: MessagesSquare,
};

export const iconFor = (key: string): LucideIcon => keyIcons[key] ?? Sprout;
