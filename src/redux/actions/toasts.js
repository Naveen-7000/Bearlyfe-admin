import { ADD_TOAST, EMPTY_TOASTS } from "./types"

export const addToast = (toast) => {
    return {
        type: ADD_TOAST,
        payload: toast
    }
}

export const emptyToasts = () => {
    return {
        type: EMPTY_TOASTS
    }
}