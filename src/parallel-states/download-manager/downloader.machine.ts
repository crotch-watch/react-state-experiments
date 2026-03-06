import { createMachine } from "xstate"

export const downloaderMachine = createMachine({
  id: "download-manager",
  initial: "idle",
  states: {
    idle: { on: { START_DOWNLOAD: { target: "session" } } },
    session: {
      type: "parallel",
      onDone: { target: "idle" },
      states: {
        writer: {
          initial: "running",
          states: {
            running: {
              entry: "createFile",
              initial: "active",
              states: {
                active: {
                  entry: "openFile",
                  exit: "closeFile",
                  initial: "writing",
                  states: {
                    writing: {
                      on: {
                        SUSPEND_WRITING: {
                          target: "suspended",
                          guard: "lowDiskSpace OR bufferEmpty"
                        }
                      }
                    },
                    suspended: {
                      on: {
                        RESUME_WRITING: {
                          target: "writing",
                          guard: "diskSpaceAvailable AND bufferAvailable"
                        }
                      }
                    }
                  },
                  on: { DISK_ERROR: "errored" }
                },
                errored: {
                  on: { RETRY: { target: "active", guard: "canResumeWrite" } }
                }
              },
              on: { DOWNLOAD_STOPPED: "stopped" }
            },
            stopped: { type: "final" }
          }
        },

        pooler: {
          initial: "active",
          states: {
            active: {
              initial: "pooling",
              states: {
                pooling: {
                  on: {
                    SUSPEND_POOLING: "suspended",
                    POOL_SATURATED: "stalled"
                  }
                },
                stalled: {
                  on: {
                    BUFFER_DRAINED: "pooling",
                    SUSPEND_POOLING: "suspended"
                  }
                },
                suspended: {
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

        integrityChecker: {
          initial: "running",
          states: {
            running: {
              on: {
                DATA_RECEIVED: {
                  actions: "VALIDATE_CHECKSUM"
                },
                DOWNLOAD_STOPPED: "stopped"
              }
            },
            stopped: { type: "final" }
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
                paused: { on: { RESUME_PLAYBACK: "downloading" } },
                downloading: { on: { PAUSE_PLAYBACK: "paused" } }
              },
              on: { DOWNLOAD_STOPPED: "stopped" }
            },
            stopped: { type: "final" }
          }
        }
      }
    },
  }
})
