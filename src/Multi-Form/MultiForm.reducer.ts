import {
  ENROLLER_STATES,
  ENROLLER_MACHINE,
  FORM_EVENTS,
} from "./MultiForm.constants"
import type { EnorollerTable, MachineState } from "./MultiForm.types"

const { dashboard, form } = ENROLLER_STATES
const { SAVE_AND_EXIT } = FORM_EVENTS

export const multiReducer = (
  state: MachineState,
  actions: EnorollerTable,
): MachineState => {
  const { event } = actions

  if (actions.mode !== state.mode) {
    console.warn(`
      Illegal Transition Attempted:
      - Event: ${event} is only valid in Mode: "${actions.mode}"
      - Current Internal State mode is: "${state.mode}"
      Action Ignored.
  `)

    return state
  }

  if (
    actions.mode === form &&
    state.mode === form &&
    actions.event !== "SAVE_AND_EXIT"
  ) {
    if (actions.substate !== state.substate) {
      console.warn(`
      Illegal Transition Attempted:
      - Event: ${actions.event} is only valid in : "${actions.substate}"
      - Current Internal mode is: "${state.substate}"
      Action Ignored.
  `)

      return state
    }
  }

  switch (actions.mode) {
    case dashboard: {
      return ENROLLER_MACHINE.states[actions.mode][actions.event]
    }

    case form: {
      const mode = ENROLLER_MACHINE.states[actions.mode]

      if (actions.event === SAVE_AND_EXIT) return mode[actions.event]

      const event = mode.states[actions.substate]

      // TODO: relation between enroller machine shape and indexing types
      return event[actions.event as keyof typeof event]
    }
  }
}
