import { DEFAULT_FORM_STATE } from "./Todo.constants"
import type { FormActions, FormState } from "./Todo.types"

export const formReducer = (
  state: FormState,
  action: FormActions
): FormState => {
  const { type } = action
  const { todos } = state

  switch (type) {
    case "createTodo":
      return { ...state, todos: [...todos, action.payload] }

    case "editing":
      const editingTodoIndex = todos.findIndex(
        (todo) => todo.uid === action.payload.uid
      )

      if (editingTodoIndex === -1) return state

      let newTodos = [...todos]

      newTodos[editingTodoIndex].text = action.payload.text

      return {
        ...state,
        todos: newTodos,
      }

    case "deleteTodo":
      return {
        ...state,
        todos: todos.filter((todo) => todo.uid !== action.payload),
      }

    case "resetTodos":
      return DEFAULT_FORM_STATE

    default:
      return DEFAULT_FORM_STATE
  }
}
