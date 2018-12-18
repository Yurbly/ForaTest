import * as React from 'react';
import {connect} from 'react-redux';
import {getAll} from '../../api/Api';
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
    props.uploadMessages([{message: 'AAAAAAAAAAAAA!'}]);

    return (
        <div className={styles.mainContent}>
            Test
        </div>
    );
};

export default connect(() => ({}),mapDispatchToProps)(MainContent);