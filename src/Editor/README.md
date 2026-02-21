# Secure Document Editor (Setup/Cleanup)

***Concept***: An editor that opens a secure “Session” which must be wiped when closed.

***Flow***:
User selects a file; the system enters “Editing Mode.”

Inside, the user can be in Viewing, Modifying, or Saving.

When entering “Editing Mode,” a “Lock File” action must trigger.

When leaving “Editing Mode” (either by finishing or by a TIMEOUT event), an “Unlock File” action must trigger.

***Goal***: Use the parent container’s entry/exit points to handle the file locking, so you don’t have to manage it inside the specific edit/view logic.
