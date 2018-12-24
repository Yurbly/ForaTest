const SET_ROOM = 'SET_ROOM';
const UPLOAD_MESSAGES = 'UPLOAD_MESSAGES';
const ADD_MESSAGE = 'ADD_MESSAGE';
const REFRESH_PARTICIPANTS = 'REFRESH_PARTICIPANTS';
const SET_ROOM_ID = 'SET_ROOM_ID';

const defaultRoom = {
    roomId: '',
    messages: [],
    participants: []
};

const room = (state = defaultRoom, action) => {
    switch(action.type) {

        case SET_ROOM_ID:
            return {
                ...state,
                roomId: action.roomId
            };
        case SET_ROOM:
            return {
                ...state,
                ...action.roomInfo
            };
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.message]
            };
        case REFRESH_PARTICIPANTS:
            return {
                ...state,
                participants: action.participants
            };

        default:
            return state;
    }
};

export default room;