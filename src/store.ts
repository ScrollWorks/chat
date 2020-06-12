import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { reducer as messageReducer } from './modules/messages';
import { reducer as settingReducer } from './modules/settings';
import { reducer as pageReducer } from './modules/pages';
import messageEpic from './epics/messages';
import settingsEpic from './epics/settings';
import pagesEpic from './epics/pages';

const rootReducer = combineReducers({
    messages: messageReducer,
    settings: settingReducer,
    pages: pageReducer
});
export type RootState = ReturnType<typeof rootReducer>

const rootEpic = combineEpics(
    messageEpic, settingsEpic, pagesEpic
);

// Add redux debug property to window interface so TSC doesnt cry
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export default (() =>{
    // Add redux dev tools enhancer
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    // Create redux-observable middleware
    const epicMiddleware = createEpicMiddleware();
    // Create store with our reducers, enhancer and middleware
    const store = createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(epicMiddleware))
    );
    // Register our epics with the middleware
    epicMiddleware.run(rootEpic);
    return store;
})();