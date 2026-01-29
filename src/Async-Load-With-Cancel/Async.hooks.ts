import { useEffect, useReducer, useState } from "react"
import { asyncReducer } from "./Async.reducer"
import { asyncEvents, asyncStates, BASE_URL } from "./Async.consts"

const { input } = asyncStates
const { paramChanged, errored, acknowledged } = asyncEvents

export const useAsync = () => {
  const [state, dispatch] = useReducer(asyncReducer, input)
  const [param, setParam] = useState("")
  const [result, setResult] = useState()

  const acknowledgeError = () => dispatch(acknowledged)
  const changeParam = (userId: string) => setParam(userId)

  useEffect(() => {
    if (state === input) {
      dispatch(paramChanged)

      const abortController = new AbortController()

      fetch(`${BASE_URL}?=${param}`, { signal: abortController.signal })
        .then((res) => res.json())
        .then(setResult)
        .catch(() => dispatch(errored))

      return () => abortController.abort("aborting previous user request")
    }
  }, [state, param])

  return {
    state: { state },
    action: { acknowledgeError, changeParam },
    result,
  }
}
