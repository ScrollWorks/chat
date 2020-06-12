import { mergeMap, filter, mapTo, map, first } from 'rxjs/operators';
import { Epic, ofType, combineEpics } from 'redux-observable';
import { empty, fromEventPattern } from 'rxjs';

import {
    SEND_MESSAGE,
    RECEIVE_MESSAGE,
    SendMessageAction,
    ReceiveMessageAction,
    MarkMessagesReadAction,
    markMessagesAsRead,
    LISTEN_FOR_MESSAGES,
    ListenForMessagesAction,
    receiveMessage,
    MessageFromServer
} from '../modules/messages';
import { PAGE_CHAT } from '../modules/pages';
import { sendMessageToServer, subscribeToServerMessages } from '../lib/serverAPI';
import { RootState } from '../store';

// When we receive SEND_MESSAGE action we call the API method to send message to server
const sendMessageEpic: Epic = action$ => action$.pipe(
    ofType<SendMessageAction>(SEND_MESSAGE),
    mergeMap(({ payload }) => {
        sendMessageToServer(payload);
        return empty();
    })
);

// When we receive LISTEN_FOR_MESSAGES we create a new observable from the subscribe API method
// and use the callback to dispatch new events in our observable, in response to which we will
// dispatch the RECEIVE_MESSAGE action.
const subscribeToMessages: Epic = action$ => action$.pipe(
    ofType<ListenForMessagesAction>(LISTEN_FOR_MESSAGES),
    first(),
    mergeMap(() => fromEventPattern(subscribeToServerMessages)
        .pipe(
            map((message) => receiveMessage(message as MessageFromServer))
        )
    )
);

// If we're not on the chat page, incremente the counter of unread messages.
type ReceiveMessagaEpicActions = ReceiveMessageAction | MarkMessagesReadAction;
const receiveMessageEpic: Epic<ReceiveMessagaEpicActions, ReceiveMessagaEpicActions, RootState> =
(action$, state$) => action$.pipe(
    ofType<ReceiveMessagaEpicActions>(RECEIVE_MESSAGE),
    filter(() => state$.value.pages === PAGE_CHAT),
    mapTo(markMessagesAsRead())
);

export default combineEpics(
    sendMessageEpic,
    receiveMessageEpic,
    subscribeToMessages
);