import type { asyncEvents, asyncStates } from "./Async.consts"

export type Param = string

export type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export type Posts = Array<Post>

export type Exception = string

export type AsyncState =
  | {
      mode: typeof asyncStates.input
      param: Param
      posts: Posts
    }
  | {
      mode: typeof asyncStates.error
      param: Param
      errorMessage: Exception
    }

export type AsyncActions =
  | {
      type: typeof asyncEvents.paramChanged
      payload: Param
    }
  | {
      type: typeof asyncEvents.errored
      payload: Exception
    }
  | {
      type: typeof asyncEvents.acknowledged
    }
  | {
      type: typeof asyncEvents.processed
      payload: Posts
    }
