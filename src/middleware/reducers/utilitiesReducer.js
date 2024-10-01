import {

  SET_UTILITIES_ERROR,

  ADD_FAQ_BEGIN,
  ADD_FAQ_SUCCESS,

  DELETE_FAQ_BEGIN,
  DELETE_FAQ_SUCCESS,
  EDIT_FAQ_BEGIN,
  EDIT_FAQ_SUCCESS,
  GET_FAQS_BEGIN,
  GET_FAQS_SUCCESS,
} from '../actions/utilitiesActions.js';

const initialState = {
  faqsArray: [],

  utilitiesResponseMessage: null,
  utilitiesResponseSuccess: false,
  utilitiesWaitingForResponse: false,
  utilitiesSmallLoader: false,

  showForm: false
};

export default function utilitiesReducer(state = initialState, action) {
  let tmp = null

  switch (action.type) {
    //User Types
    case SET_UTILITIES_ERROR:
      return {
        ...state,
        utilitiesResponseMessage: null,
        utilitiesResponseSuccess: false,
        utilitiesWaitingForResponse: false,
        utilitiesSmallLoader: false,
      }

    case "TOGGLE_SHOW_FORM":
      return {
        showForm: action.payload
      };

    case ADD_FAQ_BEGIN:
      return {
        ...state,
        utilitiesResponseMessage: null,
        utilitiesResponseSuccess: false,
        utilitiesSmallLoader: true
      }

    case ADD_FAQ_SUCCESS:
      tmp = state.faqsArray.slice();
      tmp = tmp.concat(action.payload);

      return {
        ...state,
        faqsArray: tmp,
        utilitiesResponseMessage: action.message,
        utilitiesResponseSuccess: true,
        utilitiesSmallLoader: false
      }

    case DELETE_FAQ_BEGIN:
      return {
        ...state,
        utilitiesResponseMessage: null,
        utilitiesResponseSuccess: false,
        utilitiesSmallLoader: true
      }

    case DELETE_FAQ_SUCCESS:
      tmp = state.faqsArray.slice();
      for (let x = 0; x < tmp.length; x++) {
        if (tmp[x].ID === action.payload.ID) {
          tmp.splice(x, 1)
          break
        }
      }
      return {
        ...state,
        faqsArray: tmp,
        utilitiesResponseMessage: action.message,
        utilitiesResponseSuccess: true,
        utilitiesSmallLoader: false
      }

    case EDIT_FAQ_BEGIN:
      return {
        ...state,
        utilitiesResponseMessage: null,
        utilitiesResponseSuccess: false,
        utilitiesSmallLoader: true
      }

    case EDIT_FAQ_SUCCESS:
      tmp = state.faqsArray.slice();
      for (let x = 0; x < tmp.length; x++) {
        if (tmp[x].ID === action.payload.ID) {
          tmp[x] = action.payload;
          break;
        }
      }
      return {
        ...state,
        faqsArray: tmp,
        utilitiesResponseMessage: action.message,
        utilitiesResponseSuccess: true,
        utilitiesSmallLoader: false
      }

    case GET_FAQS_BEGIN:
      return {
        ...state,
        faqsArray: [],
        utilitiesResponseMessage: null,
        utilitiesResponseSuccess: false,
        utilitiesWaitingForResponse: true
      }

    case GET_FAQS_SUCCESS:
      return {
        ...state,
        faqsArray: action.payload,
        utilitiesResponseMessage: action.message,
        utilitiesResponseSuccess: true,
        utilitiesWaitingForResponse: false
      }

    default:
      return state;
  }

}