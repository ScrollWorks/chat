// MODULE TYPES
export interface MessageToServer {
    body: string;
    clientId: number;
    sender: string;
}
export interface MessageFromServer extends MessageToServer {
    timestamp: number;
}


// ACTIONS - TYPES AND DEFINITIONS
export const SEND_MESSAGE = 'SEND_MESSAGE';
export interface SendMessageAction {
    type: typeof SEND_MESSAGE;
    payload: MessageToServer;
}
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export interface ReceiveMessageAction {
    type: typeof RECEIVE_MESSAGE;
    payload: MessageFromServer;
}
export const MARK_MESSAGES_READ = 'MARK_MESSAGES_READ';
export interface MarkMessagesReadAction {
    type: typeof MARK_MESSAGES_READ;
    payload: null;
}

export const LISTEN_FOR_MESSAGES = 'LISTEN_FOR_MESSAGES';
export interface ListenForMessagesAction {
    type: typeof LISTEN_FOR_MESSAGES;
    payload: null;
}

export type MessageAction = SendMessageAction | ReceiveMessageAction | MarkMessagesReadAction;

export const sendMessage = (text: string, sender: string): SendMessageAction => {
    return {
        type: SEND_MESSAGE,
        payload: {
            clientId: Date.now(),
            body: text,
            sender
        }
    };
};

export const receiveMessage = (message: MessageFromServer ): ReceiveMessageAction => {
    return {
        type: RECEIVE_MESSAGE,
        payload: { ...message }
    };
};

export const markMessagesAsRead = (): MarkMessagesReadAction => {
    return {
        type: MARK_MESSAGES_READ,
        payload: null
    };
};

export const listenForMessages = (): ListenForMessagesAction => {
    return {
        type: LISTEN_FOR_MESSAGES,
        payload: null
    };
};

// STATE AND REDUCER - TYPES AND DEFINITIONS
export interface MessageState {
    sending: MessageToServer[];
    unread: MessageFromServer[];
    read: MessageFromServer[];
}

const initialState: MessageState = {
    sending: [],
    unread: [],
    read: []
};

export const reducer = (state: MessageState = initialState, action: MessageAction): MessageState => {
    switch (action.type) {
    case RECEIVE_MESSAGE:
        // Add message to unread list and remove from sending if it was there
        return {
            ...state,
            sending: [...state.sending.filter(message => message.clientId !== action.payload.clientId)],
            unread: [...state.unread, action.payload]
        };
    case MARK_MESSAGES_READ:
        // Empty unread list and add members to read list, at the end
        return {
            ...state,
            read: [...state.read, ...state.unread],
            unread: []
        };
    case SEND_MESSAGE:
        // Add message to the sending list
        return { ...state, sending: [...state.sending, action.payload] };
    default:
        return state;
    }
};
