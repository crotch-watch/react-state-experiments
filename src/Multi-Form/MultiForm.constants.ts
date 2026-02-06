export const FORM_STATES = {
  details: "details",
  paymentInfo: "paymentInfo",
  review: "review",
  final: "final",
} as const

Object.freeze(FORM_STATES)

export const ENROLLER_STATES = {
  dashboard: "dashboard",
} as const

Object.freeze(ENROLLER_STATES)

export const MACHINE_STATES = {
  ...ENROLLER_STATES,
  form: FORM_STATES,
} as const

Object.freeze(MACHINE_STATES)

export const INITIAL_MACHINE_STATE = {
  mode: MACHINE_STATES.dashboard,
} as const

Object.freeze(INITIAL_MACHINE_STATE)

export const Events = {
  OPEN_FORM: "OPEN_FORM",
  SAVE_AND_EXIT: "SAVE_AND_EXIT",
  DETAILS_CHECKED: "DETAILS_CHECKED",
  PAYMENT_INFO_PROVIDED: "PAYMENT_INFO_PROVIDED",
  SUBMIT: "SUBMIT",
} as const

Object.freeze(Events)
