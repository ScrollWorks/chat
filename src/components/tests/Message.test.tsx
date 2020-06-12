import React from 'react';
import { shallow } from 'enzyme';
import Message, {
    Props,
    Wrapper,
    MessageBody,
    MessageDetails
} from '../Message';

import { useTranslator } from '../../localization';
import { CLOCK_STYLE_12, CLOCK_STYLE_24 } from '../../modules/settings';

const timestamp = new Date('2000-01-01T17:00:00');

const setup = () => {
    const props = {
        localUser: 'ruben',
        clockStyle: CLOCK_STYLE_12,
        sending: false,
        body: 'body',
        timestamp: timestamp.getTime(),
        sender: 'somebodyElse',
    };
    const wrapper = shallow(<Message {...props as Props} />);
    return { props, enzymeWrapper: wrapper };
};

jest.mock('../../localization');
const TRANSLATED_SENDING = 'asdsad';

describe('Message Component', () => {
    beforeAll(() => {
        const useTranslatorMock = useTranslator as jest.Mock;
        useTranslatorMock.mockImplementation(() =>
            (key: string) => key === 'sending' && TRANSLATED_SENDING);
    });
    it('should render message wrapper with correct props', () => {
        const { enzymeWrapper, props }   = setup();
        let wrapperElement = enzymeWrapper.find(Wrapper);
        expect(wrapperElement).toHaveLength(1);
        expect(wrapperElement.props().sending).toEqual(props.sending);
        expect(wrapperElement.props().fromLocalUser).toEqual(false);
        enzymeWrapper.setProps({
            sender: props.localUser
        });
        wrapperElement = enzymeWrapper.find(Wrapper);
        expect(wrapperElement.props().fromLocalUser).toEqual(true);
        enzymeWrapper.setProps({
            sender: 'notLocalUser',
            sending: true
        });
        wrapperElement = enzymeWrapper.find(Wrapper);
        expect(wrapperElement.props().fromLocalUser).toEqual(true);
    });
    it('should render MessageBody with correct props and body as child', () => {
        const { enzymeWrapper, props }   = setup();
        const messageBodyElement = enzymeWrapper.find(Wrapper)
            .dive().find(MessageBody);
        expect(messageBodyElement).toHaveLength(1);
        expect(messageBodyElement.props().fromLocalUser).toEqual(false);
        expect(messageBodyElement.html()).toContain(props.body);
    });
    describe('when rendering messageDetails', () => {
        test('shows "sending" when message in sending state', () => {
            const { enzymeWrapper }   = setup();
            let messageDetailsElement = enzymeWrapper.find(Wrapper)
                .dive().find(MessageDetails);
            expect(messageDetailsElement.html()).not.toContain(TRANSLATED_SENDING);
            enzymeWrapper.setProps({
                sending: true
            });
            messageDetailsElement = enzymeWrapper.find(Wrapper)
                .dive().find(MessageDetails);
            expect(messageDetailsElement.html()).toContain(TRANSLATED_SENDING);
        });
        test('shows "sender" name only when not from local user', () => {
            const { enzymeWrapper, props }   = setup();
            let messageDetailsElement = enzymeWrapper.find(Wrapper)
                .dive().find(MessageDetails);
            expect(messageDetailsElement.html()).toContain(props.sender);
            enzymeWrapper.setProps({
                sender: props.localUser
            });
            messageDetailsElement = enzymeWrapper.find(Wrapper)
                .dive().find(MessageDetails);
            expect(messageDetailsElement.html()).not.toContain(props.sender);
        });
        test('shows "time" correctly depending on clockstyle prop', () => {
            const { enzymeWrapper }   = setup();
            let messageDetailsElement = enzymeWrapper.find(Wrapper)
                .dive().find(MessageDetails);
            expect(messageDetailsElement.html()).toContain('5:');
            expect(messageDetailsElement.html()).not.toContain('17:');
            enzymeWrapper.setProps({
                clockStyle: CLOCK_STYLE_24
            });
            messageDetailsElement = enzymeWrapper.find(Wrapper)
                .dive().find(MessageDetails);
            expect(messageDetailsElement.html()).toContain('17:');
            expect(messageDetailsElement.html()).not.toContain('5:');
        });
    });
});
