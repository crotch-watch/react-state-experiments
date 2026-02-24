import type { MachineState } from "./MultiForm.types"

export const INITIAL_MACHINE_STATE: MachineState = {
  mode: "dashboard",
} as const

export const ENROLLER_MACHINE = {
  states: {
    dashboard: { OPEN_FORM: { mode: "form", substate: "details" } },
    form: {
      SAVE_AND_EXIT: { mode: "dashboard" },
      states: {
        details: {
          event: "DETAILS_CHECKED",
          target: { mode: "form", substate: "paymentInfo" },
        },
        paymentInfo: {
          event: "PAYMENT_INFO_PROVIDED",
          target: { mode: "form", substate: "review" },
        },
        review: {
          event: "SUBMIT",
          target: { mode: "form", substate: "final" },
        },
        final: { event: null, target: null },
      },
    },
  },
} as const
