import type { Timer } from "./Timer.Types"

export const TIMER_MS = 1000

export const DEFAULT_STATE: Timer = {
  count: 0,
  status: "initial",
} as const
