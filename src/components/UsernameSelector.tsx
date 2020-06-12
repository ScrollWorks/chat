import React, { useState } from 'react';
import styled from 'styled-components';

import { useTranslator } from '../localization';
import TextInput from './TextInput';
import FieldSet from './FieldSet';
import FieldSetTitle from './FieldSetTitle';
import { UpdateSettingAction } from '../modules/settings';

const StyledTextInput = styled(TextInput)`
    width: 200px;
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.regular};
    @media (min-width: ${({ theme }) => theme.mobileBreakpoint}) {
        margin: -${({ theme }) => theme.spacing.small} 0;
    }    
`;

interface Props {
    onChange: (newValue: string) => UpdateSettingAction,
    current: string
}
const UsernameSelector = ({
    onChange,
    current
}: Props): JSX.Element => {
    const [inputValue, setInputValue] = useState(current);
    const t = useTranslator();
    return <FieldSet>
        <label>
            <FieldSetTitle>{t('username')}</FieldSetTitle>
            <StyledTextInput
                onChange={e => {
                    const newValue = e.currentTarget.value;
                    setInputValue(newValue);
                    if (newValue.trim().length > 0)
                        onChange(newValue);
                }}
                value={inputValue}/>
        </label>
    </FieldSet>;
};

export default React.memo(UsernameSelector);