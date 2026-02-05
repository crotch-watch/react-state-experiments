import { createMachine } from "xstate"

export const submitMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5SwK4CMC2BLALgOiwDsAHFHAYgAUAlAeQGEBRAZWYEkA5AcQG0AGALqJQxAPaxcWUYWEgAHogCMANmV4AzJs0B2bQFY9AFiPqATABoQATyXrFeVasPKAHEYMvTpgL7fLqTFw8AOwcHCIocmYAVXomRgARRP4hJBAxCXDpWQUEYxc8bT4XdT1tF2LtdUMXSxsEFwBOPFNDRsaXEudG02VnX390UOCh3HDCSMZqOmpkwVkMyWy03MVG9QddRT4+RT0+Ru1GwzrEF3sVJyae1XVPXz8QQlEIOFkQ3AXxJZkVxABaZSnBCAgYgD74IikHBfTJSX6gXKGCzWM7aFptRrKHp7YplbRgiEjQJhCKwn45RBmNTKXQHRqKLw1PSHYFNQqY7GmXFuXSE0b4VAAYyFcHgaUWWQR8kQykUGxchnUunOFXKJ1RDQK+x2fCVinOpT2D28QA */
  id: "submit",
  type: "atomic",
  initial: "input",
  states: {
    input: {
      on: {
        PROCESSING: "submitting",
      },
    },
    submitting: {
      on: {
        SUCCEEDED: "success",
        ERRORED: "input",
      },
    },
    success: {
      type: "final",
    },
  },
})
