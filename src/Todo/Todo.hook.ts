import { useReducer } from "react"
import { formReducer } from "./Todo.reducer"
import { DEFAULT_FORM_STATE } from "./Todo.constants"
import type { Todo } from "./Todo.types"

export const useForm = () => {
  const [state, dispatch] = useReducer(formReducer, DEFAULT_FORM_STATE)

  const createTodo = (todo: Todo) =>
    dispatch({ type: "createTodo", payload: todo })

  const editTodo = (todo: Todo) => dispatch({ type: "editing", payload: todo })

  const toggleEdit = (todoId: Todo["uid"]) =>
    dispatch({ type: "toggleEdit", payload: todoId })

  const resetTodos = () => dispatch({ type: "resetTodos" })

  const deleteTodo = (todoId: Todo["uid"]) =>
    dispatch({ type: "deleteTodo", payload: todoId })

  return {
    state,
    setters: { createTodo, editTodo, toggleEdit, resetTodos, deleteTodo },
  }
}
