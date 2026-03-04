# Download Manager

## The Concept

A download manager that handles file transfers with concerns for **Reliability, Integrity, Flow Control, and User Interaction**.
The system must manage chunked data, buffering, writing to disk, validation, and user controls — all as separate but coordinated processes.

## The Flow

1. The system establishes a connection to a server and begins receiving data in chunks.
2. Incoming chunks are validated for integrity.
3. Valid chunks are buffered in memory.
4. Buffered data is written to disk.
5. The system applies backpressure if the buffer reaches capacity.
6. The user can control the download using **Pause, Resume, or Stop**.
7. The download completes only after:
   - All chunks are received
   - All data is written successfully
   - Final integrity verification passes

## Failure Scenarios to Handle

- Network disconnect or timeout
- Corrupted chunk detection
- Excessive integrity failures
- Disk write errors (e.g., no space)
- Buffer overflow conditions

## Goal

Design a robust **state machine with parallel regions** to handle:

- **File Transfer** (connection, receiving, retry logic)
- **Buffering / Writing** (queueing, draining, backpressure)
- **Integrity Check** (chunk validation, failure thresholds)
- **Control Layer** (pause, resume, stop, completion)
- **Progress UI** (status updates independent of core logic)

Each concern should be modeled as an **orthogonal region**, ensuring separation of responsibilities while maintaining coordinated behavior.
