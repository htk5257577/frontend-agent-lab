# Triage labels

These labels describe whether an issue is ready to be acted on.

| Canonical role    | GitHub label      | Meaning                                                                     |
| ----------------- | ----------------- | --------------------------------------------------------------------------- |
| `needs-triage`    | `needs-triage`    | The issue has not yet been evaluated                                        |
| `needs-info`      | `needs-info`      | The issue was evaluated but requires specific information from the reporter |
| `ready-for-agent` | `ready-for-agent` | Fully specified, human-approved, and safe for an unattended agent           |
| `ready-for-human` | `ready-for-human` | Requires human implementation or judgment                                   |
| `wontfix`         | `wontfix`         | Will not be actioned                                                        |

## Rules

- Use at most one canonical triage label on an issue at a time.
- New or changed issues begin with `needs-triage`.
- Use `needs-info` only after identifying the specific missing information.
- When the missing information is supplied, move the issue back to `needs-triage`.
- Apply `ready-for-agent` only after requirements, acceptance criteria, dependencies, and material ambiguities have been resolved and reviewed by a human.
- Execution states such as in progress, review, CI failure, or blocked are separate from these triage labels.
