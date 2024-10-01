import {
    GET_BRANCH_BEGIN, GET_BRANCH_SUCCESS,
    GET_BRANCHES_BEGIN, GET_BRANCHES_SUCCESS,
    SET_BRANCH_ERROR,
    ADD_BRANCH_BEGIN, ADD_BRANCH_SUCCESS,
    DELETE_BRANCH_BEGIN, DELETE_BRANCH_SUCCESS,
    EDIT_BRANCH_BEGIN, EDIT_BRANCH_SUCCESS,
    GET_MORE_BRANCHES_BEGIN, GET_MORE_BRANCHES_SUCCESS,
    ACTIVATE_BRANCH_BEGIN, ACTIVATE_BRANCH_SUCCESS,
    DEACTIVATE_BRANCH_BEGIN, DEACTIVATE_BRANCH_SUCCESS, SET_LOAN_ERROR, GET_LOAN_BEGIN, GET_LOAN_SUCCESS, GET_LOANS_BEGIN, GET_MORE_LOANS_SUCCESS, GET_MORE_LOANS_BEGIN, GET_LOANS_SUCCESS, SET_INSURANCE_ERROR, GET_INSURANCE_BEGIN, GET_INSURANCE_SUCCESS, GET_INSURANCES_BEGIN, GET_INSURANCES_SUCCESS, GET_MORE_INSURANCES_BEGIN, GET_MORE_INSURANCES_SUCCESS
} from '../actions/branchesActions';

const initialState = {
    currentBranch: null,
    branches: [],

    lastBranchCount: 0,
    branchResponseMessage: null,
    branchResponseSuccess: false,
    branchWaitingForResponse: false,
    branchSmallLoader: false,

    currentLoan: null,
    loanRecords: [],

    lastLoanCount: 0,
    loanResponseMessage: null,
    loanResponseSuccess: false,
    loanWaitingForResponse: false,
    loanSmallLoader: false,

    currentInsurance: null,
    insuranceRecords: [],

    lastInsuranceCount: 0,
    insuranceResponseMessage: null,
    insuranceResponseSuccess: false,
    insuranceWaitingForResponse: false,
    insuranceSmallLoader: false,

};

