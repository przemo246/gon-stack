---
version: 1.0
updated: 19.04.2026
---

# Application Domains

This document defines the core domains in the Event Search App application.

---

## 1. Identity & Access

**Responsibility:** User authentication, authorization, session management, and role-based access control.

**Key Concepts:**

- Google OAuth integration
- Facebook OAuth integration
- Email/password authentication
- Login/logout flows
- Session management and token refresh
- Role model: Guest, Authenticated User, Admin
- Access control per feature (browse vs. attend vs. manage)

**Out of Scope:**

- User profile data (handled by User Profile domain)

---

## 2. User Profile

**Responsibility:** User profile data, preferences, and attendance privacy settings.

**Key Concepts:**

- Display name and avatar
- Global attendance visibility toggle (public / private)
- Per-event attendance visibility override
- Profile completeness
- Friend list reference (owned by Social domain)

**Out of Scope:**

- Authentication flows (handled by Identity & Access domain)
- Friend relationship management (handled by Social domain)

---

## 3. Event Catalog

**Responsibility:** Authoritative source of event data — creation, editing, deletion, and enrichment.

**Key Concepts:**

- Event aggregate: name, description, category, date & time, address, coordinates, external link, optional image, keywords
- Category taxonomy: Concert, Festival, Sports, Culture, Theatre, Food & Drink
- Keyword tagging (manual + AI-assisted suggestions via LLM)
- Admin-only event management (CRUD) for MVP; user-created events are a future iteration
- Organizer info

**Out of Scope:**

- Event discovery and filtering (handled by Event Discovery domain)
- Attendance tracking (handled by Attendance domain)

---

## 4. Event Discovery

**Responsibility:** Spatial and textual event search, filtering, and presentation to the user.

**Key Concepts:**

- Geolocation: request on first load, Warsaw fallback on denial/failure
- Poland-only scope (MVP)
- Interactive map view with event pins
- Scrollable list view alongside the map
- Free-text search by event name, venue, city, or keywords
- Filter panel: category, date range, distance radius from user location
- Friends-attending map overlay (authenticated users only)

**Out of Scope:**

- Event data management (handled by Event Catalog domain)
- Quick date label logic (handled by Polish Holiday Calendar domain)

---

## 5. Polish Holiday Calendar

**Responsibility:** Computing and exposing quick date labels, including dynamic Polish bank holiday clusters.

**Key Concepts:**

- Static labels: Today, Tomorrow, This Weekend, Next Weekend
- Dynamic labels: auto-generated from the Polish public holiday calendar
- Holiday cluster detection (e.g., Majówka = May 1–3, Boże Ciało, Święto Niepodległości)
- Visibility rule: dynamic labels shown only when a holiday is within the next 60 days
- Each label resolves to a concrete date range used as a filter input

**Out of Scope:**

- Applying the date range to event results (handled by Event Discovery domain)

---

## 6. Attendance

**Responsibility:** Tracking which authenticated users are attending which events, and exposing aggregate counts.

**Key Concepts:**

- Attend / un-attend an event
- Attendance record stored to user profile
- Public attendee count (integer, visible to all users)
- Friends-attending list (names/avatars, visible to authenticated users only)
- Per-event privacy override (public / private attendance)

**Out of Scope:**

- Friend relationship resolution (handled by Social domain)
- Calendar view of attended events (handled by Personal Calendar domain)

---

## 7. Social

**Responsibility:** Friend relationship management and friend-to-event invitation flow.

**Key Concepts:**

- Friend discovery by username or email
- Friend request lifecycle: send → accept / decline
- Bidirectional friendship model
- Friend network (used by Attendance and Personal Calendar domains)
- Event invite: authenticated user selects friends and sends invite
- Invite triggers an in-app notification (dispatched to Notification domain)

**Out of Scope:**

- Notification delivery (handled by Notification domain)
- Attendance state of friends (handled by Attendance domain)

---

## 8. Personal Calendar

**Responsibility:** Calendar views aggregating the user's own events and friends' public events.

**Key Concepts:**

- My Attended Events calendar — events the user has marked as attending
- Friends' Public Events calendar — events friends (with public attendance) are attending
- Export to device calendar (iCal/Google Calendar) — available to all users, no auth required
- Shared calendar view (authenticated users only)

**Out of Scope:**

- Attendance state resolution (handled by Attendance domain)
- Friend network resolution (handled by Social domain)

---

## 9. Notification

**Responsibility:** In-app notification delivery and feed management.

**Key Concepts:**

- Notification types (MVP): event invite from a friend
- Notification bell / feed UI
- Mark as read
- No push or email notifications for MVP (future iteration)

**Out of Scope:**

- Invite trigger logic (handled by Social domain)

---

## Domain Interactions

```
Identity & Access → User Profile (creates profile after first authentication)
Identity & Access → Event Discovery (determines available features: guest vs. auth)
Identity & Access → Event Catalog (Admin role gates CRUD operations)

User Profile → Attendance (privacy settings applied to attendance visibility)
User Profile → Social (display name/avatar used in friend and invite flows)

Event Catalog → Event Discovery (provides event data for search and map)

Polish Holiday Calendar → Event Discovery (resolves quick date labels to date range filters)

Event Discovery → Attendance (map overlay: friends-attending filter)
Event Discovery → Event Catalog (reads event aggregates for detail page)

Attendance → Personal Calendar (attended events populate calendar view)
Attendance → Social (friends' public attendance exposed to their network)

Social → Notification (friend invite dispatches in-app notification)
Social → Personal Calendar (friends' public events visible in shared calendar)

Notification → Social (notification links back to the originating event invite)
```

---
