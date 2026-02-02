import {
  asyncEvents,
  asyncStates,
  DEFAULT_ASYNC_MODE,
  NO_ERROR,
  NO_POSTS,
} from "./Async.consts"
import type { AsyncActions, AsyncState } from "./Async.types"

const { input, error } = asyncStates
const { paramChanged, acknowledged, errored, processed } = asyncEvents

export const asyncReducer = (
  state: AsyncState,
  action: AsyncActions,
): AsyncState => {
  const { mode, param } = state

  switch (action.type) {
    case paramChanged: {
      if (mode !== input) return state

      const newParam = action.payload
      if (newParam === param) return state

      return { ...state, param: newParam }
    }

    case errored: {
      if (mode !== input) return state

      return {
        ...state,
        mode: error,
        posts: NO_POSTS,
        errorMessage: action.payload,
      }
    }

    case acknowledged: {
      if (mode !== error) return state

      return { ...state, errorMessage: NO_ERROR, mode: DEFAULT_ASYNC_MODE }
    }

    case processed: {
      if (mode !== input) return state

      return {
        ...state,
        posts: action.payload,
        errorMessage: NO_ERROR,
      }
    }

    default:
      return state
  }
}
