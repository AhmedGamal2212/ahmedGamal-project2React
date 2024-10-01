import {
    ADD_COURSE_BEGIN,
    ADD_COURSE_SECTION_BEGIN, ADD_COURSE_SECTION_SUCCESS,
    ADD_COURSE_SUCCESS,
    ADD_VIDEO_BEGIN,
    ADD_VIDEO_SUCCESS,
    DELETE_COURSE_BEGIN,
    DELETE_COURSE_SECTION_BEGIN, DELETE_COURSE_SECTION_SUCCESS,
    DELETE_COURSE_SUCCESS,
    DELETE_VIDEO_BEGIN,
    DELETE_VIDEO_SUCCESS,
    EDIT_COURSE_BEGIN,
    EDIT_COURSE_SECTION_BEGIN, EDIT_COURSE_SECTION_SUCCESS,
    EDIT_COURSE_SUCCESS,
    EDIT_VIDEO_BEGIN,
    EDIT_VIDEO_SUCCESS,
    GET_COURSES_BEGIN,
    GET_COURSES_SUCCESS,
    GET_COURSE_BEGIN,
    GET_COURSE_SECTIONS_BEGIN, GET_COURSE_SECTIONS_SUCCESS,
    GET_COURSE_SECTION_BEGIN, GET_COURSE_SECTION_SUCCESS,
    GET_COURSE_SUCCESS,
    GET_MORE_COURSES_BEGIN,
    GET_MORE_COURSES_SUCCESS,
    GET_MORE_COURSE_SECTIONS_BEGIN, GET_MORE_COURSE_SECTIONS_SUCCESS,
    GET_MORE_VIDEOS_BEGIN,
    GET_MORE_VIDEOS_SUCCESS,
    GET_VIDEOS_BEGIN,
    GET_VIDEOS_SUCCESS,
    GET_VIDEO_BEGIN,
    GET_VIDEO_SUCCESS,
    SET_COURSE_ERROR,
    SET_COURSE_SECTION_ERROR,
    SET_VIDEO_ERROR
} from "../actions/coursesActions";

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



/** COURSES BEGINS HERE **/

/**
 * Set Courses Error
 * @param message
 * @returns {{payload, type: string}}
 */
export const setCoursesError = (message) => ({
    type: SET_COURSE_ERROR,
    payload: message
});



/**
 * Adding a new course
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function addCourse(payload) {

    return async (dispatch) => {

        if (payload === undefined) {
            dispatch(setCoursesError("Please provide a section name"));
            return
        }

        let url = 'add-course';

        dispatch(BeginAction(ADD_COURSE_BEGIN));
        const response = await networkRequest(url, payload, 'POST');
        if (response.code === 200) {
            dispatch(SuccessfulAction(ADD_COURSE_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setCoursesError(response.message || response.payload));
        }
    };
}



/**
 * Delete a specific course
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function deleteCourse(payload) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setCoursesError('Invalid payload was submitted'));
            return;
        }
        let url = 'delete-course';

        dispatch(BeginAction(DELETE_COURSE_BEGIN));
        const response = await networkRequest(url, payload, 'DELETE');
        if (response.code === 200) {
            dispatch(SuccessfulAction(DELETE_COURSE_SUCCESS, payload, response.message));
        } else {
            dispatch(setCoursesError(response.message || response.payload));
        }
    };
}



/**
 * Update a specific course
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function editCourse(payload) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setCoursesError('Invalid payload was submitted'));
            return;
        }
        let url = 'update-course';

        dispatch(BeginAction(EDIT_COURSE_BEGIN));
        const response = await networkRequest(url, payload, 'POST');
        if (response.code === 200) {
            dispatch(SuccessfulAction(EDIT_COURSE_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setCoursesError(response.message || response.payload));
        }
    };
}



/**
 * Getting a specific course
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function getCourse(payload) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setCoursesError('Invalid payload was submitted'));
            return;
        }
        let url = 'get-course?true=true';

        for (const [key, value] of Object.entries(payload)) {
            url += `&${key}=${value}`;
        }

        dispatch(BeginAction(GET_COURSE_BEGIN));
        const response = await networkRequest(url, null, 'GET');
        if (response.code === 200) {
            dispatch(SuccessfulAction(GET_COURSE_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setCoursesError(response.message || response.payload));
        }
    };
}

/**
 * Getting courses
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function getCourses(payload, appending = false) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setCoursesError('Invalid payload was submitted'));
            return;
        }
        let url = 'get-courses?true=true';

        for (const [key, value] of Object.entries(payload)) {
            url += `&${key}=${value}`;
        }

        if (appending) {
            dispatch(BeginAction(GET_MORE_COURSES_BEGIN));
            const response = await networkRequest(url, null, 'GET');
            if (response.code === 200) {
                dispatch(SuccessfulAction(GET_MORE_COURSES_SUCCESS, response.payload, response.message));
            } else {
                dispatch(setCoursesError(response.message || response.payload))
            }
        } else {
            dispatch(BeginAction(GET_COURSES_BEGIN));
            const response = await networkRequest(url, null, 'GET');
            if (response.code === 200) {
                dispatch(SuccessfulAction(GET_COURSES_SUCCESS, response.payload, response.message));
            } else {
                dispatch(setCoursesError(response.message || response.payload));
            }
        };
    }
};


/** SECTIONS BEGINS HERE **/


