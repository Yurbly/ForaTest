import * as React from 'react';
import {connect} from 'react-redux';
import {getAll} from '../../api/Api';
import ChatRoom from '../ChatRoom/ChatRoom'
const styles = require('./MainContent.less');


export const mapDispatchToProps = (dispatch) => ({
    uploadMessages: (messages) =>
        dispatch({
            type: 'UPLOAD_MESSAGES',
            messages
        }),
    setUser: (userName) =>
        dispatch({
            type: 'SET_USER',
            userName
        })
});

const MainContent = (props) => {

    // getAll().then((request) => {
    //     props.uploadTodos(request.data)
    // }).catch((err) => console.log(err));
    // props.setUser()

    props.uploadMessages([
        {
            author: 'Drankel',
            date: new Date(),
            text: 'AAAAAAAAAAAAA!'
        },
        {
            author: 'Shrankel',
            date: new Date(),
            text: 'OOOOOOOOOO!'
        },
        {
            author: 'Anonymous',
            date: new Date(),
            text: 'Everything is under control!'
        }
    ]);

    return (
        <div className={styles.mainContent}>
            <ChatRoom/>
        </div>
    );
};

export default connect(() => ({}),mapDispatchToProps)(MainContent);