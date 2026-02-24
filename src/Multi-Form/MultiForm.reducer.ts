import { ENROLLER_MACHINE } from "./MultiForm.constants"
import type { EnrollerTable, MachineState } from "./MultiForm.types"

export const multiReducer = (
  state: MachineState,
  actions: EnrollerTable,
): MachineState => {
  if (actions.mode !== state.mode) {
    console.warn(`
      Illegal Transition Attempted:
      - Event: ${actions.event} is only valid in Mode: "${actions.mode}"
      - Current Internal State mode is: "${state.mode}"
      Action Ignored.
  `)

    return state
  }

  if (
    actions.mode === "form" &&
    state.mode === "form" &&
    actions.event !== "SAVE_AND_EXIT"
  ) {
    if (state.substate !== actions.substate) {
      console.warn(`
      Illegal Transition Attempted:
      - Event: ${actions.event} is only valid in Mode: "${actions.substate}"
      - Current Internal State mode is: "${state.substate}"
      Action Ignored.
  `)

      return state
    }
  }

  switch (actions.mode) {
    case "dashboard": {
      return ENROLLER_MACHINE.states[actions.mode][actions.event]
    }

    case "form": {
      const formTable = ENROLLER_MACHINE.states[actions.mode]

      if (actions.event === "SAVE_AND_EXIT") return formTable[actions.event]

      if (actions.substate !== "final")
        return formTable.states[actions.substate].target

      return state
    }

    default:
      return state
  }
}
