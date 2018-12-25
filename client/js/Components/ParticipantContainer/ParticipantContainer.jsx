import * as React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import VideoContainer from '../VideoContainer/VideoContainer';
import styles from './ParticipantContainer.less';
import uuid from 'uuid';

export const mapStateToProps = (state) => ({
    participants: state.room.participants,
    user:state.user
});

class ParticipantContainer extends React.Component{

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.participantContainer}>
                    <h4>Participants:</h4>
                    {
                        this.props.participants.length > 1 ?
                            this.props.participants.slice().filter(participant =>
                                participant !== this.props.user
                            ).map((participant) =>
                            <div
                                key={uuid()}
                                className={styles.user}>
                                {participant}
                            </div>
                            ) :
                            <div className={styles.noUsers}>
                                No other participants
                            </div>
                    }
                </div>
                <VideoContainer/>
            </div>
        );
    }
};

export default withRouter(connect(mapStateToProps)(ParticipantContainer));