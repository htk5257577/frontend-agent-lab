# Definition of Ready

An issue may receive `ready-for-agent` only when every required item and every applicable conditional item below is satisfied.

The reporter may provide incomplete or unstructured input. The agent is responsible for identifying gaps, asking focused questions, and producing a complete draft. The agent must not turn guesses about behavior, data, scope, or user experience into requirements.

An item may be marked not applicable only when its category does not apply to the work.

## Required for every issue

- [ ] The problem or desired user outcome is stated.
- [ ] The scope of the change is explicit.
- [ ] Important out-of-scope behavior is explicit.
- [ ] Acceptance criteria are observable or testable.
- [ ] Relevant text, designs, prototypes, screenshots, API documentation, and other sources of truth are linked or attached when they exist.
- [ ] Conflicts between sources of truth are resolved.
- [ ] Dependencies and blocking relationships are identified.
- [ ] No unresolved question can materially change behavior, data, scope, or user experience.
- [ ] The expected verification method is stated.
- [ ] A human has explicitly approved the final requirements.

Silence, inactivity, or an agent's confidence is not human approval. Record approval in the issue or in the active conversation before applying `ready-for-agent`.

## UI and interaction work

When the issue changes a page, component, or user interaction:

- [ ] An approved design source is provided, or the issue explicitly authorizes following existing project patterns.
- [ ] The affected routes, pages, components, and interactions are identified.
- [ ] Responsive behavior is defined when applicable.
- [ ] Applicable loading, empty, error, disabled, and success states are defined.
- [ ] Keyboard and accessibility expectations are defined.
- [ ] Required copy and visual assets are provided, or the issue explicitly authorizes the agent to create them.

## API and data work

When the issue reads or writes remote or persistent data:

- [ ] Endpoints, methods, inputs, outputs, and relevant schemas are defined.
- [ ] Authentication, authorization, error, and boundary behavior are defined.
- [ ] A mock or fixture strategy is defined when the backend is unavailable.
- [ ] Success, failure, retry, and duplicate-submission behavior are defined for mutations.

## Bug fixes

When the issue reports incorrect behavior:

- [ ] Reproduction steps are provided or the failure can be reproduced reliably.
- [ ] Actual and expected behavior are distinguished.
- [ ] Relevant screenshots, logs, or error messages are attached when available.
- [ ] The failure can be expressed as a regression test or another repeatable check.
- [ ] The behavior that must remain protected after the fix is stated.

## Implementation tickets

When a specification is split into implementation tickets:

- [ ] Each ticket delivers a bounded, independently verifiable outcome.
- [ ] Each ticket links to its parent specification.
- [ ] Each ticket declares its acceptance criteria and blocking relationships.
- [ ] The final ticket breakdown has received explicit human approval.

## Readiness outcome

- If required information is missing, apply `needs-info` and ask only the questions needed to resolve the gaps.
- When new information arrives, return the issue to `needs-triage` and evaluate it again.
- If the work is fully specified but requires human implementation or judgment, apply `ready-for-human`.
- Apply `ready-for-agent` only when this checklist passes, human approval is recorded, and unattended implementation is appropriate.
- Use `wontfix` when the evaluated issue will not be actioned.
