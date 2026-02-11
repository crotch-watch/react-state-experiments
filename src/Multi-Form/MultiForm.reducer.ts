import { ENROLLER_STATES, ENROLLER_MACHINE } from "./MultiForm.constants"
import type { EnrollerEvents, MachineState } from "./MultiForm.types"

const { dashboard, form } = ENROLLER_STATES

export const multiReducer = (
  state: MachineState,
  actions: EnrollerEvents,
): MachineState => {
  const { event, mode: requiredMode } = actions
  const { mode } = state

  if (requiredMode !== mode) {
    console.warn(`
      Illegal Transition Attempted:
      - Event: ${event} is only valid in Mode: "${requiredMode}"
      - Current Internal State mode is: "${mode}"
      Action Ignored.
  `)

    return state
  }

  switch (requiredMode) {
    case dashboard: {
      return ENROLLER_MACHINE[requiredMode][event]
    }

    case form: {
      return ENROLLER_MACHINE[requiredMode][event]
    }
  }
}
