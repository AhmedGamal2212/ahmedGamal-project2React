import {
  ACTIVATE_USER_BEGIN,
  ACTIVATE_USER_SUCCESS,
  ADD_USER_BEGIN,
  ADD_USER_SUCCESS,
  COMPLETE_RECOVER_USER_BEGIN,
  COMPLETE_RECOVER_USER_SUCCESS,
  DEACTIVATE_USER_BEGIN,
  DEACTIVATE_USER_SUCCESS,
  DELETE_USER_BEGIN,
  DELETE_USER_SUCCESS,
  EDIT_USER_BEGIN,
  EDIT_USER_SUCCESS,
  GET_MORE_USERS_BEGIN,
  GET_MORE_USERS_SUCCESS,
  GET_USERS_BEGIN,
  GET_USERS_SUCCESS,
  GET_USER_BEGIN,
  GET_USER_PRIVILEGES_BEGIN,
  GET_USER_PRIVILEGES_SUCCESS,
  GET_USER_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  MANUAL_ALLOCATION_BEGIN,
  MANUAL_ALLOCATION_SUCCESS,
  RECOVER_USER_BEGIN,
  RECOVER_USER_SUCCESS,
  RESEND_ACTIVATION_BEGIN,
  RESEND_ACTIVATION_SUCCESS,
  SET_USER_ERROR,
  UPDATE_USER_STATUS_BEGIN,
  UPDATE_USER_STATUS_SUCCESS

} from '../actions/usersActions.js';

const initialState = {
  users: [],
  lastUserPullCount: 0,

  loggedInUser: null,
  currentUser: null,

  userResponseMessage: null,
  userResponseSuccess: false,

  userWaitingForResponse: false,
  usersLoader: false,

  usersSmallLoader: false,

  userPrivileges: []
};

