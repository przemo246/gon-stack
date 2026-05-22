# Event Module

## Refs

1. [Application Domains](../../../documentation/DOMAINS.md) — sections 3 (Event Catalog) and 4 (Event Discovery)

## Dictionary

- **[event]** - Aggregate with: name, description, [category], date & time, address, coordinates, optional external link, optional image, [keyword] list, and [organizer] info
- **[category]** - One of the fixed taxonomy values: Concert, Festival, Sports, Culture, Theatre, Food & Drink
- **[keyword]** - Free-text tag attached to an [event]; entered manually by [admin] or AI-suggested via LLM
- **[organizer]** - Entity info attached to an [event] (name, contact); stored as part of the [event] aggregate
- **[guest]** - Unauthenticated visitor with read-only access to [event] data
- **[authenticated_user]** - Logged-in user; can see [friends_overlay] in addition to [guest] capabilities
- **[admin]** - Role with full CRUD access over [event] records
- **[geolocation]** - Browser-provided coordinates used to center the map and compute proximity
- **[map_view]** - Interactive map rendering [event] pins at their geographic coordinates
- **[list_view]** - Scrollable list of [event] items displayed alongside the [map_view]
- **[search_query]** - Free-text input matched against [event] name, venue, city, or [keyword]
- **[filter]** - Criteria narrowing [event] results: [category] multi-select, date range, distance radius
- **[quick_date_label]** - Preset shortcut (Today, Tomorrow, This Weekend, Next Weekend, or a dynamic Polish holiday label) that resolves to a date range and populates the date range [filter]
- **[friends_overlay]** - Map layer visible to [authenticated_user] showing pins where friends are attending

## Constraints

- Poland-only scope (MVP): `<scope:Poland-only>`
- [admin] CRUD gating: `<role:admin>`
- [friends_overlay] gating: `<role:authenticated_user>`
- [geolocation] denial / failure fallback: `<location:Warsaw>`
- AI [keyword] suggestions require external LLM: `<dependency:LLM>`
- User-created events deferred: `<scope:future-iteration>`

## DoD

An [admin] can manage the full [event] catalog and any user ([guest] or [authenticated_user]) can discover events via [map_view], [list_view], and [search_query] with [filter] support.

### Event Catalog — Data Model

1. An [event] aggregate stores: name, [category], date & time, address, coordinates, [organizer] info, and optionally: description, external link, image, [keyword] list.
   1a. [category] must be exactly one of: Concert, Festival, Sports, Culture, Theatre, Food & Drink.
   1b. [keyword] entries may be added manually or selected from LLM-generated suggestions; [admin] confirms AI suggestions before they are saved.
2. An [event] is uniquely identified by a system-generated ID. <!-- auto -->

### Event Catalog — Admin Management

1. An [admin] can create a new [event] by supplying all required fields.
   1a. Required: name, [category], date & time, address, coordinates.
   1b. Optional: description, external link, image, [keyword] list, [organizer] info.
2. An [admin] can edit any field of an existing [event].
3. An [admin] can delete an [event]; deleted [event]s are no longer returned by discovery queries.
4. A [guest] or [authenticated_user] has no create, edit, or delete access to [event] records.

### Event Discovery — Geolocation

1. On first load the app requests [geolocation] from the browser.
   1a. If permission is granted, the [map_view] centers on the user's coordinates.
   1b. If permission is denied or [geolocation] fails, the [map_view] centers on Warsaw.
2. [geolocation] coordinates are used as the origin for the distance radius [filter].

### Event Discovery — Map & List Views

1. The [map_view] renders one interactive pin per [event] at its stored coordinates.
   1a. Selecting a pin opens the [event] detail view.
2. The [list_view] is shown alongside the [map_view] and reflects the same filtered result set.
3. The [friends_overlay] is rendered on the [map_view] only for [authenticated_user]s and shows pins at [event]s where friends are attending.

### Event Discovery — Search & Filters

1. A [search_query] is matched against [event] name, venue, city, and [keyword] list.
2. The [filter] panel exposes: [category] multi-select, date range picker, distance radius.
   2a. Multiple active [filter] values combine with AND logic. <!-- auto -->
3. Each [quick_date_label] resolves to a concrete date range that is applied as the date range [filter].
   3a. Dynamic Polish holiday labels are shown only when the qualifying holiday falls within the next 60 days.
4. Changing or clearing any [filter] or [search_query] refreshes both the [map_view] and the [list_view] simultaneously.
