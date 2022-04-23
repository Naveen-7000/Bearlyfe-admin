import jwt from "jsonwebtoken";
import axios from "axios";
import { BASE_URL, ERROR, INFO, SUCCESS } from "./constants";
import { addToast } from "../redux/actions/toasts";
import { logoutUser } from "../redux/actions/auth";

// checks if we have a token and it is not expired
export const checkAuth = () => {
  try {
    const access_token = localStorage.getItem("access_token_klutchh_admin");

    if (!access_token) {
      return false;
    }

    // decode the token
    const { exp } = jwt.decode(access_token);

    if (exp < new Date().getTime() / 1000) {
      return false;
    }

    // valid token
    return true;
  } catch (e) {
    return false;
  }
};

export const uploadImage = (file) => {
  return new Promise(function (resolve, reject) {
    const formData = new FormData();
    formData.append("img1", file);

    axios
      .post(`${BASE_URL}/images`, formData)
      .then((res) => {
        resolve(res.data[0].mediaSource);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const onlyActiveMatches = (matches) => {
  let filtered = [];
  matches.forEach((e) => {
    if (e.status === "ACTIVE") filtered.push(e);
  });
  return filtered;
};

export const updateMatchStatus = (status, matches, queryClient, dispatch) => {
  axios
    .post(
      `${BASE_URL}/match`,
      { ...matches, status: status },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then(() => {
      dispatch(
        addToast({
          kind: INFO,
          msg: "Match '" + matches.name + "' marked as closed!",
        })
      );
      queryClient.invalidateQueries("matchesTournamentsList");
    })
    .catch(({ response }) => {
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
                msg: "Invalid Token!",
              })
            );
            //   logout User
            dispatch(logoutUser());
            break;
          default:
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

// gets the token or return null and also makes sure if the token is valid
export const getToken = () => {
  if (checkAuth()) {
    return localStorage.getItem("access_token_klutchh_admin");
  }
  removeTokens();
  return null;
};

// fn to remove tokens
export const removeTokens = () => {
  localStorage.removeItem("access_token_klutchh_admin");
};

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhoneNumber = (mobile) => {
  const re = /^\+?([0-9]{2})\)?[-. ]?([0-9]{10})$/;
  return re.test(String(mobile));
};

export const validateName = (name) => {
  const re = /^[a-zA-Z ]*$/;
  return re.test(String(name));
};

//validate object
export const isValid = (errors) => {
  let valid = true;
  Object.values(errors).forEach((error) => error.length > 0 && (valid = false));
  return valid;
};

// calculate total points
export const totalPoint = (a, b) => {
  return Number(a) + Number(b);
};

//calculate contest
export const calculateContest = (
  dispatch,
  history,
  contest_id,
  queryClient
) => {
  axios
    .post(
      `${BASE_URL}/results/calc`,
      { contest_id },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then((res) => {
      if (res.data.status === "ERROR")
        dispatch(
          addToast({
            kind: ERROR,
            msg: res.data.msg,
          })
        );
      else {
        dispatch(
          addToast({
            kind: SUCCESS,
            msg: "Result Calculated and Awarded!",
          })
        );
      }
      queryClient.invalidateQueries("ContestsTournamentsList");
    })
    .catch(({ response }) => {
      try {
        switch (response.status) {
          case 400:
            //   add a toast
            dispatch(
              addToast({
                kind: ERROR,
                msg: "Invalid Data",
              })
            );
            break;
          case 401:
            //   add a toast
            dispatch(
              addToast({
                kind: ERROR,
                msg: "Invalid Token!",
              })
            );
            //   logout User
            dispatch(logoutUser());
            break;
          default:
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

export const approveWithdrawal = (dispatch, req_id, queryClient) => {
  axios
    .post(
      `${BASE_URL}/payments/requests`,
      {
        req_id,
        status: "COMPLETED",
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then(() => {
      dispatch(
        addToast({
          kind: SUCCESS,
          msg: "Withdrawal Request Approved!",
        })
      );
      queryClient.invalidateQueries("withdrawalList");
    })
    .catch(({ response }) => {
      try {
        switch (response.status) {
          case 400:
            //   add a toast
            dispatch(
              addToast({
                kind: ERROR,
                msg: "Invalid Data",
              })
            );
            break;
          case 401:
            //   add a toast
            dispatch(
              addToast({
                kind: ERROR,
                msg: "Invalid Token!",
              })
            );
            //   logout User
            dispatch(logoutUser());
            break;
          default:
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

//cancel contest
export const cancelContest = (dispatch, history, contest_id, queryClient) => {
  axios
    .post(
      `${BASE_URL}/cancel/contest`,
      { contest_id },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then((response) => {
      console.log(response);
      dispatch(
        addToast({
          kind: response.data.status,
          msg: response.data.msg,
        })
      );
      queryClient.invalidateQueries("ContestsTournamentsList");
    })
    .catch(({ response }) => {
      try {
        switch (response.status) {
          case 400:
            //   add a toast
            dispatch(
              addToast({
                kind: ERROR,
                msg: "Invalid Data",
              })
            );
            break;
          case 401:
            //   add a toast
            dispatch(
              addToast({
                kind: ERROR,
                msg: "Invalid Token!",
              })
            );
            //   logout User
            dispatch(logoutUser());
            break;
          default:
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
