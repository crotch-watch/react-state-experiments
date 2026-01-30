import type { asyncEvents, AsyncMode } from "./Async.consts"

export type Param = string

export type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export type Exception = string

export type AsyncState = {
  mode: AsyncMode
  param: Param
  posts: Array<Post>
  errorMessage: Exception
}

export type AsyncActions =
  | {
      type: typeof asyncEvents.paramChanged
      payload: Param
    }
  | {
      type: typeof asyncEvents.errored
    }
  | {
      type: typeof asyncEvents.acknowledged
    }
