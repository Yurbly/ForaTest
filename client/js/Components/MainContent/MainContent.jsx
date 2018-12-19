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
        })
});

const MainContent = (props) => {

    // getAll().then((request) => {
    //     props.uploadTodos(request.data)
    // }).catch((err) => console.log(err));
    props.uploadMessages([
        {
            name: 'Drankel',
            date: new Date(),
            text: 'AAAAAAAAAAAAA!'
        },
        {
            name: 'Shrankel',
            date: new Date(),
            text: 'OOOOOOOOOO!'
        }
    ]);

    return (
        <div className={styles.mainContent}>
            <ChatRoom/>
        </div>
    );
};

export default connect(() => ({}),mapDispatchToProps)(MainContent);