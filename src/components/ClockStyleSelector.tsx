import React from 'react';
import { useTranslator } from '../localization';
import {
    ClockStyle,
    CLOCK_STYLE_12,
    CLOCK_STYLE_24,
    UpdateSettingAction
} from '../modules/settings';
import RadioInput from './RadioInput';
import FieldSetTitle from './FieldSetTitle';
import FieldSet from './FieldSet';

interface Props {
    onChange: (newValue: ClockStyle) => UpdateSettingAction,
    current: string
}

const ClockStyleSelector = ({
    onChange,
    current
}: Props): JSX.Element => {
    const t = useTranslator();
    const radioOptions = [{
        label: t('clockStyle12'),
        value: CLOCK_STYLE_12
    },{
        label: t('clockStyle24'),
        value: CLOCK_STYLE_24
    }];
    return <FieldSet>
        <FieldSetTitle>{t('clockStyle')}</FieldSetTitle>
        <RadioInput options={radioOptions}
            onChange={newValue => {
                onChange(newValue as ClockStyle);
            }}
            value={current}/>
    </FieldSet>;
};

export default React.memo(ClockStyleSelector);