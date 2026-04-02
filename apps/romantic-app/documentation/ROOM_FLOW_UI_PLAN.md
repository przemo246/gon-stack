# Room Flow UI Plan

## Goal

Define a focused UI flow for one domain only:

- Create a room
- Join a room
- Wait for the second participant

This document stays high-level and avoids implementation details.

## Scope

In scope:

- Entry decision between Create and Join
- Create Room flow
- Join Room flow
- Waiting Room state and feedback
- Core status and error messages
- UI building blocks for each step

Out of scope:

- Gameplay/question system
- Profile setup
- Authentication strategy
- Backend protocol details
- Reconnection edge cases beyond basic user feedback

## Primary User Flow

1. User opens the room screen.
2. User selects one action: Create Room or Join Room.
3. If user creates a room, app returns a room code and shows waiting state.
4. If user joins a room, app validates code and confirms join success.
5. When two participants are present, app moves both to the next domain step.

## Screen-Level Flow

### 1) Room Action Screen

Purpose: Let user choose one clear path.

Main UI:

- Screen title: `Room Action`
- Short helper text: explain what Create and Join do
- Two primary action cards/buttons:
  - `Create Room`
  - `Join Room`

Guideline alignment:

- Use semantic buttons for actions
- Keep labels explicit and concise
- Ensure visible focus styles and keyboard support

### 2) Create Room Screen

Purpose: Create a new room and prepare shareable join details.

Main UI:

- Screen title: `Create Room`
- Primary button: `Create Room`
- Result state block after success:
  - Room code (large, readable, easy to copy)
  - Optional copy action
  - Waiting status text

Status messages:

- Loading: `Creating Room…`
- Success: `Room Created. Share the Code to Invite Your Partner.`
- Error: `Could Not Create Room. Try Again.`

### 3) Join Room Screen

Purpose: Join an existing room using room code.

Main UI:

- Screen title: `Join Room`
- Room code input
- Primary button: `Join Room`
- Inline validation/error zone

Status messages:

- Loading: `Joining Room…`
- Success: `Joined Room. Waiting for Room Sync…`
- Invalid code: `Room Code Is Invalid. Check the Code and Try Again.`
- Not found/full: `Room Is Not Available. Create a New Room or Use Another Code.`

### 4) Waiting Room Screen

Purpose: Keep user informed while waiting for second participant.

Main UI:

- Screen title: `Waiting for Partner`
- Prominent waiting indicator (text + subtle motion)
- Room code summary (for invite context)
- Presence summary:
  - `1 of 2 Participants Connected`
- Passive guidance text:
  - `Share the Room Code. This Screen Updates Automatically.`

Status messages:

- Default: `Waiting for Partner…`
- Partner joined: `Partner Joined. Preparing Next Step…`
- Temporary disconnect: `Connection Lost. Reconnecting…`

## State Model (UI-Level)

Each screen should expose predictable UI states:

- `idle`: before submission
- `loading`: request in progress
- `success`: server confirmed action
- `error`: request failed with actionable message

Waiting screen adds:

- `waiting_for_partner`
- `partner_joined`
- `connection_retry`

## Building Blocks

Use a small, reusable set of UI primitives. Prefer existing components from `apps/romantic-app/src/libs/ui` first:

- `PageShell`: compose with `Card` + layout container
- `ActionCard`: use `Card` with a clickable `Button` action
- `FormField`: use `Label` + `Input`
- `PrimaryButton`: use `Button` (`variant="primary"`)
- `StatusBanner`: use `Alert` (`success` / `error` / `secondary`)
- `RoomCodeDisplay`: use `Card` + typography classes
- `PresenceIndicator`: use `Alert` or compact `Card` row
- `WaitingIndicator`: use `Spinner` or `ProgressIndicator`

## Existing UI Components to Reuse

### Core Components

- `Button` (`button.tsx`): primary/secondary actions, loading-disabled state
- `Card` (`card.tsx`): action tiles, room code container, waiting container
- `Input` (`input.tsx`): room code entry
- `Label` (`label.tsx`): accessible field label for room code
- `Alert` (`alert.tsx`): inline status and error feedback
- `Heading` (`heading.tsx`): semantic titles per screen
- `Spinner` (`spinner.tsx`): waiting and request progress
- `ProgressIndicator` (`progress-indicator.tsx`): optional visual waiting progress
- `EmptyState` (`empty-state.tsx`): optional fallback if room data is missing

### High-Level Mapping by Screen

- **Room Action Screen**: `Heading` + two `Card` blocks + `Button`
- **Create Room Screen**: `Heading` + `Button` + result `Card` + `Alert`
- **Join Room Screen**: `Heading` + `Label` + `Input` + `Button` + `Alert`
- **Waiting Room Screen**: `Heading` + `Spinner`/`ProgressIndicator` + `Card` + `Alert`

## Typography and Fonts (From `src/libs/ui/index.css`)

Use the exact font tokens already defined:

- `--font-heading: 'Chakra Petch', system-ui, sans-serif;`
- `--font-sans: 'Sora', system-ui, sans-serif;`

Recommended usage in this flow:

- Screen titles (`Room Action`, `Create Room`, `Join Room`, `Waiting for Partner`):
  - use `Heading` component (maps to `.t*` classes with `font-heading`)
- Body/help/status text:
  - use `.b1` / `.b2` classes (`font-sans`)
- Labels and short metadata (for example "Room Code"):
  - use `.l1` / `.l2` classes (`font-sans`, uppercase utility style)

## Content and Copy Guidelines

Use copy that is clear, actionable, and consistent:

- Prefer specific verbs: `Create Room`, `Join Room`, `Try Again`
- Keep messages short and directive
- Use active voice and second person
- Use `…` for loading states
- Show a next step in error text, not only the problem

## Accessibility and Interaction Requirements (High-Level)

Apply these rules across all room screens:

- Every input has a visible label
- Every icon-only action has `aria-label`
- Keyboard navigation works for all controls
- Focus-visible state is always visible
- Async status updates use polite live region behavior
- Do not remove outlines without an accessible replacement
- Respect reduced motion for waiting indicators

## Flow Outcome

Successful completion of this domain is:

- User has created or joined a room
- User sees reliable waiting feedback
- User receives clear transition when partner joins

At that point, control can move to the next domain module.
