import { connect, ConnectedProps } from 'react-redux';

import MessageInput from '../components/MessageInput';
import { sendMessage } from '../modules/messages';
import { RootState } from '../store';
import { SETTING_USERNAME, SETTING_SENDONENTER } from '../modules/settings';
import { Dispatch } from 'redux';


const mapState = (state: RootState) => {
    return {
        username: state.settings[SETTING_USERNAME],
        sendOnCtrlEnter: state.settings[SETTING_SENDONENTER],
    };
};
const mapDispatch = (dispatch: Dispatch) => {
    return {
        sendMessage: (body: string, sender: string) => (dispatch(sendMessage(body, sender)))
    };
};
const mergeProps = (
    stateProps: ReturnType<typeof mapState>,
    dispatchProps: ReturnType<typeof mapDispatch>) => {
    // we get the current username from state, and we use to create a function that has
    // it already baked in so the messageInput component doesnot need to know about it
    // and can just dispatch action with the text.
    return {
        sendOnCtrlEnter: stateProps.sendOnCtrlEnter,
        onSubmit: (body: string) => dispatchProps.sendMessage(body, stateProps.username)
    };
};

const connector = connect(mapState, mapDispatch, mergeProps);

export type ReduxProps = ConnectedProps<typeof connector>
export default connector(MessageInput);
