import {
    MessageState,
    MessageAction,
    reducer,
    markMessagesAsRead,
    sendMessage,
    receiveMessage,
    MessageFromServer,
    MessageToServer
} from './messages';

describe('modules/messages', () => {
    describe('reducer', () => {
        test('returns unaltered state on unrecognised action', () => {
            const state = 'anything';
            expect(reducer(state as unknown as MessageState, {} as MessageAction))
                .toEqual(state);
        });
        test('has correct initial state', () => {
            expect(reducer(undefined, {} as MessageAction)).toEqual({
                sending: [],
                unread: [],
                read: []
            });
        });
        test('handles SEND_MESSAGE correctly, adding it to sending list', () => {
            const state = {
                sending: ['S'],
                unread: ['U'],
                read: ['R']
            };
            const sendMessageAction = sendMessage('hello', 'ruben');
            const { payload: message } = sendMessageAction;
            expect(reducer(state as unknown as MessageState, sendMessageAction)).toEqual({
                sending: ['S', message],
                unread: ['U'],
                read: ['R']
            });
        });
        test(`handles MARK_MESSAGES_READ correctly, moving 
            messages from unread to read list`, () => {
            const state = {
                sending: ['S'],
                unread: ['B', 'C', 'D'],
                read: ['A']
            };
            expect(reducer(state as unknown as MessageState, markMessagesAsRead()))
                .toEqual({
                    sending: ['S'],
                    unread: [],
                    read: ['A', 'B', 'C', 'D']
                });
        });
        describe('handles RECEIVE_MESSAGE correctly', () => {
            test('by adding new message to unread list', () => {
                const state = {
                    sending: [],
                    unread: ['U'],
                    read: ['R']
                };
                const newMessage = { N: 'EW' } as unknown as MessageFromServer;
                const receiveAction = receiveMessage(newMessage);
                expect(reducer(state as unknown as MessageState, receiveAction))
                    .toEqual({
                        sending: [],
                        unread: ['U', newMessage],
                        read: ['R']
                    });
            });
            test('by removing message with matching clientId from sending list', () => {
                const myMessage = { clientId: 'mine' } as unknown as MessageToServer;
                const someOtherMessage = { clientId: 'XX' } as unknown as MessageToServer;
                const state = {
                    sending: [myMessage, someOtherMessage],
                    unread: ['U'],
                    read: ['R']
                };
                const receiveAction = receiveMessage(myMessage as MessageFromServer);
                expect(reducer(state as unknown as MessageState, receiveAction))
                    .toEqual({
                        sending: [someOtherMessage],
                        unread: ['U', myMessage],
                        read: ['R']
                    });
            });
        });
    });
});
