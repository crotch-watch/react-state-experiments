import { asyncEvents, asyncStates, DEFAULT_ERROR } from "./Async.consts"
import type { AsyncActions, AsyncState, Posts } from "./Async.types"

const { input, error } = asyncStates
const { paramChanged, acknowledged, errored } = asyncEvents

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

      const emptyPosts: Posts = []

      return {
        ...state,
        mode: error,
        posts: emptyPosts,
        errorMessage: action.payload,
      }
    }

    case acknowledged: {
      if (mode !== error) return state

      return { ...state, errorMessage: DEFAULT_ERROR, mode: input }
    }

    default:
      return state
  }
}
