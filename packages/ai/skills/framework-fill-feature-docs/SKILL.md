---
name: framework-fill-feature-docs
description: Use when a feature doc has missing, empty, or incomplete sections and the user wants gaps identified with questions, or wants them auto-filled. Trigger on prompts like "fill gaps", "what's missing", "complete the doc", or "auto-apply".
---

## ROLE

Gap analyst and doc filler. Read feature doc. Find missing spots. Either ask questions or auto-fill — depending on mode.

## MODES

| Trigger words | Mode |
|---|---|
| "what's missing", "gaps", "questions", "clarify" | **Question mode** — output questions only |
| "auto-apply", "auto-fill", "just fill", "guess and fill" | **Auto mode** — fill gaps directly, write file |

Default (no trigger): Question mode.

## FLOW

1. Locate doc:
   - Explicit path in prompt → use it.
   - No path → infer from context (open file, referenced doc, repo convention).
   - Still ambiguous → ask for path, then stop.
2. Read doc. Identify all missing spots (see MISSING SPOTS).
3. Branch on mode:
   - **Question mode** → output questions list, stop. Do not write file.
   - **Auto mode** → fill gaps with best inference, write file in original format.

## MISSING SPOTS

A spot is missing when any of these are true:

- Section exists but body is empty or contains only a placeholder (`TBD`, `N/A`, `?`, `{{…}}`).
- Required section is absent entirely (Refs, Dictionary, Constraints, DoD, at least one DoD area).
- `[term_name]` used in DoD/criteria but not defined in Dictionary.
- Defined `[term_name]` never referenced anywhere.
- Criterion is vague: contains "etc", "and so on", "various", or is non-verifiable.
- Constraint references an entity not in Dictionary.
- DoD is more than one sentence or describes tasks instead of user-visible value.
- Nesting exceeds 3 levels.

## QUESTION MODE OUTPUT

```
## Missing gaps — {{feature_name}}

### {{section_name}}
Q1. {{specific question about what is missing or ambiguous}}
Q2. {{specific question}}

### {{section_name}}
Q1. {{specific question}}
```

- Group questions by section.
- One question per missing fact. No compound questions.
- Reference exact location: section name, term, criterion number.
- No invented requirements in questions — ask, don't assume.

## AUTO MODE RULES

1. Fill only what is structurally missing or clearly inferrable from existing content.
2. Mark every auto-filled value with `<!-- auto -->` comment inline.
3. Do not invent new acceptance criteria — only complete existing incomplete ones.
4. Infer `[term_name]` definitions from how the term is used in context.
5. If a whole section has zero inferrable content, leave it minimal and add a single `<!-- auto: insufficient context -->` comment.
6. Preserve original format exactly: structure, nesting, section order, constraint syntax.
7. Write result back to source file. Do not create a new file.
8. After writing: output a short summary of every change made, grouped by section.

## RULES

1. Never invent requirements, actors, or behaviors not present in source.
2. Never change existing content — only fill what is absent or empty.
3. Preserve all Dictionary terms, Constraints, and DoD wording already present.
4. If doc uses `framework-format-feature-docs` template, output must pass its QUALITY CHECK.
5. On re-pass (doc updated by user), apply same flow from scratch.
