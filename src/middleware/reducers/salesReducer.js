import {
    GET_SALE_BEGIN, GET_SALE_SUCCESS,
    GET_SALES_BEGIN, GET_SALES_SUCCESS,
    SET_SALE_ERROR,
    ADD_SALE_BEGIN, ADD_SALE_SUCCESS,
    DELETE_SALE_BEGIN, DELETE_SALE_SUCCESS,
    EDIT_SALE_BEGIN, EDIT_SALE_SUCCESS,
    GET_MORE_SALES_BEGIN, GET_MORE_SALES_SUCCESS
} from '../actions/salesActions';

const initialState = {
    currentSale: null,
    sales: [],

    lastSaleCount: 0,
    saleResponseMessage: null,
    saleResponseSuccess: false,
    saleWaitingForResponse: false,
    saleSmallWaitingForResponse: false,
    salesSmallLoader: false
};

export default function salesReducer(state = initialState, action) {
    let tmp = null;

    switch (action.type) {
        case SET_SALE_ERROR:
            return {
                ...state,
                saleResponseMessage: action.payload,
                saleResponseSuccess: false,
                saleWaitingForResponse: false,
                saleSamllWaitingForResponse: false,
            };

        case DELETE_SALE_BEGIN:
            return {
                ...state,
                currentSale: null,
                saleResponseMessage: null,
                saleResponseSuccess: false,
                saleWaitingForResponse: true,
            };

        case DELETE_SALE_SUCCESS:
            tmp = state.sales.slice();
            for (let x = 0; x < tmp.length; x++) {
                if (tmp[x].ID === action.payload.ID) {
                    tmp[x].ID = action.payload;
                    break;
                }
            }
            return {
                ...state,
                currentSale: action.payload,
                sales: tmp,
                saleResponseMessage: action.message,
                saleResponseSuccess: true,
                saleWaitingForResponse: false,
            };

        case EDIT_SALE_BEGIN:
            return {
                ...state,
                currentSale: null,
                saleResponseMessage: null,
                saleResponseSuccess: false,
                saleWaitingForResponse: true,
            };

        case EDIT_SALE_SUCCESS:
            tmp = state.sales.slice();
            for (let x = 0; x < tmp.length; x++) {
                if (tmp[x].ID === action.payload.ID) {
                    tmp[x].ID = action.payload;
                    break;
                }
            }
            return {
                ...state,
                currentSale: action.payload,
                sales: tmp,
                saleResponseMessage: action.message,
                saleResponseSuccess: true,
                saleWaitingForResponse: false,
            };

        case GET_SALE_BEGIN:
            return {
                ...state,
                currentSale: null,
                saleResponseMessage: null,
                saleResponseSuccess: false,
                saleSmallWaitingForResponse: true,
            };

        case GET_SALE_SUCCESS:
            return {
                ...state,
                currentSale: action.payload,
                saleResponseMessage: action.message,
                saleResponseSuccess: true,
                saleSmallWaitingForResponse: false,
            };

        case GET_SALES_BEGIN:
            return {
                ...state,
                sales: [],
                lastSaleCount: 0,
                saleResponseMessage: null,
                saleResponseSuccess: false,
                saleWaitingForResponse: true,
            };

        case GET_SALES_SUCCESS:
            return {
                ...state,
                sales: action.payload,
                saleResponseMessage: action.message,
                saleResponseSuccess: true,
                saleWaitingForResponse: false,
                lastSaleCount: action.payload.length
            };

        case GET_MORE_SALES_BEGIN:
            return {
                ...state,
                saleResponseMessage: null,
                saleResponseSuccess: false,
                salesSmallLoader: true,
            };

        case GET_MORE_SALES_SUCCESS:
            tmp = state.sales.slice();
            tmp = tmp.concat(action.payload);
            return {
                ...state,
                sales: tmp,
                saleResponseMessage: action.message,
                saleResponseSuccess: true,
                salesSmallLoader: false,
                lastSaleCount: action.payload.length
            };

        case ADD_SALE_BEGIN:
            return {
                ...state,
                currentSale: null,
                saleResponseMessage: null,
                saleResponseSuccess: false,
                saleWaitingForResponse: true,
            };

        case ADD_SALE_SUCCESS:
            return {
                ...state,
                currentSale: action.payload,
                saleResponseMessage: action.message,
                saleResponseSuccess: true,
                saleWaitingForResponse: false
            };


        default:
            return state;
    }

}
