import React from 'react';
import styled from 'styled-components';

import { ReduxProps } from '../containers/SettingsScreen';
import UsernameSelector from './UsernameSelector';
import ThemeSelector from './ThemeSelector';
import ClockStyleSelector from './ClockStyleSelector';
import SendOnEnterSelector from './SendOnEnterSelector';
import LanguageSelector from './LanguageSelector';
import {
    SettingName,
    SETTING_USERNAME,
    SETTING_LANGUAGE,
    SETTING_SENDONENTER,
    SETTING_CLOCK24,
    SETTING_THEME
} from '../modules/settings';
import { useTranslator } from '../localization';

const Wrapper = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: ${({ theme }) => theme.settingsPageFontSize};
    form {
        padding: ${({ theme }) => theme.spacing.double} ${({ theme }) => theme.spacing.regular};
    }
`;

const StyledButton = styled.button`
    margin: ${({ theme }) => theme.spacing.huge} auto;
    padding: ${({ theme }) => theme.spacing.big};
    border-radius: ${({ theme }) => theme.borderRadius};
    display: block;
    font-size: inherit;
    font-weight: bold;
    cursor: pointer;
    color: inherit;
    outline: none;
    background: none;
    border: 1px solid ${({ theme }) => theme.buttonBorder.regular};
    &:hover {
        border-color: ${({ theme }) => theme.buttonBorder.hover};
    }
    &::-moz-focus-inner {
        border: 0;
    }    
`;

const SettingsScreen = ({
    currentValues,
    onSettingUpdate,
    onReset
}: ReduxProps): JSX.Element => {
    const t = useTranslator();
    return <Wrapper>
        <form>
            {[{
                setting: SETTING_USERNAME,
                selector: UsernameSelector
            },{
                setting: SETTING_THEME,
                selector: ThemeSelector
            },{
                setting: SETTING_CLOCK24,
                selector: ClockStyleSelector
            },{
                setting: SETTING_SENDONENTER,
                selector: SendOnEnterSelector
            },{
                setting: SETTING_LANGUAGE,
                selector: LanguageSelector
            }].map(settingData => {
                const setting = settingData.setting as SettingName;
                const Selector = settingData.selector;
                return <Selector
                    key={setting}
                    onChange={(val) => onSettingUpdate(setting, val)}
                    current={currentValues[setting]} />;
            })}
            <StyledButton onClick={e => {
                e.preventDefault();
                onReset();
            }}>
                {t('useDefaults')}
            </StyledButton>
        </form>
    </Wrapper>;
};

export default React.memo(SettingsScreen);