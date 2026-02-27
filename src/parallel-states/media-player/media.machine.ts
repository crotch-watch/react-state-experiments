import { createMachine } from "xstate"

export const mediaPlayerMachine = createMachine({
  id: "media-player",
  type: "parallel",
  states: {
    player: {
      initial: "idle",
      states: {
        idle: { on: { "player.START": "playback" } },

        playback: {
          on: { NETWORK_DISCONNECTED: "idle" },

          initial: "playing",
          states: {
            playing: { on: { "playback.PAUSE": "paused" } },
            paused: { on: { "playback.PLAY": "playing" } },
          },
        },
      },
    },
    stream: {
      initial: "data",
      states: {
        data: {
          entry: [{ type: "setup-stream" }],
          exit: [{ type: "destroy-stream" }],

          initial: "buffering",
          states: {
            buffering: { on: { "data.STREAMED": "buffered" } },
            buffered: { on: { "data.REQUIRED": "buffering" } },
          },

          on: { NETWORK_DISCONNECTED: "errored" },
        },
        errored: { on: { "player.START": "data" } },
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
                "slider.STEP_CHANGE": {
                  actions: { type: "change-volume" },
                  guard: { type: "volumeHasChanged" },
                  description: "DEBOUNCED",
                },
              },
            },
            seeker: {
              on: {
                "seeker.STEP_CHANGE": {
                  actions: { type: "change-playback_position" },
                  guard: { type: "playbackPositionHasChanged",},
                  description: "DEBOUNCED",
                },
              },
            },
          },
        },
        minimized: { on: { "view.MAXIMIZE": "fullscreen" } },
      },
    },
  },
})