/**
 * Set Sections Error
 * @param message
 * @returns {{payload, type: string}}
 */
export const setCourseSectionsError = (message) => ({
    type: SET_COURSE_SECTION_ERROR,
    payload: message
});



/**
 * Adding a new section
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function addSection(payload) {

    return async (dispatch) => {

        if (payload === undefined) {
            dispatch(setCourseSectionsError("Please provide a section name"));
            return
        }

        let url = 'add-section';

        dispatch(BeginAction(ADD_COURSE_SECTION_BEGIN));
        const response = await networkRequest(url, payload, 'POST');
        if (response.code === 200) {
            dispatch(SuccessfulAction(ADD_COURSE_SECTION_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setCourseSectionsError(response.message || response.payload));
        }
    };
}



/**
 * Delete a specific section
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function deleteSection(payload) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setCourseSectionsError('Invalid payload was submitted'));
            return;
        }
        let url = 'delete-section';

        dispatch(BeginAction(DELETE_COURSE_SECTION_BEGIN));
        const response = await networkRequest(url, payload, 'DELETE');
        if (response.code === 200) {
            dispatch(SuccessfulAction(DELETE_COURSE_SECTION_SUCCESS, payload, response.message));
        } else {
            dispatch(setCourseSectionsError(response.message || response.payload));
        }
    };
}



/**
 * Update a specific section
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function editSection(payload) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setCourseSectionsError('Invalid payload was submitted'));
            return;
        }
        let url = 'update-section';

        dispatch(BeginAction(EDIT_COURSE_SECTION_BEGIN));
        const response = await networkRequest(url, payload, 'POST');
        if (response.code === 200) {
            dispatch(SuccessfulAction(EDIT_COURSE_SECTION_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setCourseSectionsError(response.message || response.payload));
        }
    };
}



/**
 * Getting a specific section
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function getSection(payload) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setCourseSectionsError('Invalid payload was submitted'));
            return;
        }
        let url = 'get-section?true=true';

        for (const [key, value] of Object.entries(payload)) {
            url += `&${key}=${value}`;
        }

        dispatch(BeginAction(GET_COURSE_SECTION_BEGIN));
        const response = await networkRequest(url, null, 'GET');
        if (response.code === 200) {
            dispatch(SuccessfulAction(GET_COURSE_SECTION_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setCourseSectionsError(response.message || response.payload));
        }
    };
}

/**
 * Getting sections
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function getSections(payload, appending = false) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setCourseSectionsError('Invalid payload was submitted'));
            return;
        }
        let url = 'get-sections?true=true';

        for (const [key, value] of Object.entries(payload)) {
            url += `&${key}=${value}`;
        }

        if (appending) {
            dispatch(BeginAction(GET_MORE_COURSE_SECTIONS_BEGIN));
            const response = await networkRequest(url, null, 'GET');
            if (response.code === 200) {
                dispatch(SuccessfulAction(GET_MORE_COURSE_SECTIONS_SUCCESS, response.payload, response.message));
            } else {
                dispatch(setCourseSectionsError(response.message || response.payload))
            }
        } else {
            dispatch(BeginAction(GET_COURSE_SECTIONS_BEGIN));
            const response = await networkRequest(url, null, 'GET');
            if (response.code === 200) {
                dispatch(SuccessfulAction(GET_COURSE_SECTIONS_SUCCESS, response.payload, response.message));
            } else {
                dispatch(setCourseSectionsError(response.message || response.payload));
            }
        };
    }
};


/** VIDEOS BEGINS HERE **/


