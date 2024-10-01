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

} from '../actions/PriviledgesActions';

const initialState = {
  ranks: [],
  selectedRank: null,
  ranksResponseMessage: null,
  ranksResponseSuccess: false,
  ranksWaitingForResponse: false,
};

export default function PriviledgesReducer(state = initialState, action) {

  let tmp = null;

  switch (action.type) {
    case SET_RANKS_ERROR:
      return {
        ...state,
        ranksResponseMessage: action.payload,
        ranksResponseSuccess: false,
        ranksWaitingForResponse: false
      }

    case SET_SELECTED_RANK:
      return {
        ...state,
        selectedRank: action.payload
      }

    case ADD_RANK_BEGIN:
      return {
        ...state,
        ranksResponseMessage: null,
        ranksResponseSuccess: false,
        ranksWaitingForResponse: true
      }

    case ADD_RANK_SUCCESS:
      tmp = state.ranks.slice()
      tmp.push(action.payload)

      return {
        ...state,
        ranks: tmp,
        ranksResponseMessage: action.message,
        ranksResponseSuccess: true,
        ranksWaitingForResponse: false
      }

    case EDIT_RANK_BEGIN:
      return {
        ...state,
        ranksResponseMessage: null,
        ranksResponseSuccess: false,
        ranksWaitingForResponse: true
      }

    case EDIT_RANK_SUCCESS:
      tmp = state.ranks.slice()
      for (let x = 0; x < tmp.length; x++) {
        if (tmp[x].ID === action.payload.ID) {
          tmp[x] = action.payload
          break
        }
      }

      return {
        ...state,
        ranks: tmp,
        selectedRank: action.payload,
        ranksResponseMessage: action.message,
        ranksResponseSuccess: true,
        ranksWaitingForResponse: false
      }

    case GET_RANKS_BEGIN:
      return {
        ...state,
        ranks: [],
        ranksResponseMessage: null,
        ranksResponseSuccess: false,
        ranksWaitingForResponse: true
      }

    case GET_RANKS_SUCCESS:
      return {
        ...state,
        ranks: action.payload,
        ranksResponseMessage: action.message,
        ranksResponseSuccess: true,
        ranksWaitingForResponse: false
      }

    case DELETE_RANK_BEGIN:
      return {
        ...state,
        ranksResponseMessage: null,
        ranksResponseSuccess: false,
        ranksWaitingForResponse: true
      }

    case DELETE_RANK_SUCCESS:
      tmp = state.ranks.slice()
      for (let x = 0; x < tmp.length; x++) {
        if (tmp[x].ID === action.payload.ID) {
          tmp.splice(x, 1)
          break
        }
      }

      return {
        ...state,
        ranks: tmp,
        ranksResponseMessage: action.message,
        ranksResponseSuccess: true,
        ranksWaitingForResponse: false
      }


    default:
      return state;
  }

}