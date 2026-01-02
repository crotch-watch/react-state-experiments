# React *State Modeling* Experiments

This repository contains small, focused React experiments exploring explicit state modeling using reducers, finite state machines (FSMs), and strict separation of state, events, and side effects.

## Objective

The goal is to understand when state machines are useful, how to model them correctly, and when not to use them.

## Completed Experiments

Timer / Stopwatch ✅

- Explicit FSM with initial, ticking, and paused states
- Event-driven transitions (start, tick, pause, resume, reset)
- Reducer as a pure transition table
- Side effects isolated in hooks (setInterval, clearInterval)
- State diagram → reducer → hook mapping

## Philosophy

- State machines are used only when they add clarity
- Data flow is kept separate from state flow
- Reducers remain pure; effects are isolated
- Simplicity is preferred over abstraction

## Planned Experiments (in progress ⚠️)

1. Form submission lifecycle (async states only)
2. Async data loading with cancellation
3. Multi-actor coordination (FSM + actors)
4. Undo / redo workflows

## Tech Stack

- React
  - TypeScript
  - Reducers (useReducer)
  - Hooks for effect orchestration

