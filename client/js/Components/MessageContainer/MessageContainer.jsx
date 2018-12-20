import * as React from 'react';
import {connect} from 'react-redux';
import Message from './Message/Message';
import classNames from 'classNames';
import socketIOClient from "socket.io-client";
import { ENDPOINT} from "../../common/constants";
import { sendMessage } from "../../actionCreators/messages";
import styles from './MessageContainer.less';
import {withRouter} from "react-router-dom";


export const mapStateToProps = (state) => ({
    messages: state.messages,
    user:state.user
});

export const mapDispatchToProps = (dispatch) => ({
    sendMessage: (message) => dispatch(sendMessage(message))
});

const socket = socketIOClient(ENDPOINT);



class MessageContainer extends React.PureComponent{


    render() {

        socket.on('message', (message) => {
            this.props.sendMessage(message);
        });

        return (
            <div className={styles.messageContainer}>
                {
                    this.props.messages.messages ?
                    this.props.messages.messages.map((message) =>
                        <div key={message.date + message.text} className={classNames({[styles.messageWrapper]:true, [styles.right]: this.props.user.name === message.author})}>
                            <Message message={message}/>
                        </div>
                        ) :
                        <div>
                            Loading
                        </div>
                }
            </div>
        );
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageContainer));