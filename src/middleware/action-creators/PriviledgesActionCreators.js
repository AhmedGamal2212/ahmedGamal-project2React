/*
  Action Creators for ranks
*/
import { networkRequest, Trim } from "../APIs/commonApis";
import {
  SET_RANKS_ERROR,
  SET_SELECTED_RANK,

  ADD_RANK_BEGIN,
  ADD_RANK_SUCCESS,

  EDIT_RANK_BEGIN,
  EDIT_RANK_SUCCESS,

  GET_RANKS_BEGIN,
  GET_RANKS_SUCCESS,

  DELETE_RANK_BEGIN,
  DELETE_RANK_SUCCESS
} from "../actions/PriviledgesActions";
import { ToggleShowForm } from "./utilitiesActionCreators";

export const SetError = (action, error) => ({
  type: action,
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

function validateRank(payload) {
  if (payload === undefined) {
    return "An invalid payload was submited"
  }


  if (payload.rank === undefined || Trim(payload.rank).length === 0) {
    return "name must be supplied"
  }

  if (payload.updated_by === undefined || payload.updated_by <= 0) {
    return "updating user details must be supplied"
  }

  return null
}

export function setRankError(error) {
  return async dispatch => {
    dispatch(SetError(SET_RANKS_ERROR, error))
  }
}

export function setSelectedRank(payload) {
  return async dispatch => {
    dispatch(SuccessfulAction(SET_SELECTED_RANK, payload, ""));
  }
}

export function addRank(payload) {
  return async dispatch => {
    const validationError = validateRank(payload)
    if (validationError !== null) {
      dispatch(setRankError(validationError))
      return
    }

    let url = "add-rank"
    dispatch(BeginAction(ADD_RANK_BEGIN));
    let response = await networkRequest(url, payload, "POST")
    if (response.code === 200) {
      dispatch(SuccessfulAction(ADD_RANK_SUCCESS, response.payload, response.message));
      dispatch(ToggleShowForm(false))
    } else {
      dispatch(setRankError(response.message || response.payload))
    }

  };

}

export function editRank(payload) {
  return async dispatch => {
    const validationError = validateRank(payload)
    if (validationError !== null) {
      dispatch(setRankError(validationError))
      return
    }

    let url = "edit-rank"
    dispatch(BeginAction(EDIT_RANK_BEGIN));
    let response = await networkRequest(url, payload, "POST")
    if (response.code === 200) {
      dispatch(SuccessfulAction(EDIT_RANK_SUCCESS, response.payload, response.message));
      dispatch(ToggleShowForm(false))
    } else {
      dispatch(setRankError(response.message || response.payload))
    }

  };

}

export function getRanks() {
  return async dispatch => {

    let url = "get-ranks"


    dispatch(BeginAction(GET_RANKS_BEGIN));
    let response = await networkRequest(url, null, "GET")
    if (response.code === 200) {
      if (response.payload === null) {
        dispatch(setRankError("There are no results matching the given criteria"))
      } else {
        dispatch(SuccessfulAction(GET_RANKS_SUCCESS, response.payload, response.message));
      }
    } else {
      dispatch(setRankError(response.message || response.payload))
    }

  };

}

export function deleteRank(payload) {
  return async dispatch => {
    const validationError = validateRank(payload)
    if (validationError !== null) {
      dispatch(setRankError(validationError))
      return
    }

    let url = "delete-rank"
    dispatch(BeginAction(DELETE_RANK_BEGIN));
    let response = await networkRequest(url, payload, "DELETE")
    if (response.code === 200) {
      dispatch(SuccessfulAction(DELETE_RANK_SUCCESS, payload, response.message));
    } else {
      dispatch(setRankError(response.message || response.payload))
    }

  };

}
