import { mergeMap, filter } from 'rxjs/operators';
import { Epic, ofType, combineEpics } from 'redux-observable';
import { empty, from } from 'rxjs';

import { LOCALSTORAGE_SETTINGS_KEY, DEFAULT_SETTINGS } from '../../app.config';
import { RootState } from '../store';
import {
    UpdateSettingAction,
    UPDATE_SETTING,
    ResetSettingsAction,
    RESET_SETTINGS,
    SETTING_USERNAME,
    updateSetting,
    SettingName,
    SETTING_LANGUAGE
} from '../modules/settings';
import { LANGUAGES, Language } from '../localization';

// Every time we receive an UPDATE_SETTING action, write it to LocalStorage
const updateSettingEpic: Epic<UpdateSettingAction, never, RootState> = (action$, state$) =>
    action$.pipe(
        ofType(UPDATE_SETTING),
        mergeMap(() => {
            localStorage.setItem(LOCALSTORAGE_SETTINGS_KEY, JSON.stringify(state$.value.settings));
            return empty();
        })
    );

// When we get a RESET_SETTINGS actions, dispatch an UPDATE_SETTING for each setting
// with its default value.
const resetSettingsEpic: Epic = action$ =>
    action$.pipe(
        ofType<ResetSettingsAction>(RESET_SETTINGS),
        mergeMap(() => {
            const settingsToReset = { ...DEFAULT_SETTINGS };
            delete settingsToReset[SETTING_USERNAME];
            return from(Object.entries(settingsToReset).map(
                ([setting, defaultValue]) =>
                    updateSetting(setting as SettingName, defaultValue)
            ));
        })
    );

// Whenever we receive an UPDATE_SETTING for the language setting, also update
// document.title to localized title.
const updatePageTitle: Epic = action$ =>
    action$.pipe(
        ofType<UpdateSettingAction>(UPDATE_SETTING),
        filter(({ payload: { setting } }) => setting === SETTING_LANGUAGE),
        mergeMap(({ payload: { value: language } }) => {
            document.title = LANGUAGES[language as Language]['title'];
            return empty();
        })
    );

export default combineEpics(
    updatePageTitle,
    updateSettingEpic,
    resetSettingsEpic
);