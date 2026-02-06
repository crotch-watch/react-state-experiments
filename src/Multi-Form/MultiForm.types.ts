import type {
  ENROLLER_STATES,
  Events,
  FORM_STATES,
} from "./MultiForm.constants"

export type MachineMode =
  | keyof typeof ENROLLER_STATES
  | keyof typeof FORM_STATES

export type MachineEvent = keyof typeof Events

export type State = {
  mode: MachineMode
}

export type MachineAction = {
  type: MachineEvent
}
