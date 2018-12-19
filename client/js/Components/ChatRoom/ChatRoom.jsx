import * as React from 'react';
import {connect} from 'react-redux';
import styles from './ChatRoom.less';
import Header from '../Header/Header';
import MessageContainer from '../MessageContainer/MessageContainer';
import InputPanel from '../InputPanel/InputPanel';

export const mapDispatchToProps = (dispatch) => ({
    uploadTodos: (todos) =>
        dispatch({
            type: 'GET_ALL',
            todos
        })
});

const ChatRoom = (props) => {

    return (
        <div className={styles.mainContent}>
            <Header />
            <MessageContainer />
            <InputPanel />
        </div>
    );
};

export default connect(() => ({}),mapDispatchToProps)(ChatRoom);