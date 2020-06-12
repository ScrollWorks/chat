import { sendMessageToServer, subscribeToServerMessages } from './serverAPI';
import { CHAT_EVENT } from '../../app.config';

const mockSocket = {
    emit: jest.fn(),
    on: jest.fn()
};
jest.mock('socket.io-client', () => () => mockSocket);

describe('lib/serverAPI', () => {
    describe('sendMessageToServer', () => {
        const MESSAGE = { body: 'hola', clientId: 1, sender: 'as' };
        test('calls emit on the socket passing through the message and event name', () => {
            sendMessageToServer(MESSAGE);
            expect(mockSocket.emit).toHaveBeenCalledWith(CHAT_EVENT, MESSAGE);
        });
    });

    describe('subscribeToServerMessages', () => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        const CALLBACK = () => {};
        test('calls on on the socket passing through the callback and event name', () => {
            subscribeToServerMessages(CALLBACK);
            expect(mockSocket.on).toHaveBeenCalledWith(CHAT_EVENT, CALLBACK);
        });
    });
});
