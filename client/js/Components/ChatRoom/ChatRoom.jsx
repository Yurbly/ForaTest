import * as React from 'react';
import {connect} from 'react-redux';
import {getAll} from '../../api/Api';
const styles = require('./ChatRoom.less');


export const mapDispatchToProps = (dispatch) => ({
    uploadTodos: (todos) =>
        dispatch({
            type: 'GET_ALL',
            todos
        })
});

const ChatRoom = (props) => {

    getAll().then((request) => {
        props.uploadTodos(request.data)
    }).catch((err) => console.log(err));


    return (
        <div className={styles.mainContent}>
            Test
        </div>
    );
};

export default connect(() => ({}),mapDispatchToProps)(ChatRoom);