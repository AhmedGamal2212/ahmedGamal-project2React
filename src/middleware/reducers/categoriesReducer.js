import {
    GET_CATEGORY_BEGIN, GET_CATEGORY_SUCCESS,
    GET_CATEGORIES_BEGIN, GET_CATEGORIES_SUCCESS,
    SET_CATEGORY_ERROR,
    ADD_CATEGORY_BEGIN, ADD_CATEGORY_SUCCESS,
    DELETE_CATEGORY_BEGIN, DELETE_CATEGORY_SUCCESS,
    EDIT_CATEGORY_BEGIN, EDIT_CATEGORY_SUCCESS,
    GET_MORE_CATEGORIES_BEGIN, GET_MORE_CATEGORIES_SUCCESS, SET_SKILL_ERROR, ADD_SKILL_BEGIN, ADD_SKILL_SUCCESS, DELETE_SKILL_BEGIN, DELETE_SKILL_SUCCESS, EDIT_SKILL_BEGIN, GET_SKILLS_BEGIN, GET_SKILL_BEGIN, GET_SKILL_SUCCESS, GET_SKILLS_SUCCESS, GET_MORE_SKILLS_BEGIN, GET_MORE_SKILLS_SUCCESS, EDIT_SKILL_SUCCESS
} from '../actions/categoriesActions';

const initialState = {
    currentCategory: null,
    categories: [],

    lastCategoryCount: 0,
    categoryResponseMessage: null,
    categoryResponseSuccess: false,
    categoryWaitingForResponse: false,
    categoriesSmallLoader: false,
    pullMoreLoader: false,

    /** Skills state starts here */
    currentSkill: null,
    skills: [],

    lastSkillCount: 0,
    skillsResponseMessage: null,
    skillsResponseSuccess: false,
    skillsWaitingForResponse: false,
    skillsSmallLoader: false,
    skillPullMoreLoader: false,



};

