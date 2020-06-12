import React from 'react';

import { useTranslator } from '../localization';
import { THEME_DARK, Theme, THEME_LIGHT } from '../themes';
import RadioInput from './RadioInput';
import FieldSetTitle from './FieldSetTitle';
import FieldSet from './FieldSet';
import { UpdateSettingAction } from '../modules/settings';

interface Props {
    onChange: (newValue: Theme) => UpdateSettingAction,
    current: string
}

const ThemeSelector = ({
    onChange,
    current
}: Props): JSX.Element => {
    const t = useTranslator();
    const radioOptions = [{
        label: t('lightThemeLabel'),
        value: THEME_LIGHT
    },{
        label: t('darkThemeLabel'),
        value: THEME_DARK
    }];
    return <FieldSet>
        <FieldSetTitle>{t('interfaceColor')}</FieldSetTitle>
        <RadioInput options={radioOptions}
            onChange={newValue => {
                onChange(newValue as Theme);
            }}
            value={current}/>
    </FieldSet>;
};

export default React.memo(ThemeSelector);