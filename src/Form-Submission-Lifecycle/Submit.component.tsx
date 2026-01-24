import { useEffect, useReducer } from "react"
import { submitModeReducer } from "./Submit.reducer"
import { submitActions, submitModes } from "./Submit.consts"

const { SUBMITING, SUCCESS, INPUT } = submitModes
const { SUCCEEDED, ERRORED, PROCESSING } = submitActions

export const Submit = () => {
  const [state, dispatch] = useReducer(submitModeReducer, INPUT)

  useEffect(() => {
    if (state === INPUT) return
    if (state === SUBMITING) {
      setTimeout(() => {
        if (Math.random() > 0.5) dispatch(ERRORED)
        else dispatch(SUCCEEDED)
      }, 2500)
    }
  }, [state])

  const form = (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const formEl = e.target as HTMLFormElement
        formEl.reset()
      }}
    >
      <label htmlFor="input">
        <input
          type="text"
          id="input"
        />
      </label>
      <button
        type="submit"
        onClick={() => dispatch(PROCESSING)}
      >
        submit
      </button>
    </form>
  )

  const loader = <h1>loading...</h1>

  const result = <h1>successfully submitted</h1>

  switch (state) {
    case INPUT:
      return form

    case SUBMITING:
      return loader

    case SUCCESS:
      return result

    default:
      return form
  }
}
