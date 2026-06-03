# Architecture Notes

InSync is a small real-time Node application with an in-memory room model.

## Server

`server.js` creates an Express application, serves `public/`, and attaches Socket.IO to the HTTP server. Rooms are stored in a plain object keyed by room code.

## Game Flow

Players create or join a room, the host starts the game, and the server deals cards based on the current level. When a player submits a card, the server checks whether a lower card is still hidden in another player's hand and updates the shared life counter.

## Client

`public/index.html` contains the browser UI and Socket.IO client handlers. A local manual test can be done by opening two browser windows and joining the same room.

