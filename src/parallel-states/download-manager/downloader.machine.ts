import { createMachine } from "xstate"

export const downloaderMachine = createMachine({
  id: "download-manager",

  type: "parallel",
  states: {
    pooler: {
      initial: "active",

      states: {
        active: {
          initial: "pooling",
          states: {
            pooling: {
              on: {
                USER_PAUSED: "paused",
                SATURATED: "stalled"
              }
            },
            stalled: {
              on: {
                BUFFER_DRAINED: "pooling",
                USER_PAUSED: "paused"
              }
            },
            paused: {
              on: {
                RESUME_POOLING: {
                  target: "pooling",
                  guard: "underPoolLimit OR memAvailable"
                }
              }
            }
          },
          on: { DOWNLOAD_STOPPED: "closed" }
        },
        closed: { type: "final" }
      }
    },

    "integrity-checker": {
      initial: "checking",
      states: {
        checking: {
          on: { "network.STREAM": { actions: { type: "VALIDATE_CHECKSUM" } } }
        }
      }
    },

    network: {
      initial: "opened",
      states: {
        opened: {
          initial: "active",
          states: {
            active: {
              initial: "flowing",
              states: {
                suspended: {
                  after: {
                    12000: { target: "errored", actions: "SOCKET_TIMEOUT" }
                  },
                  on: { RESUME_FLOW: "flowing" }
                },
                flowing: { on: { SUSPEND_FLOW: "suspended" } }
              },

              on: {
                NETWORK_DISCONNECTED: "errored"
              }
            },
            errored: {
              on: {
                RETRY: {
                  guard: "underMaxRetries AND socketAlive",
                  target: "active"
                }
              }
            }
          },
          on: { DOWNLOAD_STOPPED: "closed" }
        },
        closed: { type: "final" }
      }
    },

    playback: {
      initial: "active",
      states: {
        active: {
          initial: "downloading",
          states: {
            paused: { on: { RESUME: "downloading" } },
            downloading: { on: { PAUSE: "paused" } }
          },
          on: { DOWNLOAD_STOPPED: "stopped" }
        },
        stopped: { type: "final" }
      }
    }
  }
})
