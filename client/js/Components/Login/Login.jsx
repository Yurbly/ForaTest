import * as React from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import socketIOClient from "socket.io-client";
import { ENDPOINT } from "../../common/constants";

import styles from './Login.less';
import {Redirect, withRouter} from "react-router-dom";

const NEW_CHAT_GREETING = 'To create a new chat enter your name and hit \"Enter new chat\"';
const JOIN_CHAT_GREETING = 'To join the chat enter your name and hit \"Join the chat\"';
const ENTER_NEW_CHAT = 'Enter new chat';
const JOIN_THE_CHAT = 'Join the chat';

export const mapDispatchToProps = (dispatch) => ({
    setUser: (user) =>
        dispatch({
            type: 'SET_USER',
            user
        })
});




class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            roomId: false,
            // fromProps: props.params.roomId
        };
        this.socket = socketIOClient(ENDPOINT, {'force new connection': true});
        this.socket.on('connect', () => {
            console.log('Connected');
        });
    }

    handleChange = (event) => {
        this.setState({
            user: event.target.value
        })
    };

    handleEnterChat = () => {
        this.socket.emit('create');
        this.socket.on('created', (roomId) => {
            this.props.setUser(this.state.user);
            this.setState({
                roomId
            })
        });
    };

    render() {
        if (this.state.roomId) {
            return <Redirect to={`/chat/?roomId=${this.state.roomId}`}/>
        }
        return (
                <div className={styles.entrance}>
                    <h2>Welcome to ChatService</h2>
                    <h4>{this.props.location.search.roomId ? JOIN_CHAT_GREETING : NEW_CHAT_GREETING}</h4>
                    <TextField
                        id="outlined-bare"
                        className={styles.textField}
                        margin="normal"
                        variant="outlined"
                        multiline
                        onChange={this.handleChange}
                    />
                    <Button variant="contained" onClick={this.handleEnterChat}>
                        {this.props.location.search.roomId ? JOIN_THE_CHAT : ENTER_NEW_CHAT}
                    </Button>
                </div>
        );
    }
}

export default withRouter(connect(() => ({}),mapDispatchToProps)(Login));