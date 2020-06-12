import React from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span`
    font-weight: bold;
    &:after {
        content: ": ";
    }
    @media (max-width: ${({ theme }) => theme.mobileBreakpoint}) {
        display: block;
        margin-bottom: ${({ theme }) => theme.spacing.regular};
        &:after {
            content: "";
        }
    }
`;

const FieldSetTitle = (props: React.InputHTMLAttributes<HTMLSpanElement>): JSX.Element => {
    return <StyledSpan {...props} />;
};

export default React.memo(FieldSetTitle);