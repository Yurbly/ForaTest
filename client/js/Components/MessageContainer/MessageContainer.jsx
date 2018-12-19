import * as React from 'react';
import {connect} from 'react-redux';
import Message from './Message/Message';
import classNames from 'classNames';
import styles from './MessageContainer.less';


export const mapStateToProps = (state) => ({
    messages: state.messages,
    user:state.user
});


class MessageContainer extends React.PureComponent{


    render() {
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

export default connect(mapStateToProps)(MessageContainer);