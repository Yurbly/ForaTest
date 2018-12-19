import * as React from 'react';
import {connect} from 'react-redux';
import Message from './Message/Message';
const styles = require('./MessageContainer.less');


export const mapStateToProps = (state) => ({
    messages: state.messages
});


class MessageContainer extends React.PureComponent{


    render() {
        return (
            <div className={styles.mainContent}>
                {
                    this.props.messages.messages ?
                    this.props.messages.messages.map((message) =>
                        <div key={message.date + message.text} className={styles.messageWrapper}>
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