// MODULE TYPES
export const PAGE_CHAT = 'chat';
export const PAGE_SETTINGS = 'settings';
export const PAGES: Page[] = [PAGE_CHAT, PAGE_SETTINGS];

export type Page = typeof PAGE_CHAT | typeof PAGE_SETTINGS;


// ACTIONS - TYPES AND DEFINITIONS
export const UPDATE_PAGE = 'UPDATE_PAGE';
export interface UpdatePageAction {
    type: typeof UPDATE_PAGE;
    payload: Page;
}
export const updatePage = (page: Page): UpdatePageAction => {
    return {
        type: UPDATE_PAGE,
        payload: page
    };
};

// STATE AND REDUCER - TYPES AND DEFINITIONS
const initialState: Page = PAGE_CHAT;

export const reducer = (state: Page = initialState, action: UpdatePageAction): Page => {
    switch (action.type) {
    case UPDATE_PAGE:
        // Just return the page we've just changed to as new state
        return action.payload;
    default:
        return state;
    }
};
