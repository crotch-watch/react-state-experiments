import { useEffect, useReducer } from "react"
import { asyncReducer } from "./Async.reducer"
import {
  ABORT_MESSAGE,
  asyncEvents,
  asyncStates,
  BASE_URL,
  DEFAULT_ASYNC_STATE,
} from "./Async.consts"

const { input, error } = asyncStates
const { paramChanged, errored, acknowledged } = asyncEvents

export const useAsync = () => {
  const [state, dispatch] = useReducer(asyncReducer, DEFAULT_ASYNC_STATE)

  const acknowledgeError = () => dispatch({ type: acknowledged })

  const changeParam = (userId: string) => {
    dispatch({ type: paramChanged, payload: userId })
  }

  const { mode, param } = state

  useEffect(() => {
    if (mode === input) {
      const abortController = new AbortController()

      fetch(`${BASE_URL}?=${param}`, { signal: abortController.signal })
        .then((res) => res.json())
        .then(console.log)
        .catch(() => dispatch({ type: errored }))

      return () => abortController.abort(ABORT_MESSAGE)
    }
  }, [mode, param])

  return {
    state: { state },
    action: { acknowledgeError, changeParam },
  }
}
