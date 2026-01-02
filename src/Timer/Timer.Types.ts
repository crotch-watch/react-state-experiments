export type TimerStatus = "initial" | "ticking" | "paused"

export type Timer = {
  count: number
  status: TimerStatus
}

export type TimerEvent = "start" | "tick" | "pause" | "resume" | "reset"
