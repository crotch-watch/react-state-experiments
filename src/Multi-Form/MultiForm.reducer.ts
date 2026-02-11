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

  if (incomingMode !== mode) {
    console.warn(`
      Illegal Transition Attempted:
      - Event: ${event} is only valid in Mode: "${incomingMode}"
      - Current Internal State mode is: "${mode}"
      Action Ignored.
  `)

    return state
  }

  switch (incomingMode) {
    case dashboard: {
      if (event === OPEN_FORM) return { mode: form, substate: details }
      return state
    }

    case form: {
      if (event === SAVE_AND_EXIT) return { mode: dashboard }

      if (event === DETAILS_CHECKED)
        return { mode: form, substate: paymentInfo }

      if (event === PAYMENT_INFO_PROVIDED)
        return { mode: form, substate: review }

      if (event === SUBMIT) return { mode: form, substate: final }

      return state
    }
  }
}