/**
 * Set Videos Error
 * @param message
 * @returns {{payload, type: string}}
 */
export const setVideosError = (message) => ({
    type: SET_VIDEO_ERROR,
    payload: message
});



/**
 * Adding a new video
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function addVideo(payload) {

    return async (dispatch) => {

        if (payload === undefined) {
            dispatch(setVideosError("Please provide a section name"));
            return
        }

        let url = 'add-video';

        dispatch(BeginAction(ADD_VIDEO_BEGIN));
        const response = await networkRequest(url, payload, 'POST');
        if (response.code === 200) {
            dispatch(SuccessfulAction(ADD_VIDEO_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setVideosError(response.message || response.payload));
        }
    };
}



/**
 * Delete a specific video
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function deleteVideo(payload) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setVideosError('Invalid payload was submitted'));
            return;
        }
        let url = 'delete-video';

        dispatch(BeginAction(DELETE_VIDEO_BEGIN));
        const response = await networkRequest(url, payload, 'DELETE');
        if (response.code === 200) {
            dispatch(SuccessfulAction(DELETE_VIDEO_SUCCESS, payload, response.message));
        } else {
            dispatch(setVideosError(response.message || response.payload));
        }
    };
}



/**
 * Update a specific video
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function editVideo(payload) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setVideosError('Invalid payload was submitted'));
            return;
        }
        let url = 'update-video';

        dispatch(BeginAction(EDIT_VIDEO_BEGIN));
        const response = await networkRequest(url, payload, 'POST');
        if (response.code === 200) {
            dispatch(SuccessfulAction(EDIT_VIDEO_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setVideosError(response.message || response.payload));
        }
    };
}



/**
 * Getting a specific video
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function getVideo(payload) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setVideosError('Invalid payload was submitted'));
            return;
        }
        let url = 'get-video?true=true';

        for (const [key, value] of Object.entries(payload)) {
            url += `&${key}=${value}`;
        }

        dispatch(BeginAction(GET_VIDEO_BEGIN));
        const response = await networkRequest(url, null, 'GET');
        if (response.code === 200) {
            dispatch(SuccessfulAction(GET_VIDEO_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setVideosError(response.message || response.payload));
        }
    };
}

/**
 * Getting videos
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function getVideos(payload, appending = false) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setVideosError('Invalid payload was submitted'));
            return;
        }
        let url = 'get-videos?true=true';

        for (const [key, value] of Object.entries(payload)) {
            url += `&${key}=${value}`;
        }

        if (appending) {
            dispatch(BeginAction(GET_MORE_VIDEOS_BEGIN));
            const response = await networkRequest(url, null, 'GET');
            if (response.code === 200) {
                dispatch(SuccessfulAction(GET_MORE_VIDEOS_SUCCESS, response.payload, response.message));
            } else {
                dispatch(setVideosError(response.message || response.payload))
            }
        } else {
            dispatch(BeginAction(GET_VIDEOS_BEGIN));
            const response = await networkRequest(url, null, 'GET');
            if (response.code === 200) {
                dispatch(SuccessfulAction(GET_VIDEOS_SUCCESS, response.payload, response.message));
            } else {
                dispatch(setVideosError(response.message || response.payload));
            }
        };
    }
};


