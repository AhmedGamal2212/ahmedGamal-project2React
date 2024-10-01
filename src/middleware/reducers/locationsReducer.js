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

const initialState = {
  location: null,
  locations: [],
  locationsResponseMessage: null,
  locationsResponseSuccess: false,
  locationsWaitingForResponse: false
};

export default function locationsReducer(state = initialState, action) {
  let tmp = null;
  switch (action.type) {
    case LOCATIONS_ERROR:
      return {
        ...state,
        locationsResponseMessage: action.message,
        locationsResponseSuccess: false,
        locationsWaitingForResponse: false,
      };

    case ADD_LOCATION_BEGIN:
      return {
        ...state,
        locationsResponseMessage: null,
        locationsResponseSuccess: false,
        locationsWaitingForResponse: true
      };

    case ADD_LOCATION_SUCCESS:
      tmp = state.locations.slice();
      tmp.push(action.payload);
      return {
        ...state,
        location: action.payload,
        locations: tmp,
        locationsResponseMessage: action.message,
        locationsResponseSuccess: true,
        locationsWaitingForResponse: false
      };

    case GET_LOCATION_BEGIN:
      return {
        ...state,
        locationsResponseMessage: null,
        locationsResponseSuccess: false,
        locationsWaitingForResponse: true
      };

    case GET_LOCATION_SUCCESS:
      return {
        ...state,
        location: action.payload,
        locationsResponseMessage: action.message,
        locationsResponseSuccess: true,
        locationsWaitingForResponse: false
      };

    case GET_LOCATIONS_BEGIN:
      return {
        ...state,
        locationsResponseMessage: null,
        locationsResponseSuccess: false,
        locationsWaitingForResponse: true
      };

    case GET_LOCATIONS_SUCCESS:
      return {
        ...state,
        locations: action.payload,
        locationsResponseMessage: action.message,
        locationsResponseSuccess: true,
        locationsWaitingForResponse: false
      };

    case EDIT_LOCATION_BEGIN:
      return {
        ...state,
        locationsResponseMessage: null,
        locationsResponseSuccess: false,
        locationsWaitingForResponse: true
      };

    case EDIT_LOCATION_SUCCESS:
      tmp = state.locations.slice();
      for (let x = 0; x < tmp.length; x++) {
        if (tmp[x].ID === action.payload.ID) {
          tmp[x] = action.payload;
          break;
        }
      }
      return {
        ...state,
        location: action.payload,
        locations: tmp,
        locationsResponseMessage: action.message,
        locationsResponseSuccess: true,
        locationsWaitingForResponse: false
      };

    case DELETE_LOCATION_BEGIN:
      return {
        ...state,
        locationsResponseMessage: null,
        locationsResponseSuccess: false,
        locationsWaitingForResponse: true
      };

    case DELETE_LOCATION_SUCCESS:
      tmp = state.locations.slice();
      for (let x = 0; x < tmp.length; x++) {
        if (tmp[x].ID === action.payload.ID) {
          tmp.splice(x, 1);
          break;
        }
      }

      return {
        ...state,
        locations: tmp,
        locationsResponseMessage: action.message,
        locationsResponseSuccess: true,
        locationsWaitingForResponse: false
      };


    default:
      return state;
  }

}
