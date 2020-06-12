import { connect, ConnectedProps } from 'react-redux';

import App from '../components/App';
import { RootState } from '../store';
import { Dispatch } from 'redux';
import { listenForMessages } from '../modules/messages';

const mapState = (state: RootState) => {
    return {
        activePage: state.pages,
    };
};

const mapDispatch = (dispatch: Dispatch) => ({
    init: (pageTitle: string) => {
        // should probably extract next line as a new action that
        // gets executed from an epic rather than interacting
        // with the DOM from here...
        document.title = pageTitle;
        dispatch(listenForMessages());
    }
});

const connector = connect(mapState, mapDispatch);

export type ReduxProps = ConnectedProps<typeof connector>
export default connector(App);
