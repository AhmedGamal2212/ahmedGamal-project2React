/*
  Action Creators for utilities, these are parts that are usable accross the portal
  hence can not be tied to one service/entity
*/
import { networkRequest } from "../APIs/commonApis"
import {
  ADD_FAQ_BEGIN,
  ADD_FAQ_SUCCESS,
  DELETE_FAQ_BEGIN,
  DELETE_FAQ_SUCCESS,
  EDIT_FAQ_BEGIN,
  EDIT_FAQ_SUCCESS,
  GET_FAQS_BEGIN,
  GET_FAQS_SUCCESS,
  SET_UTILITIES_ERROR,


} from "../actions/utilitiesActions"

export const setUtilitiesError = (error) => ({
  type: SET_UTILITIES_ERROR,
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

export const ToggleShowForm = (payload) => ({
  type: "TOGGLE_SHOW_FORM",
  payload: payload
});

export function addFaq(payload) {
  return async dispatch => {

    const url = "add-faq"

    dispatch(BeginAction(ADD_FAQ_BEGIN));
    let response = await networkRequest(url, payload, "POST")
    if (response.code === 200) {
      dispatch(SuccessfulAction(ADD_FAQ_SUCCESS, response.payload, response.message));
    } else {
      dispatch(setUtilitiesError(response.message || response.payload))
    }

  };

}

export function deleteFaq(payload) {
  return async dispatch => {
    const url = "delete-faq"

    dispatch(BeginAction(DELETE_FAQ_BEGIN));
    let response = await networkRequest(url, payload, "DELETE")
    if (response.code === 200) {
      dispatch(SuccessfulAction(DELETE_FAQ_SUCCESS, payload, response.message));
    } else {
      dispatch(setUtilitiesError(response.message || response.payload))
    }

  };

}

export function editFaqs(payload) {
  return async dispatch => {
    const url = "update-faq"

    dispatch(BeginAction(EDIT_FAQ_BEGIN));
    let response = await networkRequest(url, payload, "POST")
    if (response.code === 200) {
      window.alert("FAQ has been modified successfully!");
      dispatch(SuccessfulAction(EDIT_FAQ_SUCCESS, response.payload, response.message));
    } else {
      dispatch(setUtilitiesError(response.message || response.payload))
    }

  };

}


export function getFaqs(parameters) {
  return async (dispatch) => {

    let url = "get-faq-entries?true=true";

    for (let [key, value] of Object.entries(parameters)) {
      url += "&" + key + "=" + value
    }

    dispatch(BeginAction(GET_FAQS_BEGIN));
    const response = await networkRequest(url, null, 'GET');

    if (response.code === 200) {
      dispatch(SuccessfulAction(GET_FAQS_SUCCESS, response.payload, response.message));
    } else {
      dispatch(setUtilitiesError(response.message || response.payload));
    }
  }
}
