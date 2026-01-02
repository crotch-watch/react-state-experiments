import { DEFAULT_STATE } from "./Timer.constants"
import type { Timer, TimerEvent } from "./Timer.Types"

export const timerReducer = (state: Timer, action: TimerEvent): Timer => {
  const { count, status } = state

  switch (action) {
    case "start":
      if (status === "initial") return { ...state, status: "ticking" }
      else return state

    case "tick":
      if (status === "ticking") return { ...state, count: count + 1 }
      else return state

    case "pause":
      if (status === "ticking") return { ...state, status: "paused" }
      else return state

    case "resume":
      if (status === "paused") return { ...state, status: "ticking" }
      else return state

    case "reset":
      if (status === "initial") return state
      else return DEFAULT_STATE

    default:
      return DEFAULT_STATE
  }
}
