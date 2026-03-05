import { createMachine } from "xstate"

export const downloaderMachine = createMachine({
  id: "download-manager",

  type: "parallel",
  states: {
    pooler: {
      initial: "pooling",

      states: {
        pooling: {
          on: {
            PAUSE: "paused",
            NETWORK_DISCONNECTED: "paused",
            SATURATED: "stalled"
          }
        },
        stalled: {
          on: {
            DRAINED: "pooling",
            "pooler.PAUSE": "paused"
          }
        },
        paused: {
          on: {
            "pooler.POOL": {
              target: "pooling",
              guard: "underPoolLimit OR memAvailable"
            }
          }
        }
      }
    },

    "integrity-checker": {
      initial: "checking",
      states: {
        checking: {
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
          initial: "streaming",
          states: {
            paused: {
              after: {
                12000: { target: "errored", actions: "SOCKET_TIMEOUT" }
              },
              on: {
                "network.STREAM": { target: "streaming" },
                DRAINED: "streaming"
              }
            },
            streaming: {
              on: { "network.PAUSE": { target: "paused" }, SATURATED: "paused" }
            }
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
          initial: "downloading",
          states: {
            paused: { on: { "playback.RESUME": "downloading" } },
            downloading: { on: { "playback.PAUSE": "paused" } }
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
