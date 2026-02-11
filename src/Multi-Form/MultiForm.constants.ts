import type { MachineState } from "./MultiForm.types"

export const FORM_SUB_STATES = {
  details: "details",
  paymentInfo: "paymentInfo",
  review: "review",
  final: "final",
} as const

Object.freeze(FORM_SUB_STATES)

export const ENROLLER_STATES = {
  dashboard: "dashboard",
  form: "form",
} as const

export const INITIAL_MACHINE_STATE: MachineState = {
  mode: "dashboard",
} as const

Object.freeze(INITIAL_MACHINE_STATE)

export const Events = {
  OPEN_FORM: "OPEN_FORM",
  SAVE_AND_EXIT: "SAVE_AND_EXIT",
  DETAILS_CHECKED: "DETAILS_CHECKED",
  PAYMENT_INFO_PROVIDED: "PAYMENT_INFO_PROVIDED",
  SUBMIT: "SUBMIT",
} as const

export const DASHBOARD_EVENTS = {
  OPEN_FORM: "OPEN_FORM",
} as const

export const FORM_EVENTS = {
  SAVE_AND_EXIT: "SAVE_AND_EXIT",
  DETAILS_CHECKED: "DETAILS_CHECKED",
  PAYMENT_INFO_PROVIDED: "PAYMENT_INFO_PROVIDED",
  SUBMIT: "SUBMIT",
} as const

Object.freeze(Events)

const { dashboard, form } = ENROLLER_STATES
const { OPEN_FORM } = DASHBOARD_EVENTS
const { SAVE_AND_EXIT, DETAILS_CHECKED, PAYMENT_INFO_PROVIDED, SUBMIT } =
  FORM_EVENTS
const { details, paymentInfo, review, final } = FORM_SUB_STATES

export const ENROLLER_MACHINE = {
  [dashboard]: { [OPEN_FORM]: { mode: form, substate: details } },
  [form]: {
    [SAVE_AND_EXIT]: { mode: dashboard },
    [DETAILS_CHECKED]: { mode: form, substate: paymentInfo },
    [PAYMENT_INFO_PROVIDED]: { mode: form, substate: review },
    [SUBMIT]: { mode: form, substate: final },
  },
}
