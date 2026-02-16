import {
  DASHBOARD_EVENTS,
  ENROLLER_STATES,
  FORM_EVENTS,
  FORM_SUB_STATE_EVENTS,
  type FORM_SUB_STATES,
} from "./MultiForm.constants"

type FormSubState = keyof typeof FORM_SUB_STATES
const { dashboard, form } = ENROLLER_STATES
type Form = typeof form
type Dashboard = typeof dashboard

export type MachineState =
  | {
      mode: Dashboard
    }
  | {
      mode: Form
      substate: FormSubState
    }

const { OPEN_FORM } = DASHBOARD_EVENTS
type OPEN_FORM = typeof OPEN_FORM

type DashBoardTransition = {
  mode: Dashboard
  event: OPEN_FORM
}

export type EnorollerTable =
  | DashBoardTransition
  | {
      mode: Form
      substate: FormSubState
      event: typeof FORM_EVENTS.SAVE_AND_EXIT
    }
  | {
      mode: Form
      substate: typeof FORM_SUB_STATES.details
      event: typeof FORM_SUB_STATE_EVENTS.DETAILS_CHECKED
    }
  | {
      mode: Form
      substate: typeof FORM_SUB_STATES.paymentInfo
      event: typeof FORM_SUB_STATE_EVENTS.PAYMENT_INFO_PROVIDED
    }
  | {
      mode: Form
      substate: typeof FORM_SUB_STATES.review
      event: typeof FORM_SUB_STATE_EVENTS.SUBMIT
    }