export default function branchesReducer(state = initialState, action) {
    let tmp = null;

    switch (action.type) {
        case SET_BRANCH_ERROR:
            return {
                ...state,
                branchResponseMessage: action.payload,
                branchResponseSuccess: false,
                branchWaitingForResponse: false,
                branchSmallLoader: false
            };

        case SET_LOAN_ERROR:
            return {
                ...state,
                loanResponseMessage: action.payload,
                loanResponseSuccess: false,
                loanWaitingForResponse: false,
            };

        case SET_INSURANCE_ERROR:
            return {
                ...state,
                insuranceResponseMessage: action.payload,
                insuranceResponseSuccess: false,
                insuranceWaitingForResponse: false,
            };

        case ADD_BRANCH_BEGIN:
            return {
                ...state,
                currentBranch: null,
                branchSmallLoader: true,
                branchResponseMessage: null,
                branchResponseSuccess: false,
            };

        case ADD_BRANCH_SUCCESS:
            tmp = state.branches.slice();
            tmp.push(action.payload);
            return {
                ...state,
                branches: tmp,
                //currentBranch: action.payload,
                branchResponseMessage: action.message,
                branchResponseSuccess: true,
                branchSmallLoader: false
            };

        case ACTIVATE_BRANCH_BEGIN:
            return {
                ...state,
                currentBranch: null,
                branchResponseMessage: null,
                branchResponseSuccess: false,
                branchSmallLoader: true,
            };

        case ACTIVATE_BRANCH_SUCCESS:
            tmp = state.branches.slice();
            for (let x = 0; x < tmp.length; x++) {
                if (tmp[x].ID === action.payload.ID) {
                    tmp[x].ID = action.payload;
                    break;
                }
            }
            return {
                ...state,
                currentBranch: action.payload,
                branches: tmp,
                branchResponseMessage: action.message,
                branchResponseSuccess: true,
                branchSmallLoader: false,
            };

        case DEACTIVATE_BRANCH_BEGIN:
            return {
                ...state,
                currentBranch: null,
                branchResponseMessage: null,
                branchResponseSuccess: false,
                branchSmallLoader: true,
            };

        case DEACTIVATE_BRANCH_SUCCESS:
            tmp = state.branches.slice();
            for (let x = 0; x < tmp.length; x++) {
                if (tmp[x].ID === action.payload.ID) {
                    tmp[x].ID = action.payload;
                    break;
                }
            }
            return {
                ...state,
                currentBranch: action.payload,
                branches: tmp,
                branchResponseMessage: action.message,
                branchResponseSuccess: true,
                branchSmallLoader: false,
            };

        case DELETE_BRANCH_BEGIN:
            return {
                ...state,
                currentBranch: null,
                branchResponseMessage: null,
                branchResponseSuccess: false,
                branchWaitingForResponse: true,
            };

        case DELETE_BRANCH_SUCCESS:
            tmp = state.branches.slice();
            for (let x = 0; x < tmp.length; x++) {
                if (tmp[x].ID === action.payload.ID) {
                    tmp[x].ID = action.payload;
                    break;
                }
            }
            return {
                ...state,
                currentBranch: action.payload,
                branches: tmp,
                branchResponseMessage: action.message,
                branchResponseSuccess: true,
                branchWaitingForResponse: false,
            };

        case EDIT_BRANCH_BEGIN:
            return {
                ...state,
                currentBranch: null,
                branchResponseMessage: null,
                branchResponseSuccess: false,
                branchWaitingForResponse: true,
            };

        case EDIT_BRANCH_SUCCESS:
            tmp = state.branches.slice();
            for (let x = 0; x < tmp.length; x++) {
                if (tmp[x].ID === action.payload.ID) {
                    tmp[x].ID = action.payload;
                    break;
                }
            }
            return {
                ...state,
                currentBranch: action.payload,
                branches: tmp,
                branchResponseMessage: action.message,
                branchResponseSuccess: true,
                branchWaitingForResponse: false,
            };

        case GET_BRANCH_BEGIN:
            return {
                ...state,
                currentBranch: null,
                branchResponseMessage: null,
                branchResponseSuccess: false,
                branchSmallLoader: true,
            };

        case GET_BRANCH_SUCCESS:
            return {
                ...state,
                currentBranch: action.payload,
                branchResponseMessage: action.message,
                branchResponseSuccess: true,
                branchSmallLoader: false,
            };

        case GET_BRANCHES_BEGIN:
            return {
                ...state,
                branches: [],
                branchResponseMessage: null,
                branchResponseSuccess: false,
                branchWaitingForResponse: true,
            };

        case GET_BRANCHES_SUCCESS:
            return {
                ...state,
                branches: action.payload,
                branchResponseMessage: action.message,
                branchResponseSuccess: true,
                branchWaitingForResponse: false,
                lastBranchCount: action.payload.length
            };

        case GET_MORE_BRANCHES_BEGIN:
            return {
                ...state,
                branchResponseMessage: null,
                branchResponseSuccess: false,
                branchSmallLoader: true,
            };

        case GET_MORE_BRANCHES_SUCCESS:
            tmp = state.branches.slice();
            tmp = tmp.concat(action.payload);
            return {
                ...state,
                branches: tmp,
                branchResponseMessage: action.message,
                branchResponseSuccess: true,
                branchSmallLoader: false,
                lastBranchCount: action.payload.length
            };

        /** LOAN REDUCER STARTS HERE */

        case GET_LOAN_BEGIN:
            return {
                ...state,
                currentLoan: null,
                loanResponseMessage: null,
                loanResponseSuccess: false,
                loanWaitingForResponse: true,
            };

        case GET_LOAN_SUCCESS:
            return {
                ...state,
                currentLoan: action.payload,
                loanResponseMessage: action.message,
                loanResponseSuccess: true,
                loanWaitingForResponse: false,
            };

        case GET_LOANS_BEGIN:
            return {
                ...state,
                loanRecords: [],
                loanResponseMessage: null,
                loanResponseSuccess: false,
                loanWaitingForResponse: true,
            };

        case GET_LOANS_SUCCESS:
            return {
                ...state,
                loanRecords: action.payload,
                loanResponseMessage: action.message,
                loanResponseSuccess: true,
                loanWaitingForResponse: false,
                lastLoanCount: action.payload.length
            };

        case GET_MORE_LOANS_BEGIN:
            return {
                ...state,
                loanResponseMessage: null,
                loanResponseSuccess: false,
                loanSmallLoader: true,
            };

        case GET_MORE_LOANS_SUCCESS:
            tmp = state.loanRecords.slice();
            tmp = tmp.concat(action.payload);
            return {
                ...state,
                loanRecords: tmp,
                loanResponseMessage: action.message,
                loanResponseSuccess: true,
                loanSmallLoader: false,
                lastLoanCount: action.payload.length
            };

        /** INSURANCE REDUCER BEGINS HERE */

        case GET_INSURANCE_BEGIN:
            return {
                ...state,
                currentInsurance: null,
                insuranceResponseMessage: null,
                insuranceResponseSuccess: false,
                insuranceWaitingForResponse: true,
            };

        case GET_INSURANCE_SUCCESS:
            return {
                ...state,
                currentInsurance: action.payload,
                insuranceResponseMessage: action.message,
                insuranceResponseSuccess: true,
                insuranceWaitingForResponse: false,
            };

        case GET_INSURANCES_BEGIN:
            return {
                ...state,
                insuranceRecords: [],
                insuranceResponseMessage: null,
                insuranceResponseSuccess: false,
                insuranceWaitingForResponse: true,
            };

        case GET_INSURANCES_SUCCESS:
            return {
                ...state,
                insuranceRecords: action.payload,
                insuranceResponseMessage: action.message,
                insuranceResponseSuccess: true,
                insuranceWaitingForResponse: false,
                lastInsuranceCount: action.payload.length
            };

        case GET_MORE_INSURANCES_BEGIN:
            return {
                ...state,
                insuranceResponseMessage: null,
                insuranceResponseSuccess: false,
                insuranceSmallLoader: true,
            };

        case GET_MORE_INSURANCES_SUCCESS:
            tmp = state.insuranceRecords.slice();
            tmp = tmp.concat(action.payload);
            return {
                ...state,
                insuranceRecords: tmp,
                insuranceResponseMessage: action.message,
                insuranceResponseSuccess: true,
                insuranceSmallLoader: false,
                lastInsuranceCount: action.payload.length
            };

        default:
            return state;
    }

}
