import { ENROLLER_MACHINE } from "./MultiForm.constants"

type SubStatesEventMap = typeof ENROLLER_MACHINE.states.form.states
type SubStates = keyof SubStatesEventMap
type DashboardEvent = keyof typeof ENROLLER_MACHINE.states.dashboard

type FormStates = {
  [SubState in SubStates]: { mode: "form"; substate: SubState }
}[SubStates]

export type MachineState = { mode: "dashboard" } | FormStates

type FormTransitions = {
  [SubState in SubStates]: {
    mode: "form"
    substate: SubState
    event: SubStatesEventMap[SubState]["event"] | "SAVE_AND_EXIT"
  }
}[SubStates]

type DashboardTransition = {
  mode: "dashboard"
  event: DashboardEvent
}

export type EnrollerTable = DashboardTransition | FormTransitions
