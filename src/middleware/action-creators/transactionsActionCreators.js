import {
    GET_MORE_TRANSACTIONS_BEGIN, GET_MORE_TRANSACTIONS_SUCCESS,
    GET_TRANSACTION_BEGIN, GET_TRANSACTION_SUCCESS, GET_TRANSACTIONS_BEGIN, GET_TRANSACTIONS_SUCCESS,
    SET_TRANSACTIONS_ERROR,
    INITIATE_TRANSACTION_BEGIN,
    INITIATE_TRANSACTION_SUCCESS,
    CHARGE_REQUEST_BEGIN,
    CHARGE_REQUEST_SUCCESS
} from "../actions/transactionsActions";
import { networkRequest } from "../APIs/commonApis";

/**
 * Action Creators for Transactions!
 */

export const setTransactionError = (error) => ({
    type: SET_TRANSACTIONS_ERROR,
    payload: error
});


export const clearTransaction = () => ({
    type: "CLEAR_TRANSACTION",
    payload: null, message: null
});


export const BeginAction = (action) => ({
    type: action
});

export const SuccessfulAction = (action, payload, message) => ({
    type: action,
    payload,
    message
});


const validateTransactionPayload = (transaction) => {
    if (transaction.user_id === undefined || Number.isNaN(parseInt(transaction.user_id, 10)) || transaction.user_id <= 0) {
        return 'Please provide user ID';
    }
    if (transaction.video_id === undefined && transaction.course_id === undefined) {
        return transaction.video_id === undefined ? 'Please provide video ID' : 'Please provide course ID';
    }
    if (transaction.amount === undefined || Number.isNaN(parseInt(transaction.amount, 10)) || transaction.amount <= 0) {
        return 'Payment amount must be set';
    }
    if (transaction.currency === undefined || Object.keys(transaction.currency).length === 0) {
        return 'Currency must be set';
    }
    if (transaction.mobile === undefined || Object.keys(transaction.mobile).length === 0) {
        return 'Mobile number must be set';
    }
    if (transaction.channel === undefined || Object.keys(transaction.channel).length === 0) {
        return 'Channel name must be set';
    }
    if (transaction.transaction_type === undefined || Object.keys(transaction.transaction_type).length === 0) {
        return 'Transaction type must be set';
    }

    return null

}


/**
 * Initiate payment transaction
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function initiateTransaction(payload) {
    return async (dispatch) => {
        const validationError = validateTransactionPayload(payload);
        if (validationError !== null) {
            dispatch(setTransactionError(validationError));
            return;
        }

        const url = 'initiate-transaction';
        dispatch(BeginAction(INITIATE_TRANSACTION_BEGIN));
        const response = await networkRequest(url, payload, 'POST');
        if (response.code === 200) {
            dispatch(SuccessfulAction(INITIATE_TRANSACTION_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setTransactionError(response.message || response.payload));
        }
    }
};


/**
 * Charge request transaction
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function chargeRequest(payload) {
    return async (dispatch) => {
        if (payload === null) {
            dispatch(setTransactionError("Invalid payload was submitted!"));
            return;
        }

        const url = 'charge-transaction';
        dispatch(BeginAction(CHARGE_REQUEST_BEGIN));
        const response = await networkRequest(url, payload, 'POST');

        if (response.code === 200) {
            dispatch(SuccessfulAction(CHARGE_REQUEST_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setTransactionError(response.message || response.payload));
        }
    }
};

/**
 * Validate transaction
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function validateTransaction(payload) {
    return async (dispatch) => {
        if (payload === null) {
            dispatch(setTransactionError("Invalid payload was submitted!"));
            return;
        }

        const url = 'validate-transaction';
        dispatch(BeginAction(CHARGE_REQUEST_BEGIN));
        const response = await networkRequest(url, payload, 'POST');

        if (response.code === 200) {
            dispatch(SuccessfulAction(CHARGE_REQUEST_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setTransactionError(response.message || response.payload));
        }
    }
};




/**
 * Getting a specific transaction
 * @param transactionID
 * @returns {(function(*): Promise<void>)|*}
 */
export function getTransaction(transactionID) {
    return async (dispatch) => {
        if (transactionID === undefined) {
            dispatch(setTransactionError('Provide transaction ID'));
            return;
        }
        const url = `get-transaction?transactionID=${transactionID}`;
        dispatch(BeginAction(GET_TRANSACTION_BEGIN));
        const response = await networkRequest(url, null, "GET");
        if (response.code === 200) {
            dispatch(SuccessfulAction(GET_TRANSACTION_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setTransactionError(response.message || response.payload));
        }
    }
}

export function getTransactions(payload = null, appending = false) {
    return async (dispatch) => {
        let url = 'get-transactions?true=true';

        if (payload !== null) {
            for (const [key, value] of Object.entries(payload)) {
                url += `&${key}=${value}`;
            }
        }

        if (appending) {
            dispatch(BeginAction(GET_MORE_TRANSACTIONS_BEGIN));
            const response = await networkRequest(url, null, 'GET');
            if (response.code === 200) {
                dispatch(
                    SuccessfulAction(GET_MORE_TRANSACTIONS_SUCCESS, response.payload, response.message)
                );
            } else {
                dispatch(setTransactionError(response.message || response.payload));
            }

        } else {
            dispatch(BeginAction(GET_TRANSACTIONS_BEGIN));
            const response = await networkRequest(url, null, 'GET');

            if (response.code === 200) {
                if (response.payload.length === 0) {
                    dispatch(
                        setTransactionError('There are no results matching the search criteria')
                    );
                } else {
                    dispatch(
                        SuccessfulAction(GET_TRANSACTIONS_SUCCESS, response.payload, response.message)
                    );
                }
            } else {
                dispatch(setTransactionError(response.message || response.payload));
            }
        }
    }
}