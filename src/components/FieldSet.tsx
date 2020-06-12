import React from 'react';
import styled from 'styled-components';

const StyledFieldset = styled.fieldset`
    margin: ${({ theme }) => theme.spacing.double} 0;
    padding: ${({ theme }) => theme.spacing.big} 0;
    @media (max-width: ${({ theme }) => theme.mobileBreakpoint}) {
        text-align: center;
    }    
`;

const FieldSet = (props: React.InputHTMLAttributes<HTMLFieldSetElement>): JSX.Element => {
    return <StyledFieldset {...props} />;
};

export default React.memo(FieldSet);