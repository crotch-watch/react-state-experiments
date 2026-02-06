import { Events, MACHINE_STATES } from "./MultiForm.constants"
import type { MachineAction, State } from "./MultiForm.types"

const {
  OPEN_FORM,
  DETAILS_CHECKED,
  PAYMENT_INFO_PROVIDED,
  SUBMIT,
  SAVE_AND_EXIT,
} = Events
const { dashboard, form } = MACHINE_STATES

export const multiReducer = (state: State, actions: MachineAction): State => {
  const event = actions.type
  const { mode } = state

  switch (event) {
    case OPEN_FORM: {
      if (mode !== dashboard) return state
      else return { mode: dashboard }
    }

    case SAVE_AND_EXIT: {
      if (mode === dashboard) return state
      else return { mode: dashboard }
    }

    case DETAILS_CHECKED: {
      if (mode !== form.details) return state
      else return { mode: form.paymentInfo }
    }

    case PAYMENT_INFO_PROVIDED: {
      if (mode !== form.paymentInfo) return state
      else return { mode: form.review }
    }

    case SUBMIT: {
      if (mode !== form.review) return state
      else return { mode: form.final }
    }

    default:
      return state
  }
}
