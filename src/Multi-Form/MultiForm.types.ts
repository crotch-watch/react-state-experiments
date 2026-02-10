import type {
  ENROLLER_STATES,
  Events,
  FORM_SUB_STATES,
} from "./MultiForm.constants"

type FormSubState = keyof typeof FORM_SUB_STATES

export type MachineState =
  | {
      mode: typeof ENROLLER_STATES.dashboard
    }
  | {
      mode: typeof ENROLLER_STATES.form
      substate: FormSubState
    }

export type MachineEvent = keyof typeof Events

export type MachineAction = {
  type: MachineEvent
}
