import * as React from 'react';
import {connect} from 'react-redux';
import Message from './Message/Message';
import classNames from 'classNames';
import styles from './MessageContainer.less';
import {withRouter} from "react-router-dom";


export const mapStateToProps = (state) => ({
    messages: state.room.messages,
    user:state.room.user
});

class MessageContainer extends React.Component{

    render() {
        return (
            <div className={styles.messageContainer}>
                {
                    this.props.messages.length > 0 ?
                        this.props.messages.slice().sort((message) => {
                            return new Date(message.date) - new Date(message.date);
                    }).map((message) =>
                        <div
                            key={message.date + message.text}
                            className={classNames({[styles.messageWrapper]:true, [styles.right]: this.props.user === message.author})}>
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

export default withRouter(connect(mapStateToProps)(MessageContainer));