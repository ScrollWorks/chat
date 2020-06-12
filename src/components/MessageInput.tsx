import React, { useState } from 'react';
import styled from 'styled-components';

import TextInput from './TextInput';
import { ReduxProps } from '../containers/MessageInput';
import { useTranslator } from '../localization';
import { SWITCH_OFF } from '../modules/settings';

const StyledForm = styled.form`
    padding: ${({ theme }) => theme.spacing.regular};
    display: flex;
    align-items: center;
    button {
        flex: 0 0 auto;
    }
    input {
        flex: 1;
    }
`;

const StyledButton = styled.button`
    cursor: pointer;
    background: none;
    border: none;
    color: ${({ disabled, theme }) =>
        disabled ? theme.sendIcon.disabledColor : theme.sendIcon.activeColor };
    padding: ${({ theme }) => theme.spacing.small};
    margin-left: ${({ theme }) => theme.spacing.regular};
    svg {
        width: ${({ theme }) => theme.sendIconSize};
        height: ${({ theme }) => theme.sendIconSize};
    }
    &::-moz-focus-inner {
        border: 0;
    }
`;

const MessageInput = ({ onSubmit, sendOnCtrlEnter }: ReduxProps): JSX.Element => {
    const [inputValue, setInputValue] = useState('');
    const t = useTranslator();
    return <StyledForm className="messageInput" onSubmit={e=> {
        e.preventDefault();
        if (/[^\s]/.test(inputValue)) {
            onSubmit(inputValue.trim());
            setInputValue('');
        }
    }}>
        <TextInput
            placeholder={t('inputPlaceholder')}
            // When pressing enter, if sendOnEnter is false or control isnt pressed, cancel default (submit)
            onKeyDown={e => e.key === 'Enter' && (sendOnCtrlEnter === SWITCH_OFF || !e.ctrlKey) && e.preventDefault()}
            onChange={e => setInputValue(e.currentTarget.value)} value={inputValue} />
        <StyledButton disabled={inputValue.trim().length === 0}>
            {sendSVG}
        </StyledButton>
    </StyledForm>;
};

const sendSVG = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path></svg>;
export default React.memo(MessageInput);