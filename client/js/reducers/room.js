const SET_ROOM = 'SET_ROOM';
const UPLOAD_MESSAGES = 'UPLOAD_MESSAGES';
const ADD_MESSAGE = 'ADD_MESSAGE';

const defaultRoom = {
    roomId: '',
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
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.message]
            };

        default:
            return state;
    }
};

export default room;