import { createMachine } from "xstate"

export const downloaderMachine = createMachine({
  id: "download-manager",

  type: "parallel",
  states: {
    pooler: {
      initial: "paused",

      states: {
        pooling: {
          on: {
            PAUSE: "paused",
            NETWORK_DISCONNECTED: "paused"
          }
        },
        paused: {
          on: {
            "network.STREAM": {
              target: "pooling",
              guard: "underPoolLimit OR memAvailable"
            }
          }
        }
      }
    },

    "integrity-checker": {
      initial: "checker",
      states: {
        checker: {
          on: {
            "network.STREAM": { actions: { type: "VALIDATE_CHECKSUM" } }
          }
        }
      }
    },

    network: {
      initial: "active",
      states: {
        active: {
          initial: "waiting",
          states: {
            waiting: {
              after: {
                12000: { target: "errored", actions: "SOCKET_TIMEOUT" }
              },
              on: {
                "network.STREAM": { target: "streaming" }
              }
            },
            streaming: { on: { "network.PAUSE": { target: "waiting" } } }
          },

          on: { NETWORK_DISCONNECTED: "errored" }
        },
        errored: {
          on: {
            RETRY: {
              guard: "underMaxRetries AND socketAlive",
              target: "active"
            }
          }
        }
      }
    },

    playback: {
      initial: "active",
      states: {
        active: {
          initial: "paused",
          states: {
            paused: { on: { "playback.RESUME": "resumed" } },
            resumed: { on: { "playback.PAUSE": "paused" } }
          },
          on: { NETWORK_DISCONNECTED: "errored" }
        },
        errored: {
          on: {
            RETRY: {
              target: "active",
              guard: "underMaxRetries AND socketAlive"
            }
          }
        }
      }
    }
  }
})
