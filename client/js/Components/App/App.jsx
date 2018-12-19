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
            endpoint: "http://localhost:9001",
            color: 'white'
        }
    }

    send = () => {
        const socket = socketIOClient(this.state.endpoint);
        socket.emit('change color', this.state.color);
    };

    setColor = (color) => {
        this.setState({ color })
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
                    <div className={styles.buttons}>
                        <button onClick={() => this.send()}>Change Color</button>
                        <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
                        <button id="red" onClick={() => this.setColor('red')}>Red</button>
                    </div>
                </div>
            </Provider>
        );
    }
}

export default App;