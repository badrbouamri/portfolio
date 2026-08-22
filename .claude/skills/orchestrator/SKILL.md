---

name: orchestrator
description: Break a complex milestone into dependency-aware workstreams, coordinate specialized subagents, use Impeccable for UX/design quality, and integrate the results into a coherent implementation. Use when a milestone has multiple independent or sequential parts.
user-invocable: true
--------------------

# /orchestrator

You are coordinating a complex product milestone by breaking it into workstreams and delegating to specialized subagents.

**Task:** $ARGUMENTS

## Your job

1. **Understand the milestone**

   * Read the relevant PRD requirements.
   * Inspect the existing codebase and current implementation.
   * Understand what M0/M1 already implemented.
   * Inspect `PRODUCT.md` and `DESIGN.md` if they exist.
   * Identify what the milestone adds, changes, or depends on.

2. **Analyse dependencies**

   * Identify which workstreams are independent and can run in parallel.
   * Identify which workstreams depend on another workstream's output.
   * Do NOT parallelize tasks when one requires decisions or artifacts from another.

3. **Create workstreams**
   Typical workstreams include:

   * UX / Design
   * Frontend
   * Backend
   * Data / Mock Data
   * State / Logic
   * Testing
   * Review

4. **Design before implementation**
   For user-facing features, create a UX / Design workstream before dependent frontend implementation.

   The Design workstream MUST use the installed **Impeccable** skill when appropriate.

   Prefer:

   * `shape` for UX/design planning
   * `audit` for quality/accessibility review
   * `critique` for visual and UX critique
   * `polish` for final refinement

5. **Delegate**

   * YOU DO NOT write code or edit files yourself.
   * Delegate implementation work to subagents using the Agent tool.
   * Use `subagent_type: "general-purpose"` unless a more specific type fits.
   * Launch all truly independent agents in a single message.
   * Run dependent workstreams sequentially.

6. **Provide complete context**
   Every subagent prompt must be self-contained.

   Include:

   * milestone
   * relevant PRD requirements
   * current implementation context
   * task
   * dependencies
   * expected output
   * acceptance criteria
   * relevant design decisions

7. **Preserve design consistency**
   The product must feel like one coherent application.

   Before creating new UI, inspect and reuse:

   * existing components
   * design tokens
   * typography
   * colors
   * spacing
   * navigation
   * tables
   * cards
   * forms
   * dialogs
   * status indicators

   Do not allow each milestone to invent a separate visual style.

8. **Avoid generic AI UI**
   Do not introduce unnecessary:

   * glassmorphism
   * gradients
   * excessive rounded cards
   * excessive shadows
   * decorative elements
   * meaningless animations
   * repetitive KPI cards
   * arbitrary colors
   * duplicated components

   Prefer:

   * strong hierarchy
   * readable information density
   * restrained color usage
   * clear typography
   * purposeful whitespace
   * consistent components
   * meaningful interaction feedback
   * responsive layouts

9. **Respect product hierarchy**
   The platform is primarily a school operating platform.

   Visual/product priority:

   1. Academic management
   2. Football academy
   3. Public field rental

   Football should support the school's identity rather than dominate it.

   Field rental should receive strong UX because it is a validated pain point, but the platform must not feel like a football booking application.

10. **Integrate**
    After all required workstreams complete:

    * inspect the results
    * identify conflicts
    * verify integration
    * verify design consistency
    * verify existing M0/M1 functionality
    * delegate additional fixes if necessary

11. **Run final design review**
    After implementation and functional validation:

    * use Impeccable `audit`
    * use Impeccable `critique`
    * delegate necessary fixes
    * use Impeccable `polish`

    Do not polish unrelated areas.

12. **Validate**
    Confirm:

    * milestone requirements
    * acceptance criteria
    * happy path
    * loading state
    * empty state
    * error state
    * responsive behavior
    * accessibility
    * regression against existing functionality

13. **Stop when the milestone is complete**
    Do not introduce additional features after the milestone acceptance criteria are satisfied.

    Avoid:

    * scope creep
    * unrelated refactoring
    * speculative features
    * production infrastructure work
    * unnecessary redesign

---

## Dependency model

Use this general structure when applicable:

```text
Design
   ↓
Implementation
   ↓
Integration
   ↓
Functional validation
   ↓
Impeccable audit
   ↓
Impeccable critique
   ↓
Polish
```

Independent work may run in parallel:

```text
                 Milestone
                     │
              ┌──────┴──────┐
              ▼             ▼
           Design          Data
              │             │
              └──────┬──────┘
                     ▼
                Frontend
                     │
                     ▼
                  Testing
                     │
                     ▼
              Design Review
```

The goal is **maximum parallelism without violating dependencies**.

---

## Design workstream

When a milestone contains UI/UX work, delegate a Design subagent.

The Design subagent should:

1. Inspect the current implementation.
2. Inspect M0/M1 patterns.
3. Inspect reusable components.
4. Read `PRODUCT.md` and `DESIGN.md` if available.
5. Read the relevant PRD section.
6. Use Impeccable's `shape` capability.
7. Define the user goal and information hierarchy.
8. Define primary and secondary actions.
9. Define important UI states.
10. Define responsive behavior.
11. Identify components that should be reused or created.

The output should be an implementation-ready design specification.

The Design subagent should NOT implement application code unless explicitly requested.

---

## Implementation workstream

Frontend implementation agents receive the approved design specification.

They MUST:

* reuse existing components
* preserve existing design tokens
* follow the approved UX
* maintain responsive behavior
* handle important UI states
* maintain accessibility
* avoid unrelated refactoring
* avoid unnecessary dependencies

If implementation conflicts with the design specification, report the conflict rather than silently inventing a different UX.

---

## Final review workstream

After implementation:

1. Run functional validation.
2. Run Impeccable `audit`.
3. Run Impeccable `critique`.
4. Fix important findings.
5. Run Impeccable `polish`.
6. Run final regression validation.

The milestone is complete only when:

```text
Requirements ✓
Implementation ✓
Integration ✓
Testing ✓
Design Audit ✓
Design Critique ✓
Polish ✓
Regression ✓
```

---

## Final response

Present a concise unified summary:

* What was implemented
* Workstreams completed
* Design changes
* Validation performed
* Important findings
* Known limitations
* Recommended next milestone

If a required workstream fails or is blocked, clearly report it instead of claiming the milestone is complete.
