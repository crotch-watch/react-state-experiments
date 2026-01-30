import type { AsyncState, Post } from "./Async.types"

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

export const DEFAULT_ASYNC_MODE: AsyncMode = asyncStates.input
export const DEFAULT_PARAM: string = ""
export const DEFAULT_POSTS: Array<Post> = []
export const DEFAULT_ERROR: string = ""

export const DEFAULT_ASYNC_STATE: AsyncState = {
  mode: DEFAULT_ASYNC_MODE,
  param: DEFAULT_PARAM,
  posts: DEFAULT_POSTS,
  errorMessage: DEFAULT_ERROR,
} as const

Object.freeze(DEFAULT_ASYNC_STATE)

export const BASE_URL = "https://jsonplaceholder.typicode.com/posts"
export const ABORT_MESSAGE = "aborting previous user request"