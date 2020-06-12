import React from 'react';

import { useTranslator } from '../localization';
import { Switch, SWITCH_OFF, SWITCH_ON, UpdateSettingAction } from '../modules/settings';
import RadioInput from './RadioInput';
import FieldSetTitle from './FieldSetTitle';
import FieldSet from './FieldSet';

interface Props {
    onChange: (newValue: Switch) => UpdateSettingAction,
    current: string
}

const ClockStyleSelector = ({
    onChange,
    current
}: Props): JSX.Element => {
    const t = useTranslator();
    const radioOptions = [{
        label: t('on'),
        value: SWITCH_ON
    },{
        label: t('off'),
        value: SWITCH_OFF
    }];
    return <FieldSet>
        <FieldSetTitle>{t('sendOnEnter')}</FieldSetTitle>
        <RadioInput options={radioOptions}
            onChange={newValue => {
                onChange(newValue as Switch);
            }}
            value={current}/>
    </FieldSet>;
};

export default React.memo(ClockStyleSelector);