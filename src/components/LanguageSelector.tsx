import styled from 'styled-components';
import React from 'react';

import { useTranslator, ENGLISH, SPANISH, Language } from '../localization';
import { UpdateSettingAction } from '../modules/settings';
import FieldSetTitle from './FieldSetTitle';
import FieldSet from './FieldSet';

const StyledSelect = styled.select`
    font-size: inherit;
    font-family: inherit;
    padding: ${({ theme }) => theme.spacing.regular} ${({ theme }) => theme.spacing.big};
    color: ${({ theme }) => theme.inputColor};
    border-radius: ${({ theme }) => theme.borderRadius};
    border: none;
    background: ${({ theme }) => theme.inputBackground};
    &:focus {
        outline: none;
    }
    @media (min-width: ${({ theme }) => theme.mobileBreakpoint}) {
        margin: -${({ theme }) => theme.spacing.regular} 0;
    }        
`;

interface Props {
    onChange: (newValue: Language) => UpdateSettingAction,
    current: string
}

const LanguageSelector = ({
    onChange,
    current
}: Props): JSX.Element => {
    const t = useTranslator();
    const dropdownOptions = [{
        label: t('es'),
        value: SPANISH
    },{
        label: t('en'),
        value: ENGLISH
    }];
    return <FieldSet>
        <FieldSetTitle>{t('language')}</FieldSetTitle>
        <StyledSelect value={current} onChange={e => {
            onChange(e.currentTarget.value as Language);
        }}>
            {dropdownOptions.map(({ label: optionLabel, value: optionValue }) => {
                return <option key={optionLabel} value={optionValue}>
                    {optionLabel}
                </option>;
            })}
        </StyledSelect>
    </FieldSet>;
};

export default React.memo(LanguageSelector);