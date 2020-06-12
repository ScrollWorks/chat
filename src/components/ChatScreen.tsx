import React from 'react';
import styled from 'styled-components';

import MessageInput from '../containers/MessageInput';
import MessageList from '../containers/MessageList';

const Wrapper = styled.main`
    display: flex;
    flex-direction: column;
    > .messageList {
        flex: 1;
    }
    > .messageInput {
        flex: 0 0 auto;
    }
`;

const ChatScreen = (): JSX.Element => {
    return <Wrapper>
        <MessageList />
        <MessageInput />
    </Wrapper>;
};

export default React.memo(ChatScreen);