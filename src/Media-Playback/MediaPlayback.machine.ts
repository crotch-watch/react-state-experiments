import { setup } from "xstate"

const mediaSetup = setup({
  types: {
    events: {} as
      | { type: "media.PAUSE" }
      | { type: "media.PLAY" }
      | { type: "active.playback.BUFFERED" }
      | { type: "active.playback.BUFFERING" }
      | { type: "media.active.NETWORK_LOST" },
  },
})

export const mediaMachine = mediaSetup.createMachine({
  id: "media",
  initial: "idle",
  states: {
    idle: {
      on: { "media.PLAY": { target: "active" } },
    },
    active: {
      initial: "playback",
      states: {
        playback: {
          initial: "loading",
          states: {
            loading: {
              on: { "active.playback.BUFFERED": "playing" },
            },
            playing: {
              on: { "active.playback.BUFFERING": "loading" },
            },
          },
          on: { "media.active.NETWORK_LOST": "disconnected" },
        },
        disconnected: {},
      },
      on: { "media.PAUSE": { target: "idle" } },
    },
  },
})
