import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    font-family: inherit;
    font-size: inherit;
    border: none;
    border-radius: 20px; // Deliberately not using theme value - we want fully circular
    padding: ${({ theme }) => theme.spacing.regular} ${({ theme }) => theme.spacing.big};
    background: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.inputColor};
    border: 1px solid transparent;
    text-align: inherit;
    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.inputFocusBorder};
    }
    &::placeholder {
        color: inherit;
        opacity: ${({ theme }) => theme.inputPlaceholderOpacity};
    }    
`;

const TextInput = (props: React.InputHTMLAttributes<HTMLInputElement>): JSX.Element => {
    return <StyledInput {...props} type="text" />;
};

export default React.memo(TextInput);