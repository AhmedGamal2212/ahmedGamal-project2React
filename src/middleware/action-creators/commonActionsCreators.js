import {
    COMMON_INDICATOR,
    SET_COMMON_USER_ERROR,
    STORE_COMMON_BIDDER,
    STORE_COMMON_USER
} from "../actions/commonActions";

export const setCommonError = (error) =>({
    type : SET_COMMON_USER_ERROR,
    payload : error
})

export const CommonSuccessfulAction = (action,payload,message) =>({
    type : action,
    payload : payload,
    message : message
})

export const storeUserDataAction = (payload) =>({
    type : STORE_COMMON_USER,
    payload : payload
})

export const storeCommonBidAction = (payload) =>({
    type : STORE_COMMON_BIDDER,
    payload : payload
})

export const storeCommonIndicator = (payload) =>({
    type : COMMON_INDICATOR,
    payload : payload
})