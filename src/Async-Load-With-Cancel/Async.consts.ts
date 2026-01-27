export const asyncStates = {
  input: "input",
  error: "error",
} as const

export type AsyncState = keyof typeof asyncStates

export const asyncEvents = {
  paramChanged: "paramChanged",
  errored: "errored",
  acknowledged: "acknowledged",
} as const

export type AsyncEvent = keyof typeof asyncEvents

export const BASE_URL = "https://jsonplaceholder.typicode.com/posts"
