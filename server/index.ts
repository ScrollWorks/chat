import express from 'express';
import { createServer } from 'http';
import socketio from 'socket.io';
import { resolve as resolvePath } from 'path';

export const CHAT_EVENT = 'chat event';
export const PORT = 8088;

const app = express();
const httpServer = createServer(app);
const ioServer = socketio(httpServer);

const pathToPublic = resolvePath(__dirname, '..', 'dist');

// WEB SERVER CONFIG : Serve index on /
// For any other path: serve file if one is matched, or 404 if not
app.use('^$', (_, res) => res.sendFile(resolvePath(pathToPublic, 'index.html')));
app.use(express.static(pathToPublic, { fallthrough: false }));

// SOCKET.IO SERVER CONFIG:
ioServer.on('connection', socket => {
    socket.on(CHAT_EVENT, msg => {
        // Introduce artificial delay to show "sending" state of messages
        setTimeout(() => {
            ioServer.emit(CHAT_EVENT, {
                ...msg, timestamp: Date.now()
            });
        }, 1000);
    });
});

// START SERVER
httpServer.listen(PORT, () => {
    console.log(`Chat server ready on port ${PORT}`);
});