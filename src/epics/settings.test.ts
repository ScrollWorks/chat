import { TestScheduler } from 'rxjs/testing';
import { of } from 'rxjs';
import { ActionsObservable, StateObservable } from 'redux-observable';

import settingsEpic from './settings';
import {
    updateSetting,
    resetSettings,
    SettingName,
    SETTING_LANGUAGE,
    SETTING_SENDONENTER,
    SETTING_THEME,
    SETTING_CLOCK24
} from '../modules/settings';
import { LOCALSTORAGE_SETTINGS_KEY, DEFAULT_SETTINGS } from '../../app.config';
import { LANGUAGES, ENGLISH } from '../localization';

const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
});

describe('epic/settings', () => {
    describe('when getting an updateSetting action', () => {
        test('writes new settings to localStorage', () => {
            // Mock the setItem method so we can assert the calls to it
            const originalSetItem = Storage.prototype.setItem;
            Storage.prototype.setItem = jest.fn();

            const SETTINGS = { all: 'settings' };
            const updateSettingAction = updateSetting('doesnot' as SettingName, 'matter');
            settingsEpic(of(updateSettingAction), {
                value: { settings: SETTINGS }
            }).subscribe();
            expect(localStorage.setItem).toHaveBeenCalledWith(
                LOCALSTORAGE_SETTINGS_KEY,
                JSON.stringify(SETTINGS));

            Storage.prototype.setItem = originalSetItem;
        });
        describe('if it is for language setting', () => {
            test('it updates document.title with appropriate string from lang files', () => {
                // We update the title to a random value, to then, after running the epic
                // check if it has the value we expect.
                const NEW_TITLE = LANGUAGES[ENGLISH].title;
                const updateSettingAction = updateSetting(SETTING_LANGUAGE, ENGLISH);
                window.document.title = `definitelyNot${NEW_TITLE}`;
                settingsEpic(of(updateSettingAction)).subscribe();
                expect(window.document.title).toEqual(NEW_TITLE);
            });
        });
    });

    describe('when getting a reset settings action', () => {
        test('dispatches an action for reversing each setting to default', () => {
            testScheduler.run(({ cold, hot, expectObservable }) => {
                const input$ = new ActionsObservable(cold('-a-', {
                    a: resetSettings()
                }));
                const state$ = new StateObservable(hot(''), undefined);
                const output$ = settingsEpic(input$, state$, null);
                expectObservable(output$).toBe('-(bcde)-', {
                    b: updateSetting(SETTING_THEME, DEFAULT_SETTINGS[SETTING_THEME]),
                    c: updateSetting(SETTING_CLOCK24, DEFAULT_SETTINGS[SETTING_CLOCK24]),
                    d: updateSetting(SETTING_SENDONENTER, DEFAULT_SETTINGS[SETTING_SENDONENTER]),
                    e: updateSetting(SETTING_LANGUAGE, DEFAULT_SETTINGS[SETTING_LANGUAGE]),
                });
            });
        });
    });
});
