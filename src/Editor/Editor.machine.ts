import { setup } from "xstate"

export const editorMachine = setup({
  types: {
    events: {} as
      | { type: "editor.open" }
      | { type: "editor.close" }
      | { type: "opened.focus" }
      | { type: "opened.blur" }
      | { type: "opened.save" }
      | { type: "opened.saved" },
  },
}).createMachine({
  id: "editor",
  initial: "closed",
  states: {
    closed: { on: { "editor.open": { target: "opened" } } },
    opened: {
      on: { "editor.close": { target: "closed" } },
      initial: "viewing",
      states: {
        viewing: { on: { "opened.focus": { target: "editing" } } },
        editing: {
          on: {
            "opened.save": { target: "saving" },
            "opened.blur": { target: "viewing" },
          },
        },
        saving: { on: { "opened.saved": { target: "editing" } } },
      },
    },
  },
})
