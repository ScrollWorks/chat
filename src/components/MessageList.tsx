import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Message from '../containers/Message';

import { ReduxProps } from '../containers/MessageList';

const StyledUl = styled.ul`
    height: 100%;
    box-sizing: border-box;
    position: relative;
    padding: ${({ theme }) => theme.spacing.huge} ${({ theme }) => theme.spacing.regular} 0;
    > * {
        position: relative;
        z-index: 1;
    }
    li {
        margin-bottom: ${({ theme }) => theme.spacing.regular};
        &:first-child {
            margin-top: ${({ theme }) => theme.spacing.huge};
        }
    }
`;

const Wrapper = styled.div<{ref: React.RefObject<HTMLDivElement>}>`
    flex: 1;
    overflow: scroll;
    position: relative;
    background-image: url(${({ theme }) => theme.messageListbg});
`;
const MessageList = ({ sending, read }: ReduxProps): JSX.Element => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        wrapperRef.current && wrapperRef.current.scrollTo({
            top: wrapperRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }, [sending, read]);

    return <Wrapper ref={wrapperRef}>
        <StyledUl className="messageList">
            { read.map(message =>
                <li key={message.clientId}>
                    <Message {...message} />
                </li>
            )}
            { sending.map(message =>
                <li key={message.clientId}>
                    <Message {...message} timestamp={-1} sending={true} />
                </li>
            )}
        </StyledUl>
    </Wrapper>;
};

export default React.memo(MessageList);