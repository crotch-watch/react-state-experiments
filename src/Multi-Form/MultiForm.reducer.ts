import { Events, ENROLLER_STATES, FORM_SUB_STATES } from "./MultiForm.constants"
import type { MachineAction, MachineState } from "./MultiForm.types"

const {
  OPEN_FORM,
  DETAILS_CHECKED,
  PAYMENT_INFO_PROVIDED,
  SUBMIT,
  SAVE_AND_EXIT,
} = Events

const { dashboard, form } = ENROLLER_STATES

const { details, paymentInfo, review, final } = FORM_SUB_STATES

export const multiReducer = (
  state: MachineState,
  actions: MachineAction,
): MachineState => {
  const event = actions.type
  const { mode } = state

  switch (event) {
    case SAVE_AND_EXIT: {
      if (mode !== form) return state
      else return { mode: dashboard }
    }

    case OPEN_FORM: {
      if (mode === form) return state
      else return { mode: form, substate: details }
    }

    case DETAILS_CHECKED: {
      if (mode !== form) return state
      else return { ...state, substate: paymentInfo }
    }

    case PAYMENT_INFO_PROVIDED: {
      if (mode !== form) return state
      else return { ...state, substate: review }
    }

    case SUBMIT: {
      if (mode !== form) return state
      else return { ...state, substate: final }
    }

    default:
      return state
  }
}
