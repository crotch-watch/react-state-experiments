export type Todo = {
  text: string
  uid: number
}

export type FormState = {
  todos: Array<Todo>
  // liveEditIds: Array<Todo["uid"]>
}

const formTriggers = {
  createTodo: "createTodo",
  // toggleEdit: "toggleEdit",
  editing: "editing",
  deleteTodo: "deleteTodo",
  resetTodo: "resetTodos",
} as const

type FormTriggers = typeof formTriggers

export type FormActions =
  | {
      type: FormTriggers["createTodo"]
      payload: Todo
    }
  // | {
  //     type: FormTriggers["toggleEdit"]
  //     payload: Todo["uid"]
  //   }
  | {
      type: FormTriggers["editing"]
      payload: { uid: Todo["uid"]; text: Todo["text"] }
    }
  | {
      type: FormTriggers["deleteTodo"]
      payload: Todo["uid"]
    }
  | {
      type: FormTriggers["resetTodo"]
    }
