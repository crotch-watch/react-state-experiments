import { useRef } from "react"
import { useForm } from "./Form.hook"

export const Todo = () => {
  const {
    state: { todos, liveEditIds },
    setters: { createTodo, editTodo, toggleEdit, deleteTodo, resetTodos },
  } = useForm()

  const createTodoRef = useRef<HTMLInputElement | null>(null)

  return (
    <section>
      <form
        onSubmit={(formEvent) => {
          formEvent.preventDefault()

          if (createTodoRef.current === null) return

          if (!createTodoRef.current.value) return

          createTodo({
            uid: Math.random(),
            text: createTodoRef.current.value,
          })

          createTodoRef.current.value = ""
          createTodoRef.current.blur()
        }}
      >
        <label htmlFor="enter-todo">
          <input
            type="text"
            id="enter-todo"
            ref={createTodoRef}
          />
          <button>create</button>
        </label>
      </form>

      <br />

      <ul>
        {todos.map((todo) => (
          <div key={todo.uid}>
            {liveEditIds.includes(todo.uid) ? (
              <form
                onSubmit={(formEvent) => {
                  formEvent.preventDefault()
                  toggleEdit(todo.uid)
                }}
              >
                <input
                  value={todo.text}
                  onChange={(changeEvent) =>
                    editTodo({ uid: todo.uid, text: changeEvent.target.value })
                  }
                />
                <button>save</button>
              </form>
            ) : (
              <>
                <li>{todo.text}</li>
                <button onClick={() => toggleEdit(todo.uid)}>edit</button>
              </>
            )}

            <button onClick={() => deleteTodo(todo.uid)}>delete</button>
          </div>
        ))}
      </ul>

      <br />

      <button
        onClick={() => {
          if (createTodoRef.current !== null) {
            createTodoRef.current.value = ""
          }
          resetTodos()
        }}
      >
        reset
      </button>
    </section>
  )
}
