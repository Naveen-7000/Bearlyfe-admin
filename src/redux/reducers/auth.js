import { GET_CURRENT_USER, LOGIN_USER, LOGOUT_USER } from "../actions/types"
import { getToken } from "../../extras/utils"

const initState = {
    access_token: getToken(), // access_token or null
    user: null,
    loggedIn: false,
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                access_token: action.payload,
                loggedIn: true,
            }
        case GET_CURRENT_USER:
            return {
                ...state,
                user: action.payload
            }
        case LOGOUT_USER:
            return {
                ...state,
                access_token: null,
                user: null,
                loggedIn: false,
            }
        default:
            return state
    }
}

export default authReducer