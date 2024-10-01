import {
    ADD_SALE_BEGIN, ADD_SALE_SUCCESS,
    DELETE_SALE_BEGIN, DELETE_SALE_SUCCESS,
    EDIT_SALE_BEGIN, EDIT_SALE_SUCCESS,
    GET_MORE_SALES_BEGIN, GET_MORE_SALES_SUCCESS,
    GET_SALES_BEGIN, GET_SALES_SUCCESS,
    GET_SALE_BEGIN, GET_SALE_SUCCESS,
    SET_SALE_ERROR
} from "../actions/salesActions";
import { networkRequest } from "../APIs/commonApis";

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
 * Set community Error
 * @param message
 * @returns {{payload, type: string}}
 */
export const setSalesError = (message) => ({
    type: SET_SALE_ERROR,
    payload: message
});

/**
 * Adding a specific sale
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function addSaleRecord(payload = {}) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setSalesError('Invalid payload was submitted'));
            return;
        }
        let url = 'add-purchase';

        dispatch(BeginAction(ADD_SALE_BEGIN));
        const response = await networkRequest(url, payload, 'POST');
        if (response.code === 200) {
            dispatch(SuccessfulAction(ADD_SALE_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setSalesError(response.message || response.payload));
        }
    };
}



/**
 * Delete a specific sale
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function deleteSaleRecord(payload = {}) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setSalesError('Invalid payload was submitted'));
            return;
        }
        let url = 'delete-purchase?true=true';

        dispatch(BeginAction(DELETE_SALE_BEGIN));
        const response = await networkRequest(url, payload, 'POST');
        if (response.code === 200) {
            dispatch(SuccessfulAction(DELETE_SALE_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setSalesError(response.message || response.payload));
        }
    };
}



/**
 * Update a specific sale
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function editSaleRecord(payload = {}) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setSalesError('Invalid payload was submitted'));
            return;
        }
        let url = 'update-purchase';

        dispatch(BeginAction(EDIT_SALE_BEGIN));
        const response = await networkRequest(url, payload, 'POST');
        if (response.code === 200) {
            dispatch(SuccessfulAction(EDIT_SALE_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setSalesError(response.message || response.payload));
        }
    };
}



/**
 * Getting a specific sale
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function getSaleRecord(payload = {}) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setSalesError('Invalid payload was submitted'));
            return;
        }
        let url = 'get-purchase?true=true';

        for (const [key, value] of Object.entries(payload)) {
            url += `&${key}=${value}`;
        }

        dispatch(BeginAction(GET_SALE_BEGIN));
        const response = await networkRequest(url, null, 'GET');
        if (response.code === 200) {
            dispatch(SuccessfulAction(GET_SALE_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setSalesError(response.message || response.payload));
        }
    };
}

/**
 * Getting sales records
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function getSalesRecords(payload = {}, appending = false) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setSalesError('Invalid payload was submitted'));
            return;
        }
        let url = 'get-purchases?true=true';

        for (const [key, value] of Object.entries(payload)) {
            url += `&${key}=${value}`;
        }

        if (appending) {
            dispatch(BeginAction(GET_MORE_SALES_BEGIN));
            const response = await networkRequest(url, null, 'GET');
            if (response.code === 200) {
                dispatch(SuccessfulAction(GET_MORE_SALES_SUCCESS, response.payload, response.message));
            } else {
                dispatch(setSalesError(response.message || response.payload))
            }
        } else {
            dispatch(BeginAction(GET_SALES_BEGIN));
            const response = await networkRequest(url, null, 'GET');
            if (response.code === 200) {
                dispatch(SuccessfulAction(GET_SALES_SUCCESS, response.payload, response.message));
            } else {
                dispatch(setSalesError(response.message || response.payload));
            }
        };
    }
};