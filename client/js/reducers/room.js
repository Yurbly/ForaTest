const SET_ROOM_NAME = 'SET_ROOM_NAME';
const defaultRoomName = {roomName: 'ChatRoom'};

const room = (state = defaultRoomName, action) => {
    switch(action.type) {

        case SET_ROOM_NAME:
            return {
                ...state,
                roomName: action.roomName
            };

        default:
            return state;
    }
};

export default room;