---
name: framework-format-feature-docs
description: Reformat user-provided requirements (any format) into concise, readable markdown using the referenced template, without inventing new requirements.
---

## ROLE

Transform provided requirements into short, implementation-ready markdown. No invention.

## OUTPUT FORMAT

Follow template exactly:

```markdown
# {{feature_name}}

## Refs

1. [{{link_label}}]({{url_or_relative_doc_path}})
2. [{{link_label}}]({{url_or_relative_doc_path}})

## Dictionary

- **[term_one]** - {{short_definition}}
- **[term_two]** - {{short_definition}}

## Constraints

- [entity] context: `<type:value>`, `<type:value>`

## DoD

{{one clear sentence describing the completed user-visible value of this feature}}

### {{main_area_1}}

1. {{acceptance_criterion_referencing_[term_one]_if_applicable}}
   1a. {{sub_point}}
   1b. {{sub_point}} - {{detail}} - {{detail}}
2. {{acceptance_criterion}}
   2a. {{sub_point}}
   2b. {{sub_point}} - {{detail}}

### {{main_area_2}}

1. {{acceptance_criterion}}
2. {{acceptance_criterion}}
   2a. {{sub_point}}
```

Section order: feature name → Refs → Dictionary → Constraints → DoD.

## NESTING

3 levels max.

- **L1** — `1.`, `2.`, `3.`
- **L2** — `1a`, `1b`, `2a`, `2b`, … (inherits parent number)
- **L3** — `-` only

## DESTINATION

1. Infer path from prompt (explicit path, folder, repo convention, referenced file).
2. If missing/ambiguous — ask.
3. No drafting or file action until path is confirmed.

## SOURCE-OF-TRUTH

Only use requirements from user input (prompt, docs, referenced files).

1. No invented requirements, actors, permissions, behaviors.
2. No scope beyond provided material.
3. No placeholders (`TBD`, `N/A`, `NOT_SPECIFIED`).
4. Ambiguous input — ask before output.
5. Empty section — leave minimal; don't fabricate.

## RULES

1. Short, concrete, testable wording.
2. User-observable behavior over technical detail.
3. Transform only; never infer new requirements.
4. `## OUTPUT FORMAT` template is sole structure reference.
5. Consistent domain terms — no synonym alternation.
6. On re-pass, apply same rules to updated content.
7. Every field comes from user input.

## DICTIONARY

- Format: `**[term_name]** - explanation`, lowercase snake_case.
- Inline reuse: write as `[term_name]` in DoD and requirements.
- Every `[term_name]` used must be defined in `## Dictionary`.
- States/statuses/enums = dictionary entries, never inline strings. Use `[entity_state]` naming (e.g. `[game_waiting]`, `[game_finished]`).

## CONSTRAINTS

Format: `[entity] context: <type:value>, <type:value>`

- `[entity]` — dictionary term constraint applies to.
- `context` — short property/action label.
- `<type:value>` — free-form typed token.
- Multiple values = repeated tokens: `<filter:category>`, `<filter:name>` — not combined in one token.

No plain prose or backtick strings for constraints.

## DOD

One sentence. Completed user-visible value, not task list.

## QUALITY CHECK

- Feature name specific, not generic.
- DoD = one sentence, user-visible value.
- Every `[term_name]` defined in Dictionary.
- Every criterion verifiable.
- No inline backtick for status/state/enum.
- Nesting ≤ 3 levels; L3 = `-` only.
- Roles/permissions explicit where relevant.
- No critical section empty.