export default function categoriesReducer(state = initialState, action) {
    let tmp = null;

    switch (action.type) {
        case SET_CATEGORY_ERROR:
            return {
                ...state,
                categoryResponseMessage: action.payload,
                categoryResponseSuccess: false,
                categoryWaitingForResponse: false,
                categoriesSmallLoader: false,
                pullMoreLoader: false,
            };

        case ADD_CATEGORY_BEGIN:
            return {
                ...state,
                currentCategory: null,
                categoryResponseMessage: null,
                categoryResponseSuccess: false,
                categoriesSmallLoader: true,
            };

        case ADD_CATEGORY_SUCCESS:
            tmp = state.categories.slice();
            tmp.push(action.payload);
            return {
                ...state,
                categories: tmp,
                // currentCategory: action.payload,
                categoryResponseMessage: action.message,
                categoryResponseSuccess: true,
                categoriesSmallLoader: false
            };



        case DELETE_CATEGORY_BEGIN:
            return {
                ...state,
                categoryResponseMessage: null,
                categoryResponseSuccess: false,
                categoryWaitingForResponse: true,
            };

        case DELETE_CATEGORY_SUCCESS:
            tmp = state.categories.slice();
            for (let x = 0; x < tmp.length; x++) {
                if (tmp[x].ID === action.payload.ID) {
                    tmp.splice(x, 1)
                    break
                }
            }
            return {
                ...state,
                categories: tmp,
                currentCategory: null,
                categoryResponseMessage: action.message,
                categoryResponseSuccess: true,
                categoryWaitingForResponse: false,
            };

        case EDIT_CATEGORY_BEGIN:
            return {
                ...state,
                currentCategory: null,
                categoryResponseMessage: null,
                categoryResponseSuccess: false,
                categoriesSmallLoader: true,
            };

        case EDIT_CATEGORY_SUCCESS:
            tmp = state.categories.slice();
            for (let x = 0; x < tmp.length; x++) {
                if (tmp[x].ID === action.payload.ID) {
                    tmp[x] = action.payload;
                    break;
                }
            }
            return {
                ...state,
                currentCategory: action.payload,
                categories: tmp,
                categoryResponseMessage: action.message,
                categoryResponseSuccess: true,
                categoriesSmallLoader: false,
            };

        case GET_CATEGORY_BEGIN:
            return {
                ...state,
                currentCategory: null,
                categoryResponseMessage: null,
                categoryResponseSuccess: false,
                categoriesSmallLoader: true,
            };

        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                currentCategory: action.payload,
                categoryResponseMessage: action.message,
                categoryResponseSuccess: true,
                categoriesSmallLoader: false,
            };

        case GET_CATEGORIES_BEGIN:
            return {
                ...state,
                categories: [],
                categoryResponseMessage: null,
                categoryResponseSuccess: false,
                categoryWaitingForResponse: true,
            };

        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                categoryResponseMessage: action.message,
                categoryResponseSuccess: true,
                categoryWaitingForResponse: false,
                lastCategoryCount: action.payload.length
            };

        case GET_MORE_CATEGORIES_BEGIN:
            return {
                ...state,
                categoryResponseMessage: null,
                categoryResponseSuccess: false,
                pullMoreLoader: true,
            };

        case GET_MORE_CATEGORIES_SUCCESS:
            tmp = state.categories.slice();
            tmp = tmp.concat(action.payload);
            return {
                ...state,
                categories: tmp,
                categoryResponseMessage: action.message,
                categoryResponseSuccess: true,
                pullMoreLoader: false,
                lastCategoryCount: action.payload.length
            };


        /** Skills cases starts here */
        case SET_SKILL_ERROR:
            return {
                ...state,
                skillsResponseMessage: action.payload,
                skillsResponseSuccess: false,
                skillsWaitingForResponse: false,
                skillsSmallLoader: false,
                skillPullMoreLoader: false,
            };

        case ADD_SKILL_BEGIN:
            return {
                ...state,
                currentSkill: null,
                skillsResponseMessage: null,
                skillsResponseSuccess: false,
                skillsSmallLoader: true,
            };

        case ADD_SKILL_SUCCESS:
            tmp = state.skills.slice();
            tmp.push(action.payload);
            return {
                ...state,
                skills: tmp,
                // currentCategory: action.payload,
                skillsResponseMessage: action.message,
                skillsResponseSuccess: true,
                skillsSmallLoader: false
            };



        case DELETE_SKILL_BEGIN:
            return {
                ...state,
                skillsResponseMessage: null,
                skillsResponseSuccess: false,
                skillsWaitingForResponse: true,
            };

        case DELETE_SKILL_SUCCESS:
            tmp = state.skills.slice();
            for (let x = 0; x < tmp.length; x++) {
                if (tmp[x].ID === action.payload.ID) {
                    tmp.splice(x, 1)
                    break
                }
            }
            return {
                ...state,
                skills: tmp,
                currentSkill: null,
                skillsResponseMessage: action.message,
                skillsResponseSuccess: true,
                skillsWaitingForResponse: false,
            };

        case EDIT_SKILL_BEGIN:
            return {
                ...state,
                currentSkill: null,
                skillsResponseMessage: null,
                skillsResponseSuccess: false,
                skillsSmallLoader: true,
            };

        case EDIT_SKILL_SUCCESS:
            tmp = state.skills.slice();
            for (let x = 0; x < tmp.length; x++) {
                if (tmp[x].ID === action.payload.ID) {
                    tmp[x] = action.payload;
                    break;
                }
            }
            return {
                ...state,
                currentSkill: action.payload,
                skills: tmp,
                skillsResponseMessage: action.message,
                skillsResponseSuccess: true,
                skillsSmallLoader: false,
            };

        case GET_SKILL_BEGIN:
            return {
                ...state,
                currentCategory: null,
                categoryResponseMessage: null,
                categoryResponseSuccess: false,
                categoriesSmallLoader: true,
            };

        case GET_SKILL_SUCCESS:
            return {
                ...state,
                currentSkills: action.payload,
                skillsResponseMessage: action.message,
                skillsResponseSuccess: true,
                skillsSmallLoader: false,
            };

        case GET_SKILLS_BEGIN:
            return {
                ...state,
                skills: [],
                skillsResponseMessage: null,
                skillsResponseSuccess: false,
                skillsWaitingForResponse: true,
            };

        case GET_SKILLS_SUCCESS:
            return {
                ...state,
                skills: action.payload,
                skillsResponseMessage: action.message,
                skillsResponseSuccess: true,
                skillsWaitingForResponse: false,
                lastSkillCount: action.payload.length
            };

        case GET_MORE_SKILLS_BEGIN:
            return {
                ...state,
                skillsResponseMessage: null,
                skillsResponseSuccess: false,
                skillPullMoreLoader: true,
            };

        case GET_MORE_SKILLS_SUCCESS:
            tmp = state.skills.slice();
            tmp = tmp.concat(action.payload);
            return {
                ...state,
                skills: tmp,
                skillsResponseMessage: action.message,
                skillsResponseSuccess: true,
                skillPullMoreLoader: false,
                lastSkillCount: action.payload.length
            };


        default:
            return state;
    }

}
