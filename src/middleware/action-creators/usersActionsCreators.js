import { networkRequest, numberWithCommas, storeUserData } from "../APIs/commonApis"
import {
  ACTIVATE_USER_BEGIN,
  ACTIVATE_USER_SUCCESS,
  ADD_USER_BEGIN, ADD_USER_SUCCESS,
  COMPLETE_RECOVER_USER_BEGIN,
  COMPLETE_RECOVER_USER_SUCCESS,
  DEACTIVATE_USER_BEGIN,
  DEACTIVATE_USER_SUCCESS,
  DELETE_USER_BEGIN, DELETE_USER_SUCCESS,
  EDIT_USER_BEGIN, EDIT_USER_SUCCESS,
  GET_MORE_USERS_BEGIN, GET_MORE_USERS_SUCCESS,
  GET_USERS_BEGIN, GET_USERS_SUCCESS,
  GET_USER_BEGIN,
  GET_USER_PRIVILEGES_BEGIN, GET_USER_PRIVILEGES_SUCCESS,
  GET_USER_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_BEGIN,
  LOGOUT_USER_SUCCESS,
  MANUAL_ALLOCATION_BEGIN,
  MANUAL_ALLOCATION_SUCCESS,
  RECOVER_USER_BEGIN,
  RECOVER_USER_SUCCESS,
  RESEND_ACTIVATION_BEGIN,
  RESEND_ACTIVATION_SUCCESS,
  SET_USER_ERROR,
  UPDATE_USER_STATUS_BEGIN, UPDATE_USER_STATUS_SUCCESS
} from "../actions/usersActions"


export const setUserError = (error) => ({
  type: SET_USER_ERROR,
  payload: error
})

export const BeginAction = (action) => ({
  type: action
})

export const SuccessfulAction = (action, payload, message) => ({
  type: action,
  payload: payload,
  message: message
})

export const SetCurrentUser = (payload) => ({
  type: "SET_CURRENT_USER",
  payload: payload,
})

export function addUser(payload) {

  return async dispatch => {

    if (payload === undefined) {
      dispatch(setUserError("Provide user details"));
      return
    }

    let url = "add-system-user"
    dispatch(BeginAction(ADD_USER_BEGIN));
    let response = await networkRequest(url, payload, "POST")
    if (response.code === 200) {
      dispatch(SuccessfulAction(ADD_USER_SUCCESS, response.payload, response.message));
    } else {
      dispatch(setUserError(response.message || response.payload))
    }

  };
};

export function login(payload) {
  return async dispatch => {

    if (payload.email === null || payload.email === undefined) {
      dispatch(setUserError("Fill Email"));
      return
    }

    if (payload.password === null || payload.password === undefined) {
      dispatch(setUserError("Fill password"));
      return
    }

    let url = "system-user-login"
    dispatch(BeginAction(LOGIN_USER_BEGIN));
    let response = await networkRequest(url, payload, "POST")

    if (response.code === 200) {
      storeUserData(response.payload.ID);
      dispatch(SuccessfulAction(LOGIN_USER_SUCCESS, response.payload, response.message));
    } else {
      dispatch(setUserError(response.message || response.payload))
    }

  };

}

export function logout(payload) {
  return async dispatch => {
    payload.app_push_id = " "

    let url = "update-system-user"

    dispatch(BeginAction(LOGOUT_USER_BEGIN));
    let response = await networkRequest(url, payload, "POST")
    dispatch(SuccessfulAction(LOGOUT_USER_SUCCESS, response.payload, response.message)); //Logging user out regardless of the response!
  };
};


export function recoverUser(payload) {
  return async dispatch => {

    let url = "recover-system-user"

    dispatch(BeginAction(RECOVER_USER_BEGIN));
    let response = await networkRequest(url, payload, "POST")

    if (response.code === 200) {
      dispatch(SuccessfulAction(RECOVER_USER_SUCCESS, response.payload, response.message)); //Logging user out regardless of the response!
    } else {
      dispatch(setUserError(response.message || response.payload))
    }
  };
}


export function resendActivationCode(payload) {
  return async dispatch => {

    let url = "resend-system-user-otp"

    dispatch(BeginAction(RESEND_ACTIVATION_BEGIN));
    let response = await networkRequest(url, payload, "POST")

    if (response.code === 200) {
      dispatch(SuccessfulAction(RESEND_ACTIVATION_SUCCESS, response.payload, response.message)); //Logging user out regardless of the response!
    } else {
      dispatch(setUserError(response.message || response.payload))
    }
  };
}


export function completeRecoverUser(payload) {
  return async dispatch => {

    let url = "complete-system-user-recovery"

    dispatch(BeginAction(COMPLETE_RECOVER_USER_BEGIN));
    let response = await networkRequest(url, payload, "POST")

    if (response.code === 200) {
      dispatch(SuccessfulAction(COMPLETE_RECOVER_USER_SUCCESS, response.payload, response.message)); //Logging user out regardless of the response!
    } else {
      dispatch(setUserError(response.message || response.payload))
    }
  };
}


export function manualAllocation(payload) {
  return async dispatch => {

    // if (payload.email === null || payload.email === undefined) {
    //   dispatch(setUserError("Fill Email"));
    //   return
    // }

    // if (payload.password === null || payload.password === undefined) {
    //   dispatch(setUserError("Fill password"));
    //   return
    // }

    const url = "settle-content-creator";
    dispatch(BeginAction(MANUAL_ALLOCATION_BEGIN));
    let response = await networkRequest(url, payload, "POST")

    if (response.code === 200) {
      window.alert(`The allocation of TZS ${numberWithCommas(payload.amount_settled)} was successful`);
      dispatch(SuccessfulAction(MANUAL_ALLOCATION_SUCCESS, payload, response.message));
    } else {
      dispatch(setUserError(response.message || response.payload))
    }

  };

}

export function getUserPrivileges() {
  return async dispatch => {

    const response = await networkRequest("get-ranks", null, "GET");
    dispatch(BeginAction(GET_USER_PRIVILEGES_BEGIN));

    if (response.code === 200) {
      dispatch(SuccessfulAction(GET_USER_PRIVILEGES_SUCCESS, response.payload, response.message));
    } else {
      dispatch(setUserError(response.message || response.payload))
    }
  };
}

export function editUser(payload) {

  return async dispatch => {
    if (payload === undefined) {
      dispatch(setUserError("Provide user details"));
      return
    }

    let url = "update-system-user"
    dispatch(BeginAction(EDIT_USER_BEGIN));
    let response = await networkRequest(url, payload, "POST")
    if (response.code === 200) {
      dispatch(SuccessfulAction(EDIT_USER_SUCCESS, response.payload, response.message));
    } else {
      dispatch(setUserError(response.message || response.payload))
    }

  };
}

export function changeUserTypeStatus(payload) {

  return async dispatch => {
    if (payload === undefined) {
      dispatch(setUserError("Provide user details"));
      return
    }

    let url = "change-user-type-status"
    dispatch(BeginAction(UPDATE_USER_STATUS_BEGIN));
    let response = await networkRequest(url, payload, "POST")
    if (response.code === 200) {
      dispatch(SuccessfulAction(UPDATE_USER_STATUS_SUCCESS, response.payload, response.message));
    } else {
      dispatch(setUserError(response.message || response.payload))
    }

  };
};

export function getUsers(parameters = {}, append = false) {
  return async dispatch => {

    let url = "get-system-users?true=true"
    for (let [key, value] of Object.entries(parameters)) {
      url += "&" + key + "=" + value
    }

    let response = null
    switch (append) {
      case true:
        dispatch(BeginAction(GET_MORE_USERS_BEGIN));
        response = await networkRequest(url, null, "GET");
        if (response.code === 200) {
          dispatch(SuccessfulAction(GET_MORE_USERS_SUCCESS, response.payload, response.message));
        } else {
          dispatch(setUserError(response.message || response.payload))
        }

        break
      case false:
        dispatch(BeginAction(GET_USERS_BEGIN));
        response = await networkRequest(url, null, "GET");
        if (response.code === 200) {
          dispatch(SuccessfulAction(GET_USERS_SUCCESS, response.payload, response.message));
        } else {
          dispatch(setUserError(response.message || response.payload))
        }

        break
      default:
    }

  };

}

export function getUser(parameters = null) {
  return async dispatch => {

    let url = "get-system-user?true=true";

    for (let [key, value] of Object.entries(parameters)) {
      url += "&" + key + "=" + value
    }

    dispatch(BeginAction(GET_USER_BEGIN));
    let response = await networkRequest(url, null, "GET");

    if (response.code === 200) {
      dispatch(SuccessfulAction(GET_USER_SUCCESS, response.payload, response.message)); // Regardless of user status user exists and wll be used in the following steps

    } else {
      dispatch(setUserError(response.message || response.payload));
    }
  };

}


export function activateUser(payload) {

  return async dispatch => {
    if (payload.ID === undefined) {
      dispatch(setUserError("ID must be supplied"))
      return
    }

    let url = "re-activate-system-user";
    dispatch(BeginAction(ACTIVATE_USER_BEGIN));
    let response = await networkRequest(url, payload, "POST")
    if (response.code === 200) {
      dispatch(SuccessfulAction(ACTIVATE_USER_SUCCESS, payload, response.message));
    } else {
      dispatch(setUserError(response.message || response.payload))
    }

  };
}


export function deactivateUser(payload) {

  return async dispatch => {
    if (payload.ID === undefined) {
      dispatch(setUserError("ID must be supplied"))
      return
    }

    let url = "deactivate-system-user";
    dispatch(BeginAction(DEACTIVATE_USER_BEGIN));
    let response = await networkRequest(url, payload, "POST")
    if (response.code === 200) {
      dispatch(SuccessfulAction(DEACTIVATE_USER_SUCCESS, payload, response.message));
    } else {
      dispatch(setUserError(response.message || response.payload))
    }

  };
}


export function deleteUser(payload) {

  return async dispatch => {
    if (payload.ID === undefined) {
      dispatch(setUserError("ID must be supplied"))
      return
    }

    let url = "delete-system-user"
    dispatch(BeginAction(DELETE_USER_BEGIN));
    let response = await networkRequest(url, payload, "DELETE")
    if (response.code === 200) {
      dispatch(SuccessfulAction(DELETE_USER_SUCCESS, payload, response.message));
    } else {
      dispatch(setUserError(response.message || response.payload))
    }

  };
}

