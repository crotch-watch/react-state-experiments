import type { FormState } from "./Todo.types"

export const DEFAULT_FORM_STATE: FormState = {
  todos: [],
  liveEditIds: [],
} as const
