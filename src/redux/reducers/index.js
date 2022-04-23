import { combineReducers } from "redux";
import authReducer from "./auth";
import toastsReducer from "./toasts";

const rootReducer = combineReducers({
    auth: authReducer,
    toasts: toastsReducer,
});

export default rootReducer;
