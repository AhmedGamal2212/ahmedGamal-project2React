import {
  LOCATIONS_ERROR,
  ADD_LOCATION_BEGIN,
  ADD_LOCATION_SUCCESS,
  DELETE_LOCATION_BEGIN,
  DELETE_LOCATION_SUCCESS,
  EDIT_LOCATION_BEGIN,
  EDIT_LOCATION_SUCCESS,
  GET_LOCATION_BEGIN,
  GET_LOCATION_SUCCESS,
  GET_LOCATIONS_BEGIN,
  GET_LOCATIONS_SUCCESS,
} from '../actions/locationsActions';
import { networkRequest } from '../APIs/commonApis';


/**
 * Beginning an action
 * @param action
 * @returns {{type}}
 * @constructor
 */
export const BeginAction = (action) => ({
  type: action
});

/**
 * Successful action
 * @param action
 * @param payload
 * @param message
 * @returns {{payload, type, message}}
 * @constructor
 */
export const SuccessfulAction = (action, payload, message) => ({
  type: action,
  payload,
  message
});

/**
 * Set Establishment Error
 * @param message
 * @returns {{payload, type: string}}
 */
export const setLocationsError = (message) => ({
  type: LOCATIONS_ERROR,
  payload: message
});

function validateLocation(payload = null) {
  if (payload.region === null || payload.region === undefined || payload.region === "") {
    return "Region name must be supplied"
  }

  return null
}

export function setResponseMessage(message) {
  return async dispatch => {
    dispatch(setLocationsError(LOCATIONS_ERROR, message))
  }
}

export function addLocation(payload = null) {
  return async dispatch => {
    const validationError = validateLocation(payload)
    if (validationError !== null) {
      dispatch(setLocationsError(LOCATIONS_ERROR, validationError))
      return
    }

    let url = "add-location"

    dispatch(BeginAction(ADD_LOCATION_BEGIN));
    let response = await networkRequest(url, payload, "POST")
    if (response.code === 200) {
      dispatch(SuccessfulAction(ADD_LOCATION_SUCCESS, response.payload, response.message));
    } else {
      dispatch(setLocationsError(LOCATIONS_ERROR, response.message || response.payload))
    }

  };
}


export function updateLocation(payload = null) {
  return async dispatch => {
    const validationError = validateLocation(payload)
    if (validationError !== null) {
      dispatch(setLocationsError(LOCATIONS_ERROR, validationError))
      return
    }

    let url = "update-location"

    dispatch(BeginAction(EDIT_LOCATION_BEGIN));
    let response = await networkRequest(url, payload, "POST")
    if (response.code === 200) {
      dispatch(SuccessfulAction(EDIT_LOCATION_SUCCESS, response.payload, response.message));
    } else {
      dispatch(setLocationsError(LOCATIONS_ERROR, response.message || response.payload))
    }

  };
}

export function deleteLocation(payload = null) {
  return async dispatch => {
    const validationError = validateLocation(payload)
    if (validationError !== null) {
      dispatch(setLocationsError(LOCATIONS_ERROR, validationError))
      return
    }

    let url = "delete-location"

    dispatch(BeginAction(DELETE_LOCATION_BEGIN));
    let response = await networkRequest(url, payload, "DELETE")
    if (response.code === 200) {
      dispatch(SuccessfulAction(DELETE_LOCATION_SUCCESS, payload, response.message));
    } else {
      dispatch(setLocationsError(LOCATIONS_ERROR, response.message || response.payload))
    }

  };
}

export function getLocations(parameters = {}) {
  return async dispatch => {

    let url = "get-locations?true=true"
    for (let [key, value] of Object.entries(parameters)) {
      url += "&" + key + "=" + value
    }

    dispatch(BeginAction(GET_LOCATIONS_BEGIN));
    let response = await networkRequest(url, null, "GET")
    if (response.code === 200) {
      dispatch(SuccessfulAction(GET_LOCATIONS_SUCCESS, response.payload, response.message));
    } else {
      dispatch(setLocationsError(LOCATIONS_ERROR, response.message || response.payload))
    }

  };

}

export function getLocation(groupID = null) {
  return async dispatch => {

    let url = "get-location?&locationID=" + groupID

    dispatch(BeginAction(GET_LOCATION_BEGIN));
    let response = await networkRequest(url, null, "GET")

    if (response.code === 200) {
      dispatch(SuccessfulAction(GET_LOCATION_SUCCESS, response.payload, response.message));
    } else {
      dispatch(setLocationsError(LOCATIONS_ERROR, response.message || response.payload))
    }

  };

}


