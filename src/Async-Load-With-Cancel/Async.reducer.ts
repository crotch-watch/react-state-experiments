import {
  asyncEvents,
  asyncStates,
  type AsyncEvent,
  type AsyncState,
} from "./Async.consts"

const { input, error } = asyncStates
const { paramChanged, acknowledged, errored } = asyncEvents

export const asyncReducer = (
  state: AsyncState,
  action: AsyncEvent,
): AsyncState => {
  switch (action) {
    case paramChanged: {
      if (state !== input) return state
      else return input
    }

    case errored: {
      if (state === error) return state
      else return error
    }

    case acknowledged: {
      if (state === input) return state
      else return input
    }

    default:
      return state
  }
}
