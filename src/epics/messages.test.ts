import { TestScheduler } from 'rxjs/testing';
import { of } from 'rxjs';
import { ActionsObservable, StateObservable } from 'redux-observable';

import messagesEpic from './messages';
import {
    sendMessage,
    receiveMessage,
    listenForMessages,
    MessageFromServer,
    markMessagesAsRead
} from '../modules/messages';
import { sendMessageToServer, subscribeToServerMessages } from '../lib/serverAPI';
import { PAGE_SETTINGS, PAGE_CHAT } from '../modules/pages';

jest.mock('../lib/serverAPI');


const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
});

describe('epic/messages', () => {
    describe('when getting a sendMessage action', () => {
        test('calls API method to send message', () => {
            const sendMessageAction = sendMessage('what', 'ever');
            const { payload: message } = sendMessageAction;
            messagesEpic(of(sendMessageAction)).subscribe();
            expect(sendMessageToServer).toHaveBeenCalledWith(message);
        });
    });
    describe('when getting a receiveMessage action', () => {
        test('dispatches markAsRead only if we are on chat page', () => {
            testScheduler.run(({ cold, hot, expectObservable }) => {
                const input$ = new ActionsObservable(cold('-aaaa', {
                    a: receiveMessage({} as MessageFromServer)
                }));
                // initial state = PAGE_CHAT, t=4 change to PAGE_SETTINGS
                // now, we can assert we only get MarkAsRead before the state changes
                const state$ = new StateObservable(hot('---s-', {
                    s: { pages: PAGE_SETTINGS }
                }), { pages: PAGE_CHAT });
                const output$ = messagesEpic(input$, state$, null);
                expectObservable(output$).toBe('-xx--', {
                    x: markMessagesAsRead()
                });
            });
        });
    });
    describe('when getting a subscribeToMessages action', () => {
        test('succesfully subscribes and dispatches actions when new messages arrive', () => {
            const [MSG1, MSG2, MSG3] = ['1', '2', '3'];
            let callback: (message: unknown) => void;
            // We mock the subscribe method of the server API so that we have
            // access to the callback it's passed to it.
            // That way we can mock receiving a message by calling the callback.
            const subscribeMock = subscribeToServerMessages as jest.Mock;
            subscribeMock.mockImplementation(cb => { callback = cb; });
            // After 1 frame of time, receive MSG1
            testScheduler.schedule(() => {
                callback(MSG1);
            }, 1);
            // After 3 frames of time, receive MSG2 and MSG3
            testScheduler.schedule(() => {
                callback(MSG2);
                callback(MSG3);
            }, 3);
            testScheduler.run(({ cold, expectObservable }) => {
                const input$ = new ActionsObservable(cold('a', {
                    a: listenForMessages()
                }));
                const output$ = messagesEpic(input$);
                // the expected output should be "-m-(no)"
                // not sure why there's a 4 frames delay - not enough time to investigate
                expectObservable(output$).toBe('-----m-(no)', {
                    m: receiveMessage(MSG1 as unknown as MessageFromServer),
                    n: receiveMessage(MSG2 as unknown as MessageFromServer),
                    o: receiveMessage(MSG3 as unknown as MessageFromServer)
                });
            });
        });
    });
});


