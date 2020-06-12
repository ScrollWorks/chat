import { TestScheduler } from 'rxjs/testing';

import pagesEpic from './pages';
import { updatePage, PAGE_CHAT, PAGE_SETTINGS } from '../modules/pages';
import { markMessagesAsRead } from '../modules/messages';
import { ActionsObservable, StateObservable } from 'redux-observable';

const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
});

describe('epic/pages', () => {
    test('emits mark messages as read when changing to chat page', () => {
        testScheduler.run(({ cold, hot, expectObservable }) => {
            const input$ = new ActionsObservable(cold('-a-b', {
                a: updatePage(PAGE_CHAT),
                b: updatePage(PAGE_SETTINGS)
            }));
            const state$ = new StateObservable(hot(''), undefined);
            const output$ = pagesEpic(input$, state$, null);
            expectObservable(output$).toBe('-x--', {
                x: markMessagesAsRead()
            });
        });
    });
});


