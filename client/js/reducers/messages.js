const UPLOAD_MESSAGES = 'UPLOAD_MESSAGES';
const ADD_MESSAGE = 'ADD_MESSAGE';

const defaultState = [];

const messages = (state = defaultState, action) => {
    switch(action.type) {
        case UPLOAD_MESSAGES:
            return {
                ...state,
                messages: action.messages
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

export default messages;