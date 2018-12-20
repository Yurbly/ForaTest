import * as React from 'react';
import {connect} from 'react-redux';
import Message from './Message/Message';
import classNames from 'classNames';
import { sendMessage } from "../../actionCreators/messages";
import styles from './MessageContainer.less';
import {withRouter} from "react-router-dom";


export const mapStateToProps = (state) => ({
    messages: state.room.messages,
    user:state.room.user
});

export const mapDispatchToProps = (dispatch) => ({
    sendMessage: (message) => dispatch(sendMessage(message))
});




class MessageContainer extends React.PureComponent{


    render() {

        return (
            <div className={styles.messageContainer}>
                {
                    this.props.messages.messages ?
                    this.props.messages.messages.map((message) =>
                        <div
                            key={message.date + message.text}
                            className={classNames({[styles.messageWrapper]:true, [styles.right]: this.props.user.name === message.author})}>
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