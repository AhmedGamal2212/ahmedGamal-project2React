import {COMMON_INDICATOR, STORE_COMMON_BIDDER, STORE_COMMON_USER} from "../actions/commonActions";


const initialState = {
    loggedInUser:null,
    bidder: null,
    page: null
}
export default function commonReducer(state = initialState, action) {
    switch (action.type) {
        case STORE_COMMON_USER:
            return {
                ...state,
                loggedInUser: action.payload,
            }
        case STORE_COMMON_BIDDER:
            return {
                ...state,
                bidder: action.payload,
            }
            case COMMON_INDICATOR:
                return {
                ...state,
                page: action.payload,
            }
        default:
            return state;
    }
}
