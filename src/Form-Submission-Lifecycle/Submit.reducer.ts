import {
  submitActions,
  submitModes,
  type SubmitAction,
  type SubmitMode,
} from "./Submit.consts"

const { SUBMITING, SUCCESS, INPUT } = submitModes
const { ERRORED, PROCESSING, SUCCEEDED } = submitActions

export const submitModeReducer = (
  state: SubmitMode,
  action: SubmitAction,
): SubmitMode => {
  switch (action) {
    case PROCESSING:
      if (state !== INPUT) return state
      else return SUBMITING

    case ERRORED:
      if (state !== SUBMITING) return state
      else return INPUT

    case SUCCEEDED:
      if (state !== SUBMITING) return state
      else return SUCCESS

    default:
      return INPUT
  }
}
