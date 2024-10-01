import {
    ADD_CATEGORY_BEGIN, ADD_CATEGORY_SUCCESS,
    ADD_SKILL_BEGIN,
    ADD_SKILL_SUCCESS,
    DELETE_CATEGORY_BEGIN, DELETE_CATEGORY_SUCCESS,
    DELETE_SKILL_BEGIN,
    DELETE_SKILL_SUCCESS,
    EDIT_CATEGORY_BEGIN, EDIT_CATEGORY_SUCCESS,
    EDIT_SKILL_BEGIN,
    EDIT_SKILL_SUCCESS,
    GET_CATEGORIES_BEGIN, GET_CATEGORIES_SUCCESS,
    GET_CATEGORY_BEGIN, GET_CATEGORY_SUCCESS,
    GET_MORE_CATEGORIES_BEGIN, GET_MORE_CATEGORIES_SUCCESS,
    GET_MORE_SKILLS_BEGIN, GET_MORE_SKILLS_SUCCESS,
    GET_SKILLS_BEGIN, GET_SKILLS_SUCCESS,
    GET_SKILL_BEGIN, GET_SKILL_SUCCESS,

    SET_CATEGORY_ERROR,
    SET_SKILL_ERROR
} from "../actions/categoriesActions";
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
 * Set Establishment Error
 * @param message
 * @returns {{payload, type: string}}
 */
export const setCategoryError = (message) => ({
    type: SET_CATEGORY_ERROR,
    payload: message
});



/**
 * Adding a new category
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function addCategory(payload) {

    return async (dispatch) => {

        if (payload === undefined) {
            dispatch(setCategoryError("Please provide a category name"));
            return
        }

        let url = 'add-category';

        dispatch(BeginAction(ADD_CATEGORY_BEGIN));
        const response = await networkRequest(url, payload, 'POST');
        if (response.code === 200) {
            dispatch(SuccessfulAction(ADD_CATEGORY_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setCategoryError(response.message || response.payload));
        }
    };
}



/**
 * Delete a specific category
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function deleteCategory(payload) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setCategoryError('Invalid payload was submitted'));
            return;
        }
        let url = 'delete-category';

        dispatch(BeginAction(DELETE_CATEGORY_BEGIN));
        const response = await networkRequest(url, payload, 'DELETE');
        if (response.code === 200) {
            dispatch(SuccessfulAction(DELETE_CATEGORY_SUCCESS, payload, response.message));
        } else {
            dispatch(setCategoryError(response.message || response.payload));
        }
    };
}



/**
 * Update a specific category
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function editCategory(payload) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setCategoryError('Invalid payload was submitted'));
            return;
        }
        let url = 'update-category';

        dispatch(BeginAction(EDIT_CATEGORY_BEGIN));
        const response = await networkRequest(url, payload, 'POST');
        if (response.code === 200) {
            dispatch(SuccessfulAction(EDIT_CATEGORY_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setCategoryError(response.message || response.payload));
        }
    };
}



/**
 * Getting a specific category
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function getCategory(payload) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setCategoryError('Invalid payload was submitted'));
            return;
        }
        let url = 'get-category?true=true';

        for (const [key, value] of Object.entries(payload)) {
            url += `&${key}=${value}`;
        }

        dispatch(BeginAction(GET_CATEGORY_BEGIN));
        const response = await networkRequest(url, null, 'GET');
        if (response.code === 200) {
            dispatch(SuccessfulAction(GET_CATEGORY_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setCategoryError(response.message || response.payload));
        }
    };
}

/**
 * Getting categories
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function getCategories(payload, appending = false) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setCategoryError('Invalid payload was submitted'));
            return;
        }
        let url = 'get-categories?true=true';

        for (const [key, value] of Object.entries(payload)) {
            url += `&${key}=${value}`;
        }

        if (appending) {
            dispatch(BeginAction(GET_MORE_CATEGORIES_BEGIN));
            const response = await networkRequest(url, null, 'GET');
            if (response.code === 200) {
                dispatch(SuccessfulAction(GET_MORE_CATEGORIES_SUCCESS, response.payload, response.message));
            } else {
                dispatch(setCategoryError(response.message || response.payload))
            }
        } else {
            dispatch(BeginAction(GET_CATEGORIES_BEGIN));
            const response = await networkRequest(url, null, 'GET');
            if (response.code === 200) {
                dispatch(SuccessfulAction(GET_CATEGORIES_SUCCESS, response.payload, response.message));
            } else {
                dispatch(setCategoryError(response.message || response.payload));
            }
        };
    }
};

//SKILLS BEGINS HERE

/**
 * Set Skills Error
 * @param message
 * @returns {{payload, type: string}}
 */
