import {
    SETTING_USERNAME,
    SETTING_THEME,
    SETTING_CLOCK24,
    CLOCK_STYLE_24,
    SETTING_SENDONENTER,
    SWITCH_ON,
    SETTING_LANGUAGE
} from './src/modules/settings';

import { THEME_LIGHT } from './src/themes';
import { ENGLISH } from './src/localization';

export const DEFAULT_SETTINGS = {
    [SETTING_USERNAME]: `guest${Math.floor(Math.random() * 9999)}`,
    [SETTING_THEME]: THEME_LIGHT,
    [SETTING_CLOCK24]: CLOCK_STYLE_24,
    [SETTING_SENDONENTER]: SWITCH_ON,
    [SETTING_LANGUAGE]: ENGLISH,
};

export const CHAT_EVENT = 'chat event';
export const PORT = 8088;
export const LOCALSTORAGE_SETTINGS_KEY = 'settings';