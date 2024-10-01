import {
    ACTIVATE_BRANCH_BEGIN, ACTIVATE_BRANCH_SUCCESS,
    ADD_BRANCH_BEGIN, ADD_BRANCH_SUCCESS,
    DEACTIVATE_BRANCH_BEGIN, DEACTIVATE_BRANCH_SUCCESS,
    DELETE_BRANCH_BEGIN, DELETE_BRANCH_SUCCESS,
    EDIT_BRANCH_BEGIN, EDIT_BRANCH_SUCCESS,
    GET_BRANCHES_BEGIN, GET_BRANCHES_SUCCESS,
    GET_BRANCH_BEGIN, GET_BRANCH_SUCCESS,
    GET_INSURANCES_BEGIN,
    GET_INSURANCES_SUCCESS,
    GET_INSURANCE_BEGIN,
    GET_INSURANCE_SUCCESS,
    GET_LOANS_BEGIN,
    GET_LOANS_SUCCESS,
    GET_LOAN_BEGIN,
    GET_LOAN_SUCCESS,
    GET_MORE_BRANCHES_BEGIN, GET_MORE_BRANCHES_SUCCESS,
    GET_MORE_INSURANCES_BEGIN,
    GET_MORE_INSURANCES_SUCCESS,
    GET_MORE_LOANS_BEGIN,
    GET_MORE_LOANS_SUCCESS,
    SET_BRANCH_ERROR,
    SET_INSURANCE_ERROR
} from "../actions/branchesActions";
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
 * Set Branch Error
 * @param message
 * @returns {{payload, type: string}}
 */
export const setBranchesError = (message) => ({
    type: SET_BRANCH_ERROR,
    payload: message
});



/** 
 * Validating a branch
 * @param branchDetails, basicCheck
 * @returns string
 */

const validateBranchDetails = (branchDetails) => {

    if (branchDetails === undefined) {
        return "Invalid input"
    }

    if (branchDetails.name === undefined || branchDetails.name.trim("").name === 0) {
        return "Fill branch name"
    }

    if (branchDetails.address === undefined || branchDetails.address.trim("").address === 0) {
        return "Fill branch address"
    }

    if (branchDetails.created_by === undefined || isNaN(parseInt(branchDetails.created_by)) === true || branchDetails.created_by < 0) {
        return "Fill a valid user"
    }

    if (branchDetails.establishment_id === undefined || isNaN(parseInt(branchDetails.establishment_id)) === true || branchDetails.establishment_id < 0) {
        return "Fill a valid user establishment ID"
    }

    if (branchDetails.region === undefined || isNaN(parseInt(branchDetails.region)) === true || branchDetails.region < 0) {
        return "Fill a valid region ID"
    }

    if (branchDetails.branch_channels === undefined || branchDetails.branch_channels.length <= 0) {
        return "Fill a valid payment channel"
    }

    return null
}

/**
 * Adding a new branch
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function addBranch(payload) {

    return async (dispatch) => {

        const validationError = validateBranchDetails(payload)
        if (validationError !== null) {
            dispatch(setBranchesError(validationError));
            return
        }

        let url = 'add-branch';

        dispatch(BeginAction(ADD_BRANCH_BEGIN));
        const response = await networkRequest(url, payload, 'POST');
        if (response.code === 200) {
            dispatch(SuccessfulAction(ADD_BRANCH_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setBranchesError(response.message || response.payload));
        }
    };
}



/**
 * Activate a branch
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function activateBranch(payload) {

    return async (dispatch) => {

        if (payload === undefined) {
            dispatch(setBranchesError('Invalid payload was submitted'));
            return;
        }

        let url = 'activate-branch';

        dispatch(BeginAction(ACTIVATE_BRANCH_BEGIN));
        const response = await networkRequest(url, payload, 'POST');
        if (response.code === 200) {
            dispatch(SuccessfulAction(ACTIVATE_BRANCH_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setBranchesError(response.message || response.payload));
        }
    };
}



/**
 * Deactivate a branch
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function deactivateBranch(payload) {

    return async (dispatch) => {

        if (payload === undefined) {
            dispatch(setBranchesError('Invalid payload was submitted'));
            return;
        }

        let url = 'deactivate-branch';

        dispatch(BeginAction(DEACTIVATE_BRANCH_BEGIN));
        const response = await networkRequest(url, payload, 'POST');
        if (response.code === 200) {
            dispatch(SuccessfulAction(DEACTIVATE_BRANCH_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setBranchesError(response.message || response.payload));
        }
    };
}



/**
 * Delete a specific branch
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function deleteSaleRecord(payload) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setBranchesError('Invalid payload was submitted'));
            return;
        }
        let url = 'delete-branch';

        dispatch(BeginAction(DELETE_BRANCH_BEGIN));
        const response = await networkRequest(url, payload, 'DELETE');
        if (response.code === 200) {
            dispatch(SuccessfulAction(DELETE_BRANCH_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setBranchesError(response.message || response.payload));
        }
    };
}



/**
 * Update a specific branch
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function editBranch(payload) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setBranchesError('Invalid payload was submitted'));
            return;
        }
        let url = 'update-branch';

        dispatch(BeginAction(EDIT_BRANCH_BEGIN));
        const response = await networkRequest(url, payload, 'POST');
        if (response.code === 200) {
            dispatch(SuccessfulAction(EDIT_BRANCH_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setBranchesError(response.message || response.payload));
        }
    };
}



/**
 * Getting a specific branch
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function getBranch(payload) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setBranchesError('Invalid payload was submitted'));
            return;
        }
        let url = 'get-branch?true=true';

        for (const [key, value] of Object.entries(payload)) {
            url += `&${key}=${value}`;
        }

        dispatch(BeginAction(GET_BRANCH_BEGIN));
        const response = await networkRequest(url, null, 'GET');
        if (response.code === 200) {
            dispatch(SuccessfulAction(GET_BRANCH_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setBranchesError(response.message || response.payload));
        }
    };
}

/**
 * Getting branches
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function getBranches(payload, appending = false) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setBranchesError('Invalid payload was submitted'));
            return;
        }
        let url = 'get-branches?true=true';

        for (const [key, value] of Object.entries(payload)) {
            url += `&${key}=${value}`;
        }

        if (appending) {
            dispatch(BeginAction(GET_MORE_BRANCHES_BEGIN));
            const response = await networkRequest(url, null, 'GET');
            if (response.code === 200) {
                dispatch(SuccessfulAction(GET_MORE_BRANCHES_SUCCESS, response.payload, response.message));
            } else {
                dispatch(setBranchesError(response.message || response.payload))
            }
        } else {
            dispatch(BeginAction(GET_BRANCHES_BEGIN));
            const response = await networkRequest(url, null, 'GET');
            if (response.code === 200) {
                dispatch(SuccessfulAction(GET_BRANCHES_SUCCESS, response.payload, response.message));
            } else {
                dispatch(setBranchesError(response.message || response.payload));
            }
        };
    }
};



/** LOAN ACTION CREATORS SEGMENT */

/**
 * Set Loan Error
 * @param message
 * @returns {{payload, type: string}}
 */
export const setLoanError = (message) => ({
    type: SET_BRANCH_ERROR,
    payload: message
});



/**
 * Getting a specific loan record
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function getLoanRecord(payload) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setLoanError('Invalid payload was submitted'));
            return;
        }
        let url = 'get-loan?true=true';

        for (const [key, value] of Object.entries(payload)) {
            url += `&${key}=${value}`;
        }

        dispatch(BeginAction(GET_LOAN_BEGIN));
        const response = await networkRequest(url, null, 'GET');
        if (response.code === 200) {
            dispatch(SuccessfulAction(GET_LOAN_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setLoanError(response.message || response.payload));
        }
    };
}

/**
 * Getting loan records
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function getLoanRecords(payload, appending = false) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setLoanError('Invalid payload was submitted'));
            return;
        }
        let url = 'get-loans?true=true';

        for (const [key, value] of Object.entries(payload)) {
            url += `&${key}=${value}`;
        }

        if (appending) {
            dispatch(BeginAction(GET_MORE_LOANS_BEGIN));
            const response = await networkRequest(url, null, 'GET');
            if (response.code === 200) {
                dispatch(SuccessfulAction(GET_MORE_LOANS_SUCCESS, response.payload, response.message));
            } else {
                dispatch(setLoanError(response.message || response.payload))
            }
        } else {
            dispatch(BeginAction(GET_LOANS_BEGIN));
            const response = await networkRequest(url, null, 'GET');
            if (response.code === 200) {
                dispatch(SuccessfulAction(GET_LOANS_SUCCESS, response.payload, response.message));
            } else {
                dispatch(setLoanError(response.message || response.payload));
            }
        };
    }
};


/** LOAN ACTION CREATORS SEGMENT */

/**
 * Set Insurance Error
 * @param message
 * @returns {{payload, type: string}}
 */
export const setInsuranceError = (message) => ({
    type: SET_INSURANCE_ERROR,
    payload: message
});



/**
 * Getting a specific insurance record
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function getInsuranceRecord(payload) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setInsuranceError('Invalid payload was submitted'));
            return;
        }
        let url = 'get-insurance-record?true=true';

        for (const [key, value] of Object.entries(payload)) {
            url += `&${key}=${value}`;
        }

        dispatch(BeginAction(GET_INSURANCE_BEGIN));
        const response = await networkRequest(url, null, 'GET');
        if (response.code === 200) {
            dispatch(SuccessfulAction(GET_INSURANCE_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setInsuranceError(response.message || response.payload));
        }
    };
}

/**
 * Getting insurance records
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function getInsuranceRecords(payload, appending = false) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setInsuranceError('Invalid payload was submitted'));
            return;
        }
        let url = 'get-insurance-records?true=true';

        for (const [key, value] of Object.entries(payload)) {
            url += `&${key}=${value}`;
        }

        if (appending) {
            dispatch(BeginAction(GET_MORE_INSURANCES_BEGIN));
            const response = await networkRequest(url, null, 'GET');
            if (response.code === 200) {
                dispatch(SuccessfulAction(GET_MORE_INSURANCES_SUCCESS, response.payload, response.message));
            } else {
                dispatch(setInsuranceError(response.message || response.payload))
            }
        } else {
            dispatch(BeginAction(GET_INSURANCES_BEGIN));
            const response = await networkRequest(url, null, 'GET');
            if (response.code === 200) {
                dispatch(SuccessfulAction(GET_INSURANCES_SUCCESS, response.payload, response.message));
            } else {
                dispatch(setInsuranceError(response.message || response.payload));
            }
        };
    }
};
