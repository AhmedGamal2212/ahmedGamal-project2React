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

const initialState = {
    currentSection: null,
    sections: [],

    lastSectionCount: 0,
    sectionsResponseMessage: null,
    sectionsResponseSuccess: false,
    sectionsWaitingForResponse: false,
    sectionsSmallLoader: false,
    pullMoreSectionsLoader: false,

    /** Skills state starts here */
    currentCourse: null,
    courses: [],
    courseAdded: false,

    lastCourseCount: 0,
    coursesResponseMessage: null,
    coursesResponseSuccess: false,
    coursesWaitingForResponse: false,
    coursesSmallLoader: false,
    pullMoreCoursesLoader: false,

    /** Videos state starts here */
    currentVideo: null,
    videos: [],
    videoAdded: false,

    lastVideoCount: 0,
    videosResponseMessage: null,
    videosAddResponseMessage: null,
    videosResponseSuccess: false,
    videosWaitingForResponse: false,
    videosSmallLoader: false,
    pullMoreVideosLoader: false,
};

export default function coursesReducer(state = initialState, action) {
    let tmp = null;

    switch (action.type) {

        /** Course cases starts here */
        case SET_COURSE_ERROR:
            return {
                ...state,
                coursesResponseMessage: action.payload,
                coursesResponseSuccess: false,
                coursesWaitingForResponse: false,
                coursesSmallLoader: false,
                pullMoreCoursesLoader: false,
            };

        case ADD_COURSE_BEGIN:
            return {
                ...state,
                courseAdded: false,
                coursesResponseMessage: null,
                coursesResponseSuccess: false,
                coursesSmallLoader: true,
            };

        case ADD_COURSE_SUCCESS:
            tmp = state.courses.slice();
            tmp.push(action.payload);
            return {
                ...state,
                courses: tmp,
                courseAdded: true,
                coursesResponseMessage: action.message,
                coursesResponseSuccess: true,
                coursesSmallLoader: false
            };



        case DELETE_COURSE_BEGIN:
            return {
                ...state,
                coursesResponseMessage: null,
                coursesResponseSuccess: false,
                coursesWaitingForResponse: true,
            };

        case DELETE_COURSE_SUCCESS:
            tmp = state.courses.slice();
            for (let x = 0; x < tmp.length; x++) {
                if (tmp[x].ID === action.payload.ID) {
                    tmp.splice(x, 1)
                    break
                }
            }
            return {
                ...state,
                courses: tmp,
                currentCourse: null,
                coursesResponseMessage: action.message,
                coursesResponseSuccess: true,
                coursesWaitingForResponse: false,
            };

        case EDIT_COURSE_BEGIN:
            return {
                ...state,
                currentCourse: null,
                coursesResponseMessage: null,
                coursesResponseSuccess: false,
                coursesSmallLoader: true,
            };

        case EDIT_COURSE_SUCCESS:
            tmp = state.courses.slice();
            for (let x = 0; x < tmp.length; x++) {
                if (tmp[x].ID === action.payload.ID) {
                    tmp[x] = action.payload;
                    break;
                }
            }
            return {
                ...state,
                currentCourse: action.payload,
                courses: tmp,
                coursesResponseMessage: action.message,
                coursesResponseSuccess: true,
                coursesSmallLoader: false,
            };

        case GET_COURSE_BEGIN:
            return {
                ...state,
                currentCourse: null,
                coursesResponseMessage: null,
                coursesResponseSuccess: false,
                coursesSmallLoader: true,
            };

        case GET_COURSE_SUCCESS:
            return {
                ...state,
                currentCourse: action.payload,
                coursesResponseMessage: action.message,
                coursesResponseSuccess: true,
                coursesSmallLoader: false,
            };

        case GET_COURSES_BEGIN:
            return {
                ...state,
                courses: [],
                courseAdded: false,
                coursesResponseMessage: null,
                coursesResponseSuccess: false,
                coursesWaitingForResponse: true,
            };

        case GET_COURSES_SUCCESS:
            return {
                ...state,
                courses: action.payload,
                coursesResponseMessage: action.message,
                coursesResponseSuccess: true,
                coursesWaitingForResponse: false,
                lastCourseCount: action.payload.length
            };

        case GET_MORE_COURSES_BEGIN:
            return {
                ...state,
                coursesResponseMessage: null,
                coursesResponseSuccess: false,
                pullMoreCoursesLoader: true,
            };

        case GET_MORE_COURSES_SUCCESS:
            tmp = state.courses.slice();
            tmp = tmp.concat(action.payload);
            return {
                ...state,
                courses: tmp,
                coursesResponseMessage: action.message,
                coursesResponseSuccess: true,
                pullMoreCoursesLoader: false,
                lastCourseCount: action.payload.length
            };


        /** SECTION CASES BEGINS HERE */
        case SET_COURSE_SECTION_ERROR:
            return {
                ...state,
                sectionsResponseMessage: action.payload,
                sectionsResponseSuccess: false,
                sectionsWaitingForResponse: false,
                sectionsSmallLoader: false,
                pullMoreSectionsLoader: false,
            };

        case ADD_COURSE_SECTION_BEGIN:
            return {
                ...state,
                currentSection: null,
                sectionsResponseMessage: null,
                sectionsResponseSuccess: false,
                sectionsSmallLoader: true,
            };

        case ADD_COURSE_SECTION_SUCCESS:
            tmp = state.sections.slice();
            tmp.push(action.payload);
            return {
                ...state,
                sections: tmp,
                // currentSection: action.payload,
                sectionsResponseMessage: action.message,
                sectionsResponseSuccess: true,
                sectionsSmallLoader: false
            };



        case DELETE_COURSE_SECTION_BEGIN:
            return {
                ...state,
                sectionsResponseMessage: null,
                sectionsResponseSuccess: false,
                sectionsWaitingForResponse: true,
            };

        case DELETE_COURSE_SECTION_SUCCESS:
            tmp = state.sections.slice();
            for (let x = 0; x < tmp.length; x++) {
                if (tmp[x].ID === action.payload.ID) {
                    tmp.splice(x, 1)
                    break
                }
            }
            return {
                ...state,
                sections: tmp,
                currentSection: null,
                sectionsResponseMessage: action.message,
                sectionsResponseSuccess: true,
                sectionsWaitingForResponse: false,
            };

        case EDIT_COURSE_SECTION_BEGIN:
            return {
                ...state,
                currentSection: null,
                sectionsResponseMessage: null,
                sectionsResponseSuccess: false,
                sectionsSmallLoader: true,
            };

        case EDIT_COURSE_SECTION_SUCCESS:
            tmp = state.sections.slice();
            for (let x = 0; x < tmp.length; x++) {
                if (tmp[x].ID === action.payload.ID) {
                    tmp[x] = action.payload;
                    break;
                }
            }
            return {
                ...state,
                currentSection: action.payload,
                sections: tmp,
                sectionsResponseMessage: action.message,
                sectionsResponseSuccess: true,
                sectionsSmallLoader: false,
            };

        case GET_COURSE_SECTION_BEGIN:
            return {
                ...state,
                currentSection: null,
                sectionsResponseMessage: null,
                sectionsResponseSuccess: false,
                sectionsSmallLoader: true,
            };

        case GET_COURSE_SECTION_SUCCESS:
            return {
                ...state,
                currentSection: action.payload,
                sectionsResponseMessage: action.message,
                sectionsResponseSuccess: true,
                sectionsSmallLoader: false,
            };

        case GET_COURSE_SECTIONS_BEGIN:
            return {
                ...state,
                sections: [],
                sectionsResponseMessage: null,
                sectionsResponseSuccess: false,
                sectionsWaitingForResponse: true,
            };

        case GET_COURSE_SECTIONS_SUCCESS:
            return {
                ...state,
                sections: action.payload,
                sectionsResponseMessage: action.message,
                sectionsResponseSuccess: true,
                sectionsWaitingForResponse: false,
                lastSectionCount: action.payload.length
            };

        case GET_MORE_COURSE_SECTIONS_BEGIN:
            return {
                ...state,
                sectionsResponseMessage: null,
                sectionsResponseSuccess: false,
                pullMoreSectionsLoader: true,
            };

        case GET_MORE_COURSE_SECTIONS_SUCCESS:
            tmp = state.sections.slice();
            tmp = tmp.concat(action.payload);
            return {
                ...state,
                sections: tmp,
                sectionsResponseMessage: action.message,
                sectionsResponseSuccess: true,
                pullMoreSectionsLoader: false,
                lastSectionCount: action.payload.length
            };

        /** VIDEO CASES BEGINS HERE */
        case SET_VIDEO_ERROR:
            return {
                ...state,
                videosResponseMessage: action.payload,
                videosAddResponseMessage: action.payload,
                videosResponseSuccess: false,
                videosWaitingForResponse: false,
                videosSmallLoader: false,
                pullMoreVideosLoader: false,
            };

        case ADD_VIDEO_BEGIN:
            return {
                ...state,
                videoAdded: false,
                currentVideo: null,
                videosAddResponseMessage: null,
                videosResponseSuccess: false,
                videosSmallLoader: true,
            };

        case ADD_VIDEO_SUCCESS:
            tmp = state.videos.slice();
            tmp.push(action.payload);
            return {
                ...state,
                videos: tmp,
                videoAdded: true,
                videosAddResponseMessage: action.message,
                videosResponseSuccess: true,
                videosSmallLoader: false
            };



        case DELETE_VIDEO_BEGIN:
            return {
                ...state,
                videosResponseMessage: null,
                videosResponseSuccess: false,
                videosWaitingForResponse: true,
            };

        case DELETE_VIDEO_SUCCESS:
            tmp = state.videos.slice();
            for (let x = 0; x < tmp.length; x++) {
                if (tmp[x].ID === action.payload.ID) {
                    tmp.splice(x, 1)
                    break
                }
            }
            return {
                ...state,
                videos: tmp,
                currentSection: null,
                videosResponseMessage: action.message,
                videosResponseSuccess: true,
                videosWaitingForResponse: false,
            };

        case EDIT_COURSE_SECTION_BEGIN:
            return {
                ...state,
                currentVideo: null,
                videosResponseMessage: null,
                videosResponseSuccess: false,
                videosSmallLoader: true,
            };

        case EDIT_VIDEO_SUCCESS:
            tmp = state.videos.slice();
            for (let x = 0; x < tmp.length; x++) {
                if (tmp[x].ID === action.payload.ID) {
                    tmp[x] = action.payload;
                    break;
                }
            }
            return {
                ...state,
                currentVideo: action.payload,
                videos: tmp,
                videosResponseMessage: action.message,
                videosResponseSuccess: true,
                videosSmallLoader: false,
            };

        case GET_VIDEO_BEGIN:
            return {
                ...state,
                currentVideo: null,
                videosResponseMessage: null,
                videosResponseSuccess: false,
                videosSmallLoader: true,
            };

        case GET_VIDEO_SUCCESS:
            return {
                ...state,
                currentVideo: action.payload,
                videosResponseMessage: action.message,
                videosResponseSuccess: true,
                videosSmallLoader: false,
            };

        case GET_VIDEOS_BEGIN:
            return {
                ...state,
                videos: [],
                videosResponseMessage: null,
                videosResponseSuccess: false,
                videosWaitingForResponse: true,
            };

        case GET_VIDEOS_SUCCESS:
            return {
                ...state,
                videos: action.payload,
                videosResponseMessage: action.message,
                videosResponseSuccess: true,
                videosWaitingForResponse: false,
                lastSectionCount: action.payload.length
            };

        case GET_MORE_VIDEOS_BEGIN:
            return {
                ...state,
                videosResponseMessage: null,
                videosResponseSuccess: false,
                pullMoreVideosLoader: true,
            };

        case GET_MORE_VIDEOS_SUCCESS:
            tmp = state.videos.slice();
            tmp = tmp.concat(action.payload);
            return {
                ...state,
                videos: tmp,
                videosResponseMessage: action.message,
                videosResponseSuccess: true,
                pullMoreVideosLoader: false,
                lastSectionCount: action.payload.length
            };

        default:
            return state;


    };
};