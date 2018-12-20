const SET_ROOM = 'SET_ROOM';
const defaultRoom = {
    messages: [],
    participants: []
};

const room = (state = defaultRoom, action) => {
    switch(action.type) {

        case SET_ROOM:
            return {
                ...state,
                ...action.roomInfo
            };

        default:
            return state;
    }
};

export default room;