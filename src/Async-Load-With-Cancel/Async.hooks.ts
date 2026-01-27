import { useReducer, useRef, useState } from "react"
import { asyncReducer } from "./Async.reducer"
import { asyncEvents, asyncStates, BASE_URL } from "./Async.consts"

const { input } = asyncStates
const { paramChanged, errored, acknowledged } = asyncEvents

export const useAsync = () => {
  const [state, dispatch] = useReducer(asyncReducer, input)
  const [posts, setPosts] = useState()

  const abort = useRef<AbortController>(new AbortController())

  const acknowledgeError = () => dispatch(acknowledged)

  const emitError = () => dispatch(errored)

  const send = (userId: string) => {
    abort.current.abort()

    fetch(`${BASE_URL}?userId=${userId}`, {
      signal: abort.current.signal,
    })
      .then((res) => res.json())
      .then((data) => setPosts(data))

    dispatch(paramChanged)
  }

  return {
    state: { state, posts },
    action: { acknowledgeError, emitError, send },
  }
}
