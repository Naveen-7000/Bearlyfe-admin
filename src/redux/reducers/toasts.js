import { ADD_TOAST, EMPTY_TOASTS } from "../actions/types";

const initState = {
    toasts: [],
};

const toastsReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_TOAST:
            return {
                ...state,
                toasts: [action.payload],
            };
        case EMPTY_TOASTS:
            return {
                ...state,
                toasts: []
            }
        default:
            return state;
    }
};

export default toastsReducer;