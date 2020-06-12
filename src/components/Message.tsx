import React from 'react';
import styled from 'styled-components';
import { ReduxProps } from '../containers/Message';
import { MessageFromServer } from '../modules/messages';
import { useTranslator } from '../localization';
import { ClockStyle, CLOCK_STYLE_24 } from '../modules/settings';

export const Wrapper = styled.div<{sending: boolean, fromLocalUser: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    ${({ sending, theme }) => sending && `
        opacity: ${theme.sendingOpacity};
    `}    
    ${({ fromLocalUser }) => fromLocalUser && `
        align-items: flex-end;
    `}    
`;

export const MessageBody = styled.p<{fromLocalUser: boolean}>`
    max-width: ${({ theme }) => theme.maxMessageWidth};
    padding: ${({ theme }) => (theme.spacing || {}).regular};
    border-radius: ${({ theme }) => theme.borderRadius};
    box-shadow: ${({ theme }) => theme.boxShadow};
    background: ${({ theme }) => theme.incomingMessageBg};
    color: ${({ theme }) => theme.messageColor};
    position: relative;
    &::after {
        content: "";
        position: absolute;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid ${({ theme }) => theme.incomingMessageBg};
        top: -7px;
        box-sizing: border-box;
        transform: rotate(225deg);
        left: 0;
    }    
    ${({ fromLocalUser, theme }) => fromLocalUser && `
        background: ${theme.outgoingMessageBg};
        &::after {
            border-bottom-color: ${theme.outgoingMessageBg};
            left: auto;
            right: 0;
            transform: rotate(135deg);
        }
    `}       
`;

export const MessageDetails = styled.p`
    font-size: ${({ theme }) => theme.messageDetailsFontSize};
    font-weight: ${({ theme }) => theme.messageDetailsFontWeight};
    padding: ${({ theme }) => theme.messageDetailsPadding};
`;

export interface Props extends ReduxProps, Omit<MessageFromServer, 'clientId'> {
    sending?: boolean
}

const Message = ({
    localUser, clockStyle, sending = false, body, timestamp, sender,
}: Props): JSX.Element => {
    const t = useTranslator();
    const fromLocalUser = sending || localUser === sender;
    const { hours, minutes, isoString } = parseTimestamp(timestamp, clockStyle);
    return <Wrapper sending={sending} fromLocalUser={fromLocalUser}>
        <MessageDetails>
            {sending ? t('sending') : <>
                {!fromLocalUser && `${sender}, `}
                <time dateTime={isoString}>{`${hours}:${minutes}`}</time>
            </>}
        </MessageDetails>
        <MessageBody fromLocalUser={fromLocalUser}>
            {body}
        </MessageBody>
    </Wrapper>;
};

const parseTimestamp = (timestamp: number, clockStyle: ClockStyle) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    return {
        hours: clockStyle === CLOCK_STYLE_24 ? hours : hours % 12 || 12,
        minutes: zeroPad(date.getMinutes()),
        isoString: date.toISOString(),
    };
};
const zeroPad = (x: number) => x < 10 ? `0${x}` : x;


export default React.memo(Message);