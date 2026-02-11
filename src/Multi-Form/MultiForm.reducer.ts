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
  const { event, mode: incomingMode } = actions
  const { mode } = state

  switch (incomingMode) {
    case dashboard: {
      if (mode === form) return state
      if (event === OPEN_FORM) return { mode: form, substate: details }
      return state
    }

    case form: {
      if (mode === dashboard) return state

      if (event === SAVE_AND_EXIT) return { mode: dashboard }

      if (event === DETAILS_CHECKED) return { ...state, substate: paymentInfo }
      if (event === PAYMENT_INFO_PROVIDED) return { ...state, substate: review }
      if (event === SUBMIT) return { ...state, substate: final }

      return state
    }
  }
}
