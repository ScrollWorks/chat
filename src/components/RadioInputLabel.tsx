import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
    & + label {
        margin-left: ${({ theme }) => theme.spacing.big};
    }
    span {
        margin-left: ${({ theme }) => theme.spacing.small};
    } 
`;

const Label = (props: React.InputHTMLAttributes<HTMLLabelElement>): JSX.Element => {
    return <StyledLabel {...props} />;
};

export default React.memo(Label);