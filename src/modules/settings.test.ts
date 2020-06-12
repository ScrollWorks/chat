import {
    SettingState,
    UpdateSettingAction,
    SETTING_USERNAME,
    reducer,
    updateSetting
} from './settings';

import { DEFAULT_SETTINGS } from '../../app.config';

describe('modules/settings', () => {
    describe('reducer', () => {
        test('returns unaltered state on unrecognised action', () => {
            const state = 'anything';
            expect(reducer(state as unknown as SettingState, {} as UpdateSettingAction))
                .toEqual(state);
        });
        describe('reads initial state from localStorage', () => {
            test('and returns it if it exists', () => {
                // We mock the getItem property to make it return a known value
                // we can assert against.
                const STORED_OBJECT = { many: 'settings' };
                const originalGetItem = Storage.prototype.getItem;
                Storage.prototype.getItem = jest.fn(() => JSON.stringify(STORED_OBJECT));

                expect(reducer(undefined, {} as UpdateSettingAction)).toEqual(STORED_OBJECT);

                Storage.prototype.getItem = originalGetItem;
            });
            test('or returns defaults if not', () => {
                // We mock the getItem property to make it return a known value
                const originalGetItem = Storage.prototype.getItem;
                Storage.prototype.getItem = jest.fn(() => null);

                expect(reducer(undefined, {} as UpdateSettingAction)).toEqual(DEFAULT_SETTINGS);

                Storage.prototype.getItem = originalGetItem;
            });
        });
        test('handles UPDATE_SETTING correctly, updating value in settings', () => {
            const OLD_USERNAME = 'oldUserName';
            const NEW_USERNAME = 'oldUserName';
            const state = {
                ...DEFAULT_SETTINGS,
                [SETTING_USERNAME]: OLD_USERNAME
            };
            expect(reducer(
                state as SettingState,
                updateSetting(SETTING_USERNAME, NEW_USERNAME))[SETTING_USERNAME])
                .toEqual(NEW_USERNAME);
        });
    });
});
