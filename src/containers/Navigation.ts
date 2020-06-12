import { connect, ConnectedProps } from 'react-redux';

import Navigation from '../components/Navigation';
import { updatePage } from '../modules/pages';
import { RootState } from '../store';

const mapState = (state: RootState) => {
    return {
        activePage: state.pages,
        numNewMessages: state.messages.unread.length
    };
};
const mapDispatch = {
    onPageChange: updatePage
};

const connector = connect(mapState, mapDispatch);

export type ReduxProps = ConnectedProps<typeof connector>
export default connector(Navigation);
