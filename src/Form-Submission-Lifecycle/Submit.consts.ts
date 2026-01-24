const INPUT = "INPUT"
const SUBMITING = "SUBMITING"
const SUCCESS = "SUCCESS"

export const submitModes = {
  INPUT,
  SUBMITING,
  SUCCESS,
} as const

export type SubmitMode = keyof typeof submitModes

const PROCESSING = "PROCESSING"
const ERRORED = "ERRORED"
const SUCCEEDED = "SUCCEEDED"

export const submitActions = {
  PROCESSING,
  ERRORED,
  SUCCEEDED,
} as const

export type SubmitAction = keyof typeof submitActions
