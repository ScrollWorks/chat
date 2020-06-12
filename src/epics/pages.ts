import { filter, mapTo } from 'rxjs/operators';
import { Epic, ofType, combineEpics } from 'redux-observable';

import { markMessagesAsRead } from '../modules/messages';
import { PAGE_CHAT, UpdatePageAction, UPDATE_PAGE } from '../modules/pages';

const changePage: Epic = action$ => action$.pipe(
    ofType<UpdatePageAction>(UPDATE_PAGE),
    filter(({ payload }) => payload === PAGE_CHAT),
    mapTo(markMessagesAsRead())
);

export default combineEpics(
    changePage
);