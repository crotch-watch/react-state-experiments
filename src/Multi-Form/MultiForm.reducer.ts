import { Events, ENROLLER_STATES, FORM_SUB_STATES } from "./MultiForm.constants"
import type { EnrollerEvents, MachineState } from "./MultiForm.types"

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
  actions: EnrollerEvents,
): MachineState => {
  const { event } = actions
  const { mode } = state

  switch (event) {
    case SAVE_AND_EXIT: {
      if (mode !== form) return state
      return { mode: dashboard }
    }

    case OPEN_FORM: {
      if (mode !== dashboard) return state
      return { mode: form, substate: details }
    }

    case DETAILS_CHECKED: {
      if (mode !== form) return state
      return { mode: form, substate: paymentInfo }
    }

    case PAYMENT_INFO_PROVIDED: {
      if (mode !== form) return state
      return { mode: form, substate: review }
    }

    case SUBMIT: {
      if (mode !== form) return state
      return { mode: form, substate: final }
    }

    default:
      return state
  }
}
