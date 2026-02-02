import type { AsyncState, Posts } from "./Async.types"

export const asyncStates = {
  input: "input",
  error: "error",
} as const

Object.freeze(asyncStates)

export type AsyncMode = keyof typeof asyncStates

export const asyncEvents = {
  paramChanged: "paramChanged",
  errored: "errored",
  acknowledged: "acknowledged",
} as const

Object.freeze(asyncEvents)

export type AsyncEvent = keyof typeof asyncEvents

export const DEFAULT_ASYNC_MODE = asyncStates.input
export const NO_PARAM = ""
export const NO_POSTS: Posts = []
export const NO_ERROR = ""

export const DEFAULT_ASYNC_STATE: AsyncState = {
  mode: DEFAULT_ASYNC_MODE,
  param: NO_PARAM,
  posts: NO_POSTS,
  errorMessage: NO_ERROR,
} as const

Object.freeze(DEFAULT_ASYNC_STATE)

export const BASE_URL = "https://jsonplaceholder.typicode.com/posts"
export const ABORT_MESSAGE = "aborting previous user request"
