import * as React from 'react';
import {Provider} from 'react-redux';
import MainContent from "../MainContent/MainContent";
import configureStore from '../../reducers/configureStore';
import socketIOClient from 'socket.io-client';

const styles = require('./App.less');

const store = configureStore();

class App extends React.PureComponent {

    constructor() {
        super();
        this.state = {
            endpoint: "http://localhost:9001" // this is where we are connecting to with sockets todo setup with config
        }
    }

    send = () => {
        const socket = socketIOClient(this.state.endpoint);
        socket.emit('change color', 'red');
    };


    render() {

    const socket = socketIOClient(this.state.endpoint);

        socket.on('change color', (color) => {
            document.body.style.backgroundColor = color
        });

        return (
            <Provider store={store}>
                <div className={styles.app}>
                    <MainContent/>
                    <button onClick={() => this.send()}>Change Color</button>
                </div>
            </Provider>
        );
    }
}

export default App;