import {
    Page,
    reducer,
    updatePage,
    PAGE_CHAT,
    PAGE_SETTINGS,
    UpdatePageAction
} from './pages';

describe('modules/pages', () => {
    describe('reducer', () => {
        test('returns unaltered state on unrecognised action', () => {
            const state = PAGE_CHAT;
            expect(reducer(state as Page, {} as UpdatePageAction)).toEqual(state);
        });
        test('has correct initial state', () => {
            expect(reducer(undefined, {} as UpdatePageAction)).toEqual(PAGE_CHAT);
        });
        test('handles UPDATE_PAGE correctly', () => {
            const state = PAGE_SETTINGS;
            expect(reducer(state, updatePage(PAGE_CHAT))).toEqual(PAGE_CHAT);
        });
    });
});
