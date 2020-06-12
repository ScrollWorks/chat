import socketio from 'socket.io-client';

import { CHAT_EVENT } from '../../app.config';
import { MessageToServer, MessageFromServer } from '../modules/messages';

let socket: SocketIOClient.Socket;

// Singleton on the socket object
const getSocket = () => socket ? socket : socket = socketio();

// Just forward message to socketio's emit together with our event string
const sendMessageToServer = (message: MessageToServer): void => { getSocket().emit(CHAT_EVENT, message); };

// We pass on the callback to socketio's 'on' call together with our event string
const subscribeToServerMessages = (callback: (message: MessageFromServer) => void): void => {
    getSocket().on(CHAT_EVENT, callback);
};

export { sendMessageToServer, subscribeToServerMessages };