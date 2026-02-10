import {
  DASHBOARD_EVENTS,
  ENROLLER_STATES,
  FORM_EVENTS,
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

type DashBoardEvents = {
  mode: Dashboard
  event: OPEN_FORM
}

const { SAVE_AND_EXIT } = FORM_EVENTS
type SAVE_AND_EXIT = typeof SAVE_AND_EXIT

type FormEvent = {
  mode: Form
  event: SAVE_AND_EXIT
}

type Details = typeof FORM_SUB_STATES.details
type PaymentInfo = typeof FORM_SUB_STATES.paymentInfo
type Review = typeof FORM_SUB_STATES.review

const { DETAILS_CHECKED, PAYMENT_INFO_PROVIDED, SUBMIT } = FORM_EVENTS
type DETAILS_CHECKED = typeof DETAILS_CHECKED
type PAYMENT_INFO_PROVIDED = typeof PAYMENT_INFO_PROVIDED
type SUBMIT = typeof SUBMIT

type FormSubStateEvents =
  | {
      mode: Form
      substate: Details
      event: DETAILS_CHECKED
    }
  | {
      mode: Form
      substate: PaymentInfo
      event: PAYMENT_INFO_PROVIDED
    }
  | {
      mode: Form
      substate: Review
      event: SUBMIT
    }

export type EnrollerEvents = DashBoardEvents | FormEvent | FormSubStateEvents
