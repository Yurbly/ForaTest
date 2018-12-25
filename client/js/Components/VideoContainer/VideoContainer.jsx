import * as React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Close from '@material-ui/icons/close';
import {withRouter} from "react-router-dom";
import styles from './VideoContainer.less';

export const mapStateToProps = (state) => ({
    messages: state.room.messages,
    user:state.user
});

class VideoContainer extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            videoOn: false
        }
    }

    startVideo = async () => {
        navigator.mediaDevices.getUserMedia({audio: true, video: true}).then((stream) => {
            this.setState({
                videoOn: true
            });
            document.getElementById('video').srcObject = stream;
        });
    };

    stopVideo = () => {
        document.getElementById('video').srcObject = null;
        this.setState({
            videoOn:false
        })
    };

    render() {
        return (
            <div className={styles.videoContainer}>
                {
                 this.state.videoOn ?

                     <div className={styles.videoWrapper}>
                         <Button variant="contained" onClick={this.stopVideo} width="400">
                             Stop video streaming
                         </Button>
                         <video id="video" autoPlay src={this.videoStream}/>
                     </div>   :

                    <Button variant="contained" onClick={this.startVideo} width="400">
                        Start video streaming
                    </Button>
                }

            </div>
        );
    }
};

export default withRouter(connect(mapStateToProps)(VideoContainer));