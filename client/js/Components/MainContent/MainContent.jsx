import * as React from 'react';
import {connect} from 'react-redux';
import {getAll} from '../../api/Api';
import ChatRoom from '../ChatRoom/ChatRoom';
import Login from '../Login/Login';
const styles = require('./MainContent.less');


const mapDispatchToProps = (dispatch) => ({
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

const mapStateToProps = (state) => ({
    userName: state.user.name
});

class MainContent extends React.Component {

    // getAll().then((request) => {
    //     props.uploadTodos(request.data)
    // }).catch((err) => console.log(err));
    // props.setUser()
    // constructor(props) {
    //     super(props);
    // }
    render() {

        this.props.uploadMessages([
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
                {this.props.userName !== 'Anonymous' ? <ChatRoom /> : <Login/>}
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MainContent);
