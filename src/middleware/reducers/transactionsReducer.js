import {
    GET_MORE_TRANSACTIONS_BEGIN, GET_MORE_TRANSACTIONS_SUCCESS,
    GET_TRANSACTION_BEGIN, GET_TRANSACTION_SUCCESS,
    GET_TRANSACTIONS_BEGIN, GET_TRANSACTIONS_SUCCESS,
    SET_TRANSACTIONS_ERROR,
    INITIATE_TRANSACTION_BEGIN,
    INITIATE_TRANSACTION_SUCCESS,
    CHARGE_REQUEST_BEGIN,
    CHARGE_REQUEST_SUCCESS,
    VALIDATE_TRANSACTION_BEGIN,
    VALIDATE_TRANSACTION_SUCCESS
} from "../actions/transactionsActions";

const initialState = {
    transactions: [],
    currentTransaction: null,
    transactionStep: "initiate",
    lastTransactionsPullCount: 0,
    transactionResponseMessage: null,
    transactionResponseSuccess: false,
    transactionWaitingForResponse: false,

    totalPulled: 0
};

export default function transactionsReducer(state = initialState, action) {
    let tmp = null;

    switch (action.type) {
        /**
         * Transaction actions
         */
        case SET_TRANSACTIONS_ERROR:
            return {
                ...state,
                transactionResponseMessage: action.payload,
                transactionResponseSuccess: false,
                transactionWaitingForResponse: false,
                pullMoreTransactionsLoader: false
            };

        case "CLEAR_TRANSACTION":
            return {
                ...state,
                transactionStep: "initiate",
                currentTransaction: action.payload,
                transactionResponseMessage: action.payload,
                transactionResponseSuccess: false,
                transactionWaitingForResponse: false
            }

        case INITIATE_TRANSACTION_BEGIN:
            return {
                ...state,
                transactionResponseMessage: null,
                transactionResponseSuccess: false,
                transactionWaitingForResponse: true
            };

        case INITIATE_TRANSACTION_SUCCESS:
            return {
                ...state,
                currentTransaction: action.payload,
                transactionStep: "charge",
                transactionResponseMessage: action.message,
                transactionResponseSuccess: true,
                transactionWaitingForResponse: false
            };

        case VALIDATE_TRANSACTION_BEGIN:
            return {
                ...state,
                transactionResponseMessage: null,
                transactionResponseSuccess: false,
                transactionWaitingForResponse: true
            };

        case VALIDATE_TRANSACTION_SUCCESS:
            return {
                ...state,
                currentTransaction: action.payload,
                transactionResponseMessage: action.message,
                transactionResponseSuccess: true,
                transactionWaitingForResponse: false
            };

        case CHARGE_REQUEST_BEGIN:
            return {
                ...state,
                transactionResponseMessage: null,
                transactionResponseSuccess: false,
                transactionWaitingForResponse: true
            };

        case CHARGE_REQUEST_SUCCESS:
            return {
                ...state,
                currentTransaction: action.payload,
                transactionStep: "validate",
                transactionResponseMessage: action.message,
                transactionResponseSuccess: true,
                transactionWaitingForResponse: false
            };

        case GET_TRANSACTION_BEGIN:
            return {
                ...state,
                transactionResponseMessage: null,
                transactionResponseSuccess: false,
                transactionWaitingForResponse: true
            };

        case GET_TRANSACTION_SUCCESS:
            return {
                ...state,
                currentTransaction: action.payload,
                transactionResponseMessage: action.message,
                transactionResponseSuccess: true,
                transactionWaitingForResponse: false
            };

        case GET_TRANSACTIONS_BEGIN:
            return {
                ...state,
                transactions: [],
                lastTransactionsPullCount: 0,
                transactionResponseMessage: null,
                transactionResponseSuccess: false,
                transactionWaitingForResponse: true
            };

        case GET_TRANSACTIONS_SUCCESS:

            return {
                ...state,
                transactions: action.payload,
                lastTransactionsPullCount: action.payload === null ? 0 : action.payload.length,
                totalPulled: state.totalPulled + action.payload.length,
                transactionResponseMessage: action.message,
                transactionResponseSuccess: true,
                transactionWaitingForResponse: false
            };

        case GET_MORE_TRANSACTIONS_BEGIN:
            return {
                ...state,
                transactionResponseMessage: null,
                transactionResponseSuccess: false,
                pullMoreTransactionsLoader: true
            };

        case GET_MORE_TRANSACTIONS_SUCCESS:
            tmp = state.transactions.slice();
            tmp = tmp.concat(action.payload);
            return {
                ...state,
                transactions: tmp,
                lastTransactionsPullCount: action.payload === null ? 0 : action.payload.length,
                totalPulled: state.totalPulled + action.payload.length,
                transactionResponseMessage: action.message,
                transactionResponseSuccess: true,
                pullMoreTransactionsLoader: false
            };

        default:
            return state;
    }

}
