import { connect, ConnectedProps } from 'react-redux';

import MessageList from '../components/MessageList';

import { RootState } from '../store';

const mapState = (state: RootState) => {
    return { ...state.messages };
};

const connector = connect(mapState);

export type ReduxProps = ConnectedProps<typeof connector>
export default connector(MessageList);
