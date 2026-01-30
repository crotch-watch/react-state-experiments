import { asyncEvents, asyncStates } from "./Async.consts"
import type { AsyncActions, AsyncState } from "./Async.types"

const { input, error } = asyncStates
const { paramChanged, acknowledged, errored } = asyncEvents

export const asyncReducer = (
  state: AsyncState,
  action: AsyncActions,
): AsyncState => {
  const { mode, param, posts, errorMessage } = state

  switch (action.type) {
    case paramChanged: {
      if (mode !== input) return state

      const newParam = action.payload
      if (newParam === param) return state

      return { ...state, param: newParam }
    }

    case errored: {
      // rewrite
      return state
    }

    case acknowledged: {
      // rewrite
      return state
    }

    default:
      return state
  }
}
