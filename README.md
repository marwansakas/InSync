# InSync

InSync is a real-time multiplayer web game inspired by *The Mind*. It helps small groups play a cooperative timing-and-ordering card game in the browser, with rooms, shared lives, custom deck ranges, and synchronized state updates over Socket.IO.

Live demo: https://insync-an9d.onrender.com

## Tech Stack

- Node.js
- Express
- Socket.IO
- Vanilla HTML, CSS, and browser JavaScript

## Features

- Create or join multiplayer rooms with a short room code.
- Host-controlled game start and maximum deck range.
- Level-based dealing where each player receives more cards each round.
- Shared life counter for team mistakes.
- Real-time player list, card count, and center-pile updates.

## Quick Start

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm start
```

Open the app at:

```text
http://localhost:3000
```

Run the repository smoke test:

```bash
npm test
```

## Environment Notes

The app stores rooms in memory. Restarting the Node process clears all active rooms and games. No `.env` file is required for local development.

## How to Play

1. Enter a player name.
2. Create a room or join an existing room code.
3. The host starts the game.
4. Players try to play cards in ascending order without table talk.
5. A lower hidden card remaining in another player's hand costs the team one life.
6. The team advances through levels until it runs out of lives.

## Project Structure

- `server.js`: Express server, Socket.IO room management, dealing, turn validation, and level progression.
- `public/index.html`: Browser client UI, room controls, and Socket.IO client handlers.
- `package.json`: Root scripts and runtime dependencies.
- `tests/`: Smoke tests that verify important server/client source markers.
- `docs/`: Architecture and maintenance notes.

## Demo / Walkthrough

Use the Render demo for a hosted walkthrough, or run the app locally and open two browser windows to simulate two players joining the same room.

