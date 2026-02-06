import { createMachine } from "xstate"

export const enrollerMachine = createMachine({
  id: "enroller",
  initial: "dashboard",
  states: {
    dashboard: {
      on: { OPEN_FORM: "form" },
    },
    form: {
      id: "stepper",
      initial: "details",
      states: {
        details: {
          on: { DETAILS_FILLED: "payment" },
        },
        payment: {
          on: { CREDENTIALS_ENTERED: "review" },
        },
        review: { on: { SUBMIT: "submitted" } },
        submitted: { type: "final" },
      },
      on: {
        SAVE_AND_EXIT: "dashboard",
      },
    },
  },
})