export default function usersReducer(state = initialState, action) {
  let tmp = null

  switch (action.type) {
    case SET_USER_ERROR:
      return {
        ...state,
        userResponseMessage: action.payload,
        userResponseSuccess: false,
        userWaitingForResponse: false,
        usersSmallLoader: false,
        usersLoader: false
      }

    case LOGIN_USER_BEGIN:
      return {
        ...state,
        loggedInUser: null,
        userResponseMessage: null,
        userResponseSuccess: false,
        userWaitingForResponse: true
      }

    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      }

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loggedInUser: action.payload,
        userResponseMessage: action.message,
        userResponseSuccess: true,
        userWaitingForResponse: false
      }

    case ADD_USER_BEGIN:
      return {
        ...state,
        userResponseMessage: null,
        userResponseSuccess: false,
        usersSmallLoader: true
      }

    case ADD_USER_SUCCESS:
      tmp = state.users.slice()
      tmp.push(action.payload)

      return {
        ...state,
        users: tmp,
        userResponseMessage: action.message,
        userResponseSuccess: true,
        usersSmallLoader: false
      }

    case RECOVER_USER_BEGIN:
      return {
        currentUser: null,
        loggedInUser: null,
        userResponseMessage: null,
        showOtpForm: false,
        userResponseSuccess: false,
        userWaitingForResponse: true
      };

    case RECOVER_USER_SUCCESS:
      return {
        currentUser: action.payload,
        loggedInUser: null,
        showOtpForm: true,
        userResponseMessage: action.message,
        userResponseSuccess: true,
        userWaitingForResponse: false
      };

    case RESEND_ACTIVATION_BEGIN:
      return {
        loggedInUser: null,
        showOtpForm: true,
        userResponseMessage: null,
        userResponseSuccess: false,
        userWaitingForResponse: true
      };

    case RESEND_ACTIVATION_SUCCESS:
      return {
        currentUser: action.payload,
        loggedInUser: null,
        showOtpForm: true,
        userResponseMessage: action.message,
        userResponseSuccess: true,
        userWaitingForResponse: false
      };

    case COMPLETE_RECOVER_USER_BEGIN:
      return {
        loggedInUser: null,
        showOtpForm: true,
        userResponseMessage: null,
        userResponseSuccess: false,
        userWaitingForResponse: true
      };

    case COMPLETE_RECOVER_USER_SUCCESS:
      return {
        currentUser: action.payload,
        loggedInUser: null,
        showOtpForm: false,
        userResponseMessage: action.message,
        userResponseSuccess: true,
        userWaitingForResponse: false
      };

    case EDIT_USER_BEGIN:
      return {
        ...state,
        userResponseMessage: null,
        userResponseSuccess: false,
        usersSmallLoader: true
      }

    case EDIT_USER_SUCCESS:
      tmp = state.users.slice()
      for (let x = 0; x < tmp.length; x++) {
        if (tmp[x].ID === action.payload.ID) {
          tmp[x] = action.payload
          break
        }
      }

      return {
        ...state,
        userResponseMessage: action.message,
        users: tmp,
        currentUser: action.payload,
        userResponseSuccess: true,
        usersSmallLoader: false
      }
    
    case MANUAL_ALLOCATION_BEGIN:
      return {
        ...state,
        userResponseMessage: null,
        userResponseSuccess: false,
        usersSmallLoader: true
      }

    case MANUAL_ALLOCATION_SUCCESS:
      tmp = state.users.slice()
      for (let x = 0; x < tmp.length; x++) {
        if (tmp[x].ID === action.payload.ID) {
          tmp[x].amount_settled = Number(tmp[x].amount_settled) + Number(action.payload.amount_settled)
          break
        }
      }

      return {
        ...state,
        userResponseMessage: action.message,
        users: tmp,
        currentUser: action.payload,
        userResponseSuccess: true,
        usersSmallLoader: false
      }

    case UPDATE_USER_STATUS_BEGIN:
      return {
        ...state,
        userResponseMessage: null,
        userResponseSuccess: false,
        usersSmallLoader: true
      }

    case UPDATE_USER_STATUS_SUCCESS:
      tmp = state.users.slice()
      for (let x = 0; x < tmp.length; x++) {
        if (tmp[x].ID === action.payload.ID) {
          tmp[x] = action.payload
          break
        }
      }

      return {
        ...state,
        userResponseMessage: action.message,
        users: tmp,
        userResponseSuccess: true,
        usersSmallLoader: false
      }

    case ACTIVATE_USER_BEGIN:
      return {
        ...state,
        userResponseMessage: null,
        userResponseSuccess: false,
        usersSmallLoader: true
      }

    case ACTIVATE_USER_SUCCESS:
      tmp = state.users.slice()
      for (let x = 0; x < tmp.length; x++) {
        if (tmp[x].ID === action.payload.ID) {
          tmp[x] = action.payload
          break
        }
      }

      return {
        ...state,
        userResponseMessage: action.message,
        currentUser: action.payload,
        users: tmp,
        userResponseSuccess: true,
        usersSmallLoader: false
      }

    case DEACTIVATE_USER_BEGIN:
      return {
        ...state,
        userResponseMessage: null,
        userResponseSuccess: false,
        usersSmallLoader: true
      }

    case DEACTIVATE_USER_SUCCESS:
      tmp = state.users.slice();
      for (let x = 0; x < tmp.length; x++) {
        if (tmp[x].ID === action.payload.ID) {
          tmp[x] = action.payload;
          break
        }
      }

      return {
        ...state,
        userResponseMessage: action.message,
        users: tmp,
        currentUser: action.payload,
        userResponseSuccess: true,
        usersSmallLoader: false
      }

    case GET_USER_PRIVILEGES_BEGIN:
      return {
        ...state,
        userPrivileges: [],
        userResponseMessage: null,
        userResponseSuccess: false,
        userWaitingForResponse: true
      }

    case GET_USER_PRIVILEGES_SUCCESS:
      return {
        ...state,
        userPrivileges: action.payload,
        userResponseMessage: action.message,
        userResponseSuccess: true,
        userWaitingForResponse: false
      }

    case GET_USER_BEGIN:
      return {
        ...state,
        currentUser: null,
        userResponseMessage: null,
        userResponseSuccess: false,
        userWaitingForResponse: true
      }

    case GET_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        userResponseMessage: action.message,
        userResponseSuccess: true,
        userWaitingForResponse: false
      }

    case GET_USERS_BEGIN:
      return {
        ...state,
        users: [],
        lastUsersPullCount: 0,
        userResponseMessage: null,
        currentUser: null,
        userResponseSuccess: false,
        userWaitingForResponse: true

      }

    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        userResponseMessage: action.message,
        lastUsersPullCount: action.payload.length,
        userResponseSuccess: true,
        userWaitingForResponse: false
      }

    case GET_MORE_USERS_BEGIN:
      return {
        ...state,
        userResponseMessage: null,
        userResponseSuccess: false,
        usersLoader: true

      }

    case GET_MORE_USERS_SUCCESS:
      tmp = state.users.slice();
      tmp = tmp.concat(action.payload);
      return {
        ...state,
        users: tmp,
        userResponseMessage: action.message,
        lastUsersPullCount: action.payload.length,
        userResponseSuccess: true,
        usersLoader: false
      }

    case DELETE_USER_BEGIN:
      return {
        ...state,
        userResponseMessage: null,
        userResponseSuccess: false,
        usersSmallLoader: true

      }

    case DELETE_USER_SUCCESS:
      tmp = state.users.slice()
      for (let x = 0; x < tmp.length; x++) {
        if (tmp[x].ID === action.payload.ID) {
          tmp.splice(x, 1)
          break
        }
      }

      return {
        ...state,
        userResponseMessage: action.message,
        users: tmp,
        userResponseSuccess: true,
        usersSmallLoader: false
      }


    default:
      return state;
  }

}