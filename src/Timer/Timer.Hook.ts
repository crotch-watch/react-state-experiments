import { useEffect, useReducer, useRef } from "react"
import { timerReducer } from "./Timer.Reducer"
import { DEFAULT_STATE, TIMER_MS } from "./Timer.constants"

export const useTimer = () => {
  const [state, dispatch] = useReducer(timerReducer, DEFAULT_STATE)
  const id = useRef<ReturnType<typeof setInterval>>(undefined)

  const start = () => dispatch("start")
  const pause = () => dispatch("pause")
  const reset = () => dispatch("reset")
  const resume = () => dispatch("resume")

  useEffect(() => {
    const { status } = state

    if (status === "ticking") {
      id.current = setInterval(() => dispatch("tick"), TIMER_MS)
    }

    if (status !== "ticking") {
      clearInterval(id.current)
      id.current = undefined
    }

    return () => clearInterval(id.current)
  }, [state.status])

  return { state, setters: { start, pause, resume, reset } }
}
