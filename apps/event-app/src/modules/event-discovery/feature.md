# Event Discovery

## Refs

1. [Application Domains](../../../documentation/DOMAINS.md) — section 4 (Event Discovery)

## Dictionary

- **[event]** - Core aggregate: name, description, [category], start date & time (required), end date & time (optional), address (street, number, postal code, [city_field]), coordinates (lat/lng), external link (optional), image (optional), [keyword] list, [organizer_info]
- **[admin]** - A user with the Admin role
- **[authenticated_user]** - A user who has completed sign-in and holds an active session
- **[guest]** - An unauthenticated visitor with read-only access
- **[category]** - One of the fixed taxonomy values: Concert, Festival, Sports, Culture, Theatre, Food & Drink
- **[keyword]** - A free-text tag attached to an [event]
- **[organizer_info]** - Contact or identity details of the entity hosting the [event]; stored as part of the [event] aggregate
- **[city_field]** - Normalized city string stored on each [event]; used as the match target for the city filter
- **[event_detail_page]** - Full read view of a single [event] aggregate; navigated to from the discovery results list
- **[event_card]** - Condensed visual representation of an [event] shown in the discovery results list
- **[date_label]** - Preset time-range option (e.g., Today, This Weekend, This Month) resolved to a concrete date range by the Polish Holiday Calendar domain

## Constraints

- [event] detail view: `<role:guest>`, `<role:authenticated_user>`, `<role:admin>`
- [event] discovery: `<role:guest>`, `<role:authenticated_user>`, `<role:admin>`
- [event] start_date: `<required:true>`
- [event] end_date: `<required:false>`
- [event] image: `<required:false>`
- [event] location scope: `<geography:Poland>`

## DoD

Any user (including [guest]) can discover events through name, category, city, and date filters and navigate to a full [event_detail_page].

### Event Detail Page

1. The [event_detail_page] displays all [event] aggregate fields: name, description, [category], start date & time, end date & time (when set), address, external link (when set), image (when set), [keyword] list, [organizer_info] and attendee count.
2. The [event_detail_page] is reachable by clicking an [event_card] in the discovery results list.
3. The [event_detail_page] is accessible to all users including [guest].

### Event Discovery — Search

1. The search interface exposes four filter fields: name (free text), [category] (dropdown), city (dropdown), date (dropdown of [date_label] values).
2. The name filter performs a free-text match against the [event] name field.
3. The [category] dropdown lists all valid categories; selecting one limits results to that [category].
4. The city dropdown options are "Cała Polska" (no city filter) and individual cities; filtering matches against the stored [city_field] on each [event].
5. The date dropdown lists preset [date_label] values (Today, This Weekend, This Week, This Month, and dynamic Polish holiday labels); each label resolves to a concrete date range via the Polish Holiday Calendar domain.
6. All four filters can be combined; returned results satisfy every active filter simultaneously.

### Event Discovery — Results

1. Matching events are presented as a scrollable list of [event_card] items.
2. Each [event_card] displays at minimum: event name, [category], start date & time, and [city_field].
3. Clicking an [event_card] navigates to the corresponding [event_detail_page].
4. When no events match the active filters, a visible empty-state message is shown to the user. <!-- auto -->
5. Results are accessible to all users including [guest].
