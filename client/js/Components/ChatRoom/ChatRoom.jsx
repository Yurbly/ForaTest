import * as React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import socketIOClient from "socket.io-client";
import {ENDPOINT} from "../../common/constants";
import Header from '../Header/Header';
import MessageContainer from '../MessageContainer/MessageContainer';
import InputPanel from '../InputPanel/InputPanel';
const styles = require('./ChatRoom.less');


const mapDispatchToProps = (dispatch) => ({
    setRoom: (roomInfo) =>
        dispatch({
            type: 'SET_ROOM',
            roomInfo
        })
});

class ChatRoom extends React.Component {

    constructor(props) {
        super(props);
        this.socket = socketIOClient(ENDPOINT, {'force new connection': true});
        this.socket.on('connect', () => {
            this.socket.emit('join', props.location.search.slice(1));
        });
        this.socket.on('joined', (roomInfo) => {
            props.setRoom(roomInfo);
        });
    }

    render() {
        return (
            <div className={styles.chatRoom}>
                <Header />
                <MessageContainer />
                <InputPanel />
            </div>
        );
    }
}

export default withRouter(connect(() => ({}),mapDispatchToProps)(ChatRoom));
