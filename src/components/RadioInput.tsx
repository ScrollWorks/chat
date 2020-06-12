import React from 'react';
import RadioInputLabel from './RadioInputLabel';

interface Props {
    options: {
        label: string,
        value: string
    }[],
    onChange: (newValue: string) => void,
    value: string
}
const InterfaceColorSelector = ({ value, options, onChange }: Props): JSX.Element => {
    return <>
        {options.map(({ label: optionLabel, value: optionValue }) => {
            return <RadioInputLabel key={optionLabel} >
                <input type="radio"
                    value={optionValue}
                    checked={value === optionValue}
                    onChange={e => onChange(e.currentTarget.value)}/>
                <span>{optionLabel}</span>
            </RadioInputLabel>;
        })}
    </>;
};

export default React.memo(InterfaceColorSelector);