import { useEffect, useReducer } from "react"
import { asyncReducer } from "./Async.reducer"
import {
  ABORT_MESSAGE,
  asyncEvents,
  asyncStates,
  BASE_URL,
  DEFAULT_ASYNC_STATE,
} from "./Async.consts"
import type { Posts } from "./Async.types"

const { input } = asyncStates
const { paramChanged, errored, acknowledged, processed } = asyncEvents

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
        .then((res) => {
          const posts = res as Posts
          dispatch({ type: processed, payload: posts })
        })
        .catch((e) => {
          const error = e as Error
          dispatch({ type: errored, payload: error.message })
        })

      return () => abortController.abort(ABORT_MESSAGE)
    }
  }, [mode, param])

  return {
    state,
    action: { acknowledgeError, changeParam },
  }
}
