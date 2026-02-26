import { createMachine } from "xstate"

export const mediaPlayerMachine = createMachine({
  id: "media-player",
  type: "parallel",
  states: {
    playback: {
      initial: "idle",
      states: {
        idle: { on: { "playback.START": "active" } },
        active: {
          initial: "playing",
          states: {
            playing: { on: { "active.PAUSE": "paused" } },
            paused: { on: { "active.PLAY": "playing" } },
          },
          on: { "playback.STOP": "idle" },
        },
      },
    },
    buffer: {
      initial: "buffering",
      states: {
        buffering: { on: { COMPLETED: "buffered" } },
        buffered: { on: { CONSUMED: "buffering" } },
      },
    },
    view: {
      initial: "fullscreen",
      states: {
        fullscreen: {
          on: { "view.MINIMIZE": "minimized" },
          type: "parallel",
          states: {
            slider: {
              on: {
                "slider.MOVE": {
                  target: "slider",
                  actions: () => console.log("SELF_TRANSITION"),
                },
              },
            },
            seeker: {},
          },
        },
        minimized: { on: { "view.MAXIMIZE": "fullscreen" } },
      },
    },
  },
})
