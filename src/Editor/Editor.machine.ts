import { createMachine } from "xstate"

/**
 * @see https://stately.ai/registry/editor/de98b1b8-a949-4452-b956-042071465cff?mode=Design&machineId=e96c7758-2689-4404-9ae4-11f42ac8d0a3
 */
export const editorMachine = createMachine({
  id: "session",
  initial: "editor",
  states: {
    editor: {
      entry: { type: "LOCK_FILE" },
      exit: { type: "UNLOCK_FILE" },

      on: { CLOSE: "closed" },

      initial: "viewing",
      states: {
        viewing: { on: { "editor.TYPE": "modifying" } },
        modifying: {
          on: {
            "editor.BLUR": "viewing",
            "editor.SAVE": "saving",
          },
        },
        saving: { on: { "editor.SAVED": "modifying" } },
      },
    },

    closed: { type: "final" },
  },
})
