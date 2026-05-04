# Gaming Room And Game Flows

## Refs

1. [Create Room Form Design](apps/romantic-app/src/modules/gaming/docs/designs/create-room-form.png)
2. [Create Game Form Design](apps/romantic-app/src/modules/gaming/docs/designs/create-game-form.png)
3. [Rooms Wall Design](apps/romantic-app/src/modules/gaming/docs/designs/rooms-wall.png)
4. [Games Wall Design](apps/romantic-app/src/modules/gaming/docs/designs/games-wall.png)
5. [Game Design](apps/romantic-app/src/modules/gaming/docs/designs/game.png)
6. [Game Question Types Design](apps/romantic-app/src/modules/gaming/docs/designs/game-question-types.png)
7. [Game Summary Design](apps/romantic-app/src/modules/gaming/docs/designs/game-summary.png)
8. [Leave Game Confirm](apps/romantic-app/src/modules/gaming/docs/designs/leave-game-confirm.png)

## Dictionary

- **[room]** - Entity that contains [participant] list and [game] list.
- **[participant]** - User in [room].
- **[room_code]** - Code used to join [room].
- **[rooms_wall]** - View that shows [public_room] list.
- **[public_room]** - [room] visible on [rooms_wall].
- **[private_room]** - [room] hidden from [rooms_wall].
- **[room_password]** - Optional protection required in addition to [room_code] when set.
- **[game]** - Experience inside [room].
- **[casual]** - Supported [game] type that lists questions for users.
- **[games_wall]** - View in [room] that shows [game] list and [participant] list.
- **[game_waiting]** - [game] state before it has started; waiting for players to join.
- **[game_pending]** - [game] state while it is actively in progress.
- **[game_finished]** - [game] state after it has ended.
- **[question]** - Single prompt displayed to players during [game_pending].
- **[multiple_choice]** - [question] type where user selects from a set of answer options.
- **[text_input]** - [question] type where user provides a free-text answer.
- **[scale]** - [question] type where user selects a value on a rating scale.
- **[wild_challenge]** - [question] type presenting an open challenge to all players.

## Constraints

- [participant] filters: `<filter:user_name>`
- [participant] sorting: `<sort:user_name>`
- [game] filters: `<filter:category>`, `<filter:game_name>`
- [game] sorting: `<sort:order>`, `<sort:category>`, `<sort:game_name>`

## DoD

Users can discover [public_room] from [rooms_wall], create or join [room], and use [games_wall] to manage [game] list and [participant] list.

### Room Lifecycle

1. Any user can create [room].
2. [room] contains [participant] list and [game] list.
3. In [room], users can add and remove [participant].
4. [public_room] is visible on [rooms_wall] list.
5. [private_room] is not visible on [rooms_wall].
6. [private_room] can be joined only when user knows [room_code].

### Rooms Wall

1. [rooms_wall] shows only [public_room] list.
2. [rooms_wall] allows user to start [room] creation.
3. [rooms_wall] allows user to start [room] join.
4. [rooms_wall] allows user to start room trigger process.

### Room Joining And Access

1. User may join [room] by specifying [room_code].
2. Any [room] may be protected by [room_password].
3. For [room] protected by [room_password], user must provide [room_code] and [room_password].

### Game Lifecycle In Room

1. Users can create [game] inside [room].
2. Users can join [game] inside [room].
3. [game] status can be [game_waiting], [game_pending], or [game_finished].
4. Current supported [game] type is [casual].
5. [casual] lists questions for users.

### Games Wall

1. [games_wall] exists in [room] context.
2. [games_wall] shows [game] list and [participant] list from current [room].
3. [games_wall] supports [game] filtering by category and name.
4. [games_wall] supports [game] sorting by order, category, and name.
5. [games_wall] supports [participant] filtering by user name.
6. [games_wall] supports [participant] sorting by user name.

### Game Creation Inputs

1. During [game] creation, user may specify:
   1a. Amount of players: `<min:1>`, `<max:30>`.
   1b. Game type.
   1c. Game name.
   1d. Time for question.
   1e. Category.
   1f. Difficulty: `<options:Easy,Medium,Hard>`.
   1g. Brief description.

### Game Play

1. [game_pending] displays one [question] at a time.
2. [game_pending] shows a countdown timer per [question].
3. [game_pending] shows a live participant score panel.
4. [casual] supports [multiple_choice], [text_input], [scale], and [wild_challenge] question types.
5. User can initiate leaving [game_pending] from the game screen.

### Leave Game

1. Leaving [game_pending] requires user confirmation.
2. Confirmation displays consequences of leaving early.
3. User may cancel and remain in [game_pending].

### Game Summary

1. [game_finished] shows a summary screen with participant rankings and points earned.
2. Summary displays total question count and total time spent.
