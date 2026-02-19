import { useMachine } from "@xstate/react"
import { mediaMachine } from "./MediaPlayback.machine"

const btnStyle = {
  width: "20rem",
  padding: "1rem",
  fontSize: "1.5rem",
}

const largeBtnStyle = {
  ...btnStyle,
  margin: "5rem 15rem",
  width: "fit-content",
  fontSize: "2rem",
}

const stringify = (value: unknown) => JSON.stringify(value)

export const MediaPlayback = () => {
  const [state, send] = useMachine(mediaMachine)

  const events = state.machine.events.map((e) => e)

  const event_buttons = events.map((event, index) => (
    <button
      style={btnStyle}
      key={index}
      onClick={() => {
        if (!state.can({ type: event })) {
          console.warn(
            "INVALID event: ",
            event,
            " on state: ",
            stringify(state.value),
          )
          return
        }

        send({ type: event })
      }}
    >
      {event.split(".").pop()}
    </button>
  ))

  const valid_event_buttons = events.map((event, index) =>
    state.can({ type: event }) ? (
      <button
        style={btnStyle}
        key={index}
        onClick={() => {
          send({ type: event })
        }}
      >
        {event.split(".").pop()}
      </button>
    ) : null,
  )

  return (
    <>
      <h1>Events: {state.machine.id} machine</h1>
      {event_buttons}

      <h1>Valid Events: {stringify(state.value)} state</h1>
      {valid_event_buttons}

      <br />

      <button
        disabled
        style={largeBtnStyle}
      >
        <strong>
          <em>STATE: </em>
        </strong>
        {stringify(state.value)}
      </button>
    </>
  )
}
