# The Mind Online 🧠🃏

**🎮 Want to just play the game? [Click here to play live on Render!]([YOUR_RENDER_LINK_HERE](https://insync-an9d.onrender.com))**

---

A real-time, web-based multiplayer adaptation of the popular cooperative card game, *The Mind*. Players must work together to play their cards in ascending order without communicating. 

## 🌟 Features

* **Real-Time Multiplayer:** Instant card playing and state syncing powered by WebSockets.
* **Room-Based Matchmaking:** Easily play with friends by generating and sharing a unique 4-letter room code.
* **Host Controls:** The room creator can start the game and set custom maximum deck ranges (up to 1000).
* **Dynamic Deck Scaling:** The game automatically calculates the minimum allowed card range based on the number of players connected.
* **Live Dashboard:** Track how many cards each player has left in their hand in real-time.
* **Life Tracking:** The team shares 3 lives. Making a mistake costs a life, but the game continues until lives run out!

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Real-Time Engine:** Socket.io
* **Frontend:** Vanilla HTML, CSS, and JavaScript

## 📜 How to Play

1. Enter your name and **Create** or **Join** a room.
2. The game is played in levels. In Level 1, everyone gets 1 card. In Level 2, everyone gets 2 cards, and so on.
3. **No talking!** You must play your cards in ascending order to the center of the table.
4. If someone plays a card out of turn (meaning someone else had a lower card in their hand), the team loses a life, and the mistakenly played card is discarded. 
5. Survive as many levels as you can before your 3 lives run out!

---

## 💻 Developer Instructions (Running Locally)

*(The instructions below are for developers who want to download and modify the source code).*

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/marwansakas/the-mind-online.git](https://github.com/marwansakas/the-mind-online.git)
   cd the-mind-online
