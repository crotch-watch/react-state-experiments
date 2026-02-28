# Streaming Media Player (Parallel States)

## The Concept

A streaming media player that handles playback, network streaming, and UI controls concurrently.

## The Flow

- User presses Start → playback begins and stream initializes.
- Playback can be Playing or Paused.
- Streaming can be Buffering, Buffered, or Errored.
- The UI can toggle between Fullscreen and Minimized.
- Volume and seek controls emit debounced updates that trigger side effects.
- A **NETWORK_DISCONNECTED** event affects both playback and stream regions.

## Goal

Use parallel states to model independent but concurrent concerns (player, stream, view), ensuring events are broadcast and handled appropriately across regions.
