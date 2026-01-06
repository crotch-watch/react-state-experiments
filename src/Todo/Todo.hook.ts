import { useReducer, useState } from "react"
import { formReducer } from "./Todo.reducer"
import { DEFAULT_FORM_STATE } from "./Todo.constants"
import type { Todo } from "./Todo.types"

export const useForm = () => {
  const [todos, dispatch] = useReducer(formReducer, DEFAULT_FORM_STATE)

  const createTodo = (todo: Todo) =>
    dispatch({ type: "createTodo", payload: todo })

  const editTodo = (todo: Todo) => dispatch({ type: "editing", payload: todo })

  // const toggleEdit = (todoId: Todo["uid"]) =>
  //   dispatch({ type: "toggleEdit", payload: todoId })

  const resetTodos = () => dispatch({ type: "resetTodos" })

  const deleteTodo = (todoId: Todo["uid"]) =>
    dispatch({ type: "deleteTodo", payload: todoId })

  return {
    todos,
    setters: { createTodo, editTodo, resetTodos, deleteTodo },
  }
}

export const useToggleEdit = () => {
  const [liveEditing, setLiveEditing] = useState<Array<Todo["uid"]>>([])

  const toggleEdit = (id: Todo["uid"]) => {
    liveEditing.includes(id)
      ? setLiveEditing((prevState) => prevState.filter((uid) => uid !== id))
      : setLiveEditing((prevState) => [...prevState, id])
  }

  const clearLiveEdits = () => setLiveEditing([])

  return { liveEditing, toggleEdit, clearLiveEdits }
}