export const setSkillsError = (message) => ({
    type: SET_SKILL_ERROR,
    payload: message
});



/**
 * Adding a new skill
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function addSkill(payload) {

    return async (dispatch) => {

        if (payload === undefined) {
            dispatch(setSkillsError("Please provide a skill name"));
            return
        }

        let url = 'add-skill';

        dispatch(BeginAction(ADD_SKILL_BEGIN));
        const response = await networkRequest(url, payload, 'POST');
        if (response.code === 200) {
            dispatch(SuccessfulAction(ADD_SKILL_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setSkillsError(response.message || response.payload));
        }
    };
}



/**
 * Delete a specific skill
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function deleteSkill(payload) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setSkillsError('Invalid payload was submitted'));
            return;
        }
        let url = 'delete-skill';

        dispatch(BeginAction(DELETE_SKILL_BEGIN));
        const response = await networkRequest(url, payload, 'DELETE');
        if (response.code === 200) {
            dispatch(SuccessfulAction(DELETE_SKILL_SUCCESS, payload, response.message));
        } else {
            dispatch(setSkillsError(response.message || response.payload));
        }
    };
}



/**
 * Update a specific skill
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function editSkill(payload) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setSkillsError('Invalid payload was submitted'));
            return;
        }
        let url = 'update-skill';

        dispatch(BeginAction(EDIT_SKILL_BEGIN));
        const response = await networkRequest(url, payload, 'POST');
        if (response.code === 200) {
            dispatch(SuccessfulAction(EDIT_SKILL_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setSkillsError(response.message || response.payload));
        }
    };
}



/**
 * Getting a specific skill
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function getSkill(payload) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setSkillsError('Invalid payload was submitted'));
            return;
        }
        let url = 'get-skill?true=true';

        for (const [key, value] of Object.entries(payload)) {
            url += `&${key}=${value}`;
        }

        dispatch(BeginAction(GET_SKILL_BEGIN));
        const response = await networkRequest(url, null, 'GET');
        if (response.code === 200) {
            dispatch(SuccessfulAction(GET_SKILL_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setSkillsError(response.message || response.payload));
        }
    };
}

/**
 * Getting skills
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function getSkills(payload, appending = false) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setSkillsError('Invalid payload was submitted'));
            return;
        }
        let url = 'get-skills?true=true';

        for (const [key, value] of Object.entries(payload)) {
            url += `&${key}=${value}`;
        }

        if (appending) {
            dispatch(BeginAction(GET_MORE_SKILLS_BEGIN));
            const response = await networkRequest(url, null, 'GET');
            if (response.code === 200) {
                dispatch(SuccessfulAction(GET_MORE_SKILLS_SUCCESS, response.payload, response.message));
            } else {
                dispatch(setSkillsError(response.message || response.payload))
            }
        } else {
            dispatch(BeginAction(GET_SKILLS_BEGIN));
            const response = await networkRequest(url, null, 'GET');
            if (response.code === 200) {
                dispatch(SuccessfulAction(GET_SKILLS_SUCCESS, response.payload, response.message));
            } else {
                dispatch(setSkillsError(response.message || response.payload));
            }
        };
    }
};


