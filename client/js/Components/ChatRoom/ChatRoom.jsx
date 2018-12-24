import * as React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import socketIOClient from "socket.io-client";
import classNames from 'classNames';
import Header from '../Header/Header';
import MessageContainer from '../MessageContainer/MessageContainer';
import InputPanel from '../InputPanel/InputPanel';
import UserContainer from '../ParticipantContainer/ParticipantContainer';
const styles = require('./ChatRoom.less');
import Login from '../Login/Login';


const mapDispatchToProps = (dispatch) => ({
    setRoomId: (roomId) =>
        dispatch({
            type: 'SET_ROOM_ID',
            roomId
        }),
    setRoom: (roomInfo) =>
        dispatch({
            type: 'SET_ROOM',
            roomInfo
        }),
    sendMessage: (message) =>
        dispatch({
            type: 'ADD_MESSAGE',
            message: message
        }),
    refreshParticipants: (participants) =>
        dispatch({
            type: 'REFRESH_PARTICIPANTS',
            participants
        })
});

const mapStateToProps = (state) => ({
    user: state.user,
    roomId: state.room.roomId
});

class ChatRoom extends React.Component {

    constructor(props) {
        super(props);
            const roomId = props.location.search.slice(8);
            props.setRoomId(roomId);
        this.socket = socketIOClient(process.env.API_URL.trim(), {'force new connection': true});
        this.socket.on('connect', () => {
            console.log('connected');
        });
        this.socket.on('joined', (roomInfo) => {
            props.setRoom({...roomInfo, roomId});
        });
        this.socket.on('message', (message) => {
            props.sendMessage(message);
        });
        this.socket.on('participantsRefresh', (participants) => {
            props.refreshParticipants(participants);
        });
    }

    componentDidUpdate = () => {
        if (this.props.roomId && this.props.user) {
            this.socket.emit('join', this.props.roomId, this.props.user);
        }
    };

    render() {
        const isUserAnonymous = !this.props.user || this.props.user === 'Anonymous';
        return (
            <div className={classNames({[styles.loginRoomWrapper]:isUserAnonymous, [styles.chatRoomWrapper]: !isUserAnonymous})}>
            {isUserAnonymous ?
                <Login roomId={this.props.roomId}/> :
                <div className={styles.chatRoom}>
                    <Header />
                    <div className={styles.contentView}>
                        <MessageContainer socket={this.socket} />
                        <UserContainer/>
                    </div>
                    <InputPanel socket={this.socket}/>
                </div>
            }
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatRoom));
