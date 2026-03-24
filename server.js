const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public')); 

let rooms = {};

io.on('connection', (socket) => {
    
    // 1. CREATE ROOM (Now takes a username)
    socket.on('create_room', (data) => {
        const roomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
        rooms[roomCode] = { 
            hostId: socket.id, 
            // We now store an array of player objects instead of just IDs
            players: [{ id: socket.id, name: data.username, hand: [] }], 
            lives: 3, 
            level: 1, 
            started: false, 
            allCards: [],
            maxRange: 100 
        };
        socket.join(roomCode);
        socket.emit('room_created', roomCode);
        // Tell the room to update the player list
        io.to(roomCode).emit('update_players', rooms[roomCode].players.map(p => ({name: p.name, cards: p.hand.length})));
    });

    // 2. JOIN ROOM (Now takes a username)
    socket.on('join_room', (data) => {
        const code = data.code.toUpperCase();
        if (rooms[code] && !rooms[code].started) {
            socket.join(code);
            rooms[code].players.push({ id: socket.id, name: data.username, hand: [] });
            // Broadcast the new player list to everyone in the room
            io.to(code).emit('update_players', rooms[code].players.map(p => ({name: p.name, cards: p.hand.length})));
        } else {
            socket.emit('error', 'Room not found or already started');
        }
    });

    // 3. START GAME
    socket.on('start_game', (data) => {
        const roomCode = data.roomCode;
        const room = rooms[roomCode];
        
        if (!room || socket.id !== room.hostId) {
            socket.emit('error', 'Only the host can start the game!');
            return; 
        }
        if (room.players.length < 2) {
            socket.emit('error', 'You need at least 2 players to start the game!');
            return;
        }

        if (room.level === 1) {
            const minAllowed = Math.ceil(room.players.length / 4) * 100;
            let requestedRange = parseInt(data.customRange) || minAllowed;
            requestedRange = Math.max(minAllowed, requestedRange);
            requestedRange = Math.min(1000, requestedRange);
            room.maxRange = requestedRange; 
        }

        room.started = true;
        const numCards = room.level;
        const deck = Array.from({length: room.maxRange}, (_, i) => i + 1).sort(() => Math.random() - 0.5);
        
        let index = 0;
        room.allCards = []; 

        // Deal cards and save them to the specific player's profile
        room.players.forEach(p => {
            p.hand = deck.slice(index, index + numCards);
            room.allCards.push(...p.hand); 
            io.to(p.id).emit('game_started', { hand: p.hand, level: room.level, lives: room.lives });
            index += numCards;
        });
        
        room.allCards.sort((a, b) => a - b);
        
        // Update the screen so everyone sees how many cards each person got
        io.to(roomCode).emit('update_players', room.players.map(p => ({name: p.name, cards: p.hand.length})));
    });

    // 4. PLAY CARD
    socket.on('play_card', (data) => {
        const room = rooms[data.roomCode];
        if (!room) return;

        const playedValue = data.value;
        if (!room.allCards.includes(playedValue)) return; 

        // Find who played the card and remove it from their specific hand
        const player = room.players.find(p => p.id === socket.id);
        if (player) {
            player.hand = player.hand.filter(c => c !== playedValue);
        }

        const lowestCardInExistence = room.allCards[0];

        if (playedValue === lowestCardInExistence) {
            room.allCards.shift(); 
            io.to(data.roomCode).emit('card_played', { value: playedValue, success: true, lives: room.lives, by: player.name });
        } else {
            room.lives -= 1;
            room.allCards = room.allCards.filter(card => card !== playedValue);
            io.to(data.roomCode).emit('card_played', { value: playedValue, success: false, lives: room.lives, by: player.name });

            if (room.lives <= 0) {
                io.to(data.roomCode).emit('game_over');
                delete rooms[data.roomCode]; 
                return; 
            }
        }

        // Instantly update the card counts on everyone's screen
        io.to(data.roomCode).emit('update_players', room.players.map(p => ({name: p.name, cards: p.hand.length})));

        if (room.allCards.length === 0 && room.lives > 0) {
            room.level++;
            room.started = false;
            io.to(data.roomCode).emit('level_complete', room.level);
        }
    });
});

http.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});