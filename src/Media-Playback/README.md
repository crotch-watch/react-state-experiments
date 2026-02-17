# Migration to XState

Moving away from manual reducers because they have reached a complexity ceiling.

1. Eliminating "Nested Switch Hell" Manual reducers devolved into deeply nested switch and if/else statements where logic was buried in indentation.

    **The Problem**: Following a transition through three levels of nested state made the code unreadable and prone to "bracket exhaustion."

    **The Solution**: XState uses a declarative configuration object where transitions are clear mappings: $State \xrightarrow{Event} NextState$.

2. Preserving State ***Hierarchy Flattening*** the reducer to avoid nesting caused the mental model of the system to vanish.

    **The Problem**: Hierarchy (e.g., Logged In $\rightarrow$ Editing Profile) became implicit. Reasoning about the system required holding the entire model in memory.

    **The Solution**: XState supports Hierarchical (Compound) States. Hierarchy remains explicit, and child states can inherit parent transitions (like RESET) without duplicating code.

3. Preventing "***Illegal Transition***" Bloat. In a manual reducer, every action is "visible" to every state unless manually blocked.

    **The Problem**: I had to write repetitive "early exit" guards (e.g., if (state !== 'Loading') return) for every case, focusing more on defending against bugs than describing logic.

    **The Solution**: As a formal State Machine, XState ignores undefined events by default. This makes the logic self-documenting and mathematically secure against impossible states.
