import { ERROR, SUCCESS } from "../../extras/constants";
import { removeTokens } from "../../extras/utils";
import { addToast, emptyToasts } from "./toasts";
import { LOGIN_USER, LOGOUT_USER } from "./types";
import axios from "axios";
import { BASE_URL} from "../../extras/constants";

export const loginUser = (loginData) => {
  return function (dispatch) {
    axios
      .post(`${BASE_URL}/admin/login`, loginData)
      .then((response) => {
        // save it in localStorage
        localStorage.setItem("access_token_klutchh_admin", response.data.token);

        // dispatch LOGIN_USER with access_token
        dispatch({
          type: LOGIN_USER,
          payload: response.data.token,
        });
        dispatch(
          addToast({
            kind: SUCCESS,
            msg: "Logged in Successfully!",
          })
        );
      })
      .catch(({ response }) => {
        console.log(response);
        try {
          switch (response.status) {
            case 400:
              //   add a toast
              dispatch(
                addToast({
                  kind: ERROR,
                  msg: "Invalid data",
                })
              );
              break;
            case 401:
              //   add a toast
              dispatch(
                addToast({
                  kind: ERROR,
                  msg: "Invalid credentials!",
                })
              );
              break;
            default:
              // server error
              dispatch(
                addToast({
                  kind: ERROR,
                  msg: "Oops, something went wrong",
                })
              );
              break;
          }
        } catch (e) {
          dispatch(
            addToast({
              kind: ERROR,
              msg: "Couldn't reach the server",
            })
          );
        }
      });
  };
};

export const logoutUser = () => {
  return function (dispatch) {
    // remove stored tokens
    removeTokens();

    // LOGOUT_USER
    dispatch({
      type: LOGOUT_USER,
    });

    // remove all values
    dispatch(emptyToasts());

    // add Toast
    dispatch(
      addToast({
        kind: SUCCESS,
        msg: "You have been logged out!",
      })
    );
  };
};
