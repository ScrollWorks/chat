import { Theme } from '../themes';
import { Language } from '../localization';

// MODULE TYPES
export const CLOCK_STYLE_12 = 'clock12';
export const CLOCK_STYLE_24 = 'clock24';
export type ClockStyle = typeof CLOCK_STYLE_12 | typeof CLOCK_STYLE_24;

export const SWITCH_ON = 'on';
export const SWITCH_OFF = 'off';
export type Switch = typeof SWITCH_ON | typeof SWITCH_OFF;

export const SETTING_USERNAME = 'SETTING_USERNAME';
export const SETTING_THEME = 'SETTING_THEME';
export const SETTING_CLOCK24 = 'SETTING_CLOCK24';
export const SETTING_SENDONENTER = 'SETTING_SENDONENTER';
export const SETTING_LANGUAGE = 'SETTING_LANGUAGE';
export type SettingName = typeof SETTING_USERNAME |
    typeof SETTING_THEME |
    typeof SETTING_CLOCK24 |
    typeof SETTING_SENDONENTER |
    typeof SETTING_LANGUAGE;

// ACTIONS - TYPES AND DEFINITIONS
export const UPDATE_SETTING = 'UPDATE_SETTING';
export const RESET_SETTINGS = 'RESET_SETTINGS';
export interface UpdateSettingAction {
    type: typeof UPDATE_SETTING;
    payload: {
        setting: SettingName,
        value: string
    };
}
export const updateSetting = (setting: SettingName, value: string): UpdateSettingAction => {
    return {
        type: UPDATE_SETTING,
        payload: { setting, value }
    };
};
export interface ResetSettingsAction {
    type: typeof RESET_SETTINGS;
    payload: null;
}
export const resetSettings = (): ResetSettingsAction => {
    return {
        type: RESET_SETTINGS,
        payload: null
    };
};

// STATE AND REDUCER - TYPES AND DEFINITIONS
export interface SettingState {
    [SETTING_USERNAME]: string
    [SETTING_THEME]: Theme
    [SETTING_CLOCK24]: ClockStyle
    [SETTING_SENDONENTER]: Switch
    [SETTING_LANGUAGE]: Language
}
// Weird place for import because reducer should probably be in a separate file.
import { LOCALSTORAGE_SETTINGS_KEY, DEFAULT_SETTINGS } from '../../app.config';
const getInitialState = () => {
    const storedSettings = localStorage.getItem(LOCALSTORAGE_SETTINGS_KEY);
    if (storedSettings) {
        try {
            return JSON.parse(storedSettings);
        } catch (_) {
            // do nothing if settings have been tampered with, revert to default
        }
    }
    return DEFAULT_SETTINGS;
};

export const reducer = (state: SettingState = getInitialState(), action: UpdateSettingAction): SettingState => {
    switch (action.type) {
    case UPDATE_SETTING:
        // Return all other settings as they were and update the one we receive.
        return { ...state, [action.payload.setting]: action.payload.value };
    default:
        return state;
    }
};
