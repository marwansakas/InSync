const { readFileSync } = require("node:fs");
const test = require("node:test");
const assert = require("node:assert/strict");

const serverSource = readFileSync("server.js", "utf8");
const clientSource = readFileSync("public/index.html", "utf8");

test("server exposes room lifecycle socket events", () => {
  assert.match(serverSource, /socket\.on\('create_room'/);
  assert.match(serverSource, /socket\.on\('join_room'/);
  assert.match(serverSource, /socket\.on\('start_game'/);
  assert.match(serverSource, /socket\.on\('play_card'/);
});

test("client connects with Socket.IO and renders room controls", () => {
  assert.match(clientSource, /socket\.io/);
  assert.match(clientSource, /createRoom/);
  assert.match(clientSource, /joinRoom/);
});

