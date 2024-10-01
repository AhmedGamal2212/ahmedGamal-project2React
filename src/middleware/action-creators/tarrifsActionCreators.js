import {
    ACTIVATE_CHANNEL_BEGIN, ACTIVATE_CHANNEL_SUCCESS,
    ADD_CHANNEL_BEGIN, ADD_CHANNEL_SUCCESS,
    DEACTIVATE_CHANNEL_BEGIN, DEACTIVATE_CHANNEL_SUCCESS,
    DELETE_CHANNEL_BEGIN, DELETE_CHANNEL_SUCCESS,
    EDIT_CHANNEL_BEGIN, EDIT_CHANNEL_SUCCESS,
    EDIT_CHANNEL_TARRIFS_BEGIN, EDIT_CHANNEL_TARRIFS_SUCCESS,
    GET_CHANNELS_BEGIN, GET_CHANNELS_SUCCESS,
    GET_CHANNEL_BEGIN, GET_CHANNEL_SUCCESS,
    GET_CHANNEL_TARRIFS_BEGIN, GET_CHANNEL_TARRIFS_SUCCESS,
    GET_MORE_CHANNELS_BEGIN, GET_MORE_CHANNELS_SUCCESS,
    GET_MORE_CHANNEL_TARRIFS_BEGIN, GET_MORE_CHANNEL_TARRIFS_SUCCESS,
    SET_CHANNEL_ERROR
} from "../actions/tarrifsActions";
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
 * Set Channel Error
 * @param message
 * @returns {{payload, type: string}}
 */
export const setChannelsError = (message) => ({
    type: SET_CHANNEL_ERROR,
    payload: message
});



/**
 * Set Channel Tarrifs Error
 * @param message
 * @returns {{payload, type: string}}
 */
export const setChannelTariffsError = (message) => ({
    type: "SET_CHANNEL_TARIFFS_ERROR",
    payload: message
});



/** 
 * Validating a channel
 * @param channelDetails, basicCheck
 * @returns string
 */

const validateChannelDetails = (channelDetails) => {

    if (channelDetails === undefined) {
        return "Invalid input"
    }

    if (channelDetails.name === undefined || channelDetails.name.trim("") === 0) {
        return "Fill establishment name"
    }
    if (channelDetails.created_by === undefined || isNaN(parseInt(channelDetails.created_by)) === true || channelDetails.created_by < 0) {
        return "Fill a valid user"
    }

    if (channelDetails.logo === undefined || channelDetails.logo.trim("") === 0) {
        return "Fill a business logo"
    }


    if (channelDetails.commission === undefined || isNaN(parseInt(channelDetails.commission)) === true || channelDetails.commission < 0) {
        return "Fill a commission"
    }

    return null
}

/**
 * Adding a new channel
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function addChannel(payload) {

    return async (dispatch) => {

        const validationError = validateChannelDetails(payload)
        if (validationError !== null) {
            dispatch(setChannelsError(validationError));
            return
        }

        let url = 'add-channel';

        dispatch(BeginAction(ADD_CHANNEL_BEGIN));
        const response = await networkRequest(url, payload, 'POST');
        if (response.code === 200) {
            dispatch(SuccessfulAction(ADD_CHANNEL_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setChannelsError(response.message || response.payload));
        }
    };
}



/**
 * Activate a channel
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function activateChannel(payload) {

    return async (dispatch) => {

        if (payload === undefined) {
            dispatch(setChannelsError('Invalid payload was submitted'));
            return;
        }

        let url = 'activate-channel';

        dispatch(BeginAction(ACTIVATE_CHANNEL_BEGIN));
        const response = await networkRequest(url, payload, 'POST');
        if (response.code === 200) {
            dispatch(SuccessfulAction(ACTIVATE_CHANNEL_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setChannelsError(response.message || response.payload));
        }
    };
}



/**
 * Deactivate a channel
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function deactivateChannel(payload) {

    return async (dispatch) => {

        if (payload === undefined) {
            dispatch(setChannelsError('Invalid payload was submitted'));
            return;
        }

        let url = 'deactivate-channel';

        dispatch(BeginAction(DEACTIVATE_CHANNEL_BEGIN));
        const response = await networkRequest(url, payload, 'POST');
        if (response.code === 200) {
            dispatch(SuccessfulAction(DEACTIVATE_CHANNEL_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setChannelsError(response.message || response.payload));
        }
    };
}



/**
 * Delete a specific channel
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function deleteChannel(payload) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setChannelsError('Invalid payload was submitted'));
            return;
        }
        let url = 'delete-channel';

        dispatch(BeginAction(DELETE_CHANNEL_BEGIN));
        const response = await networkRequest(url, payload, 'DELETE');
        if (response.code === 200) {
            dispatch(SuccessfulAction(DELETE_CHANNEL_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setChannelsError(response.message || response.payload));
        }
    };
}



/**
 * Update a specific channel
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function editChannel(payload) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setChannelsError('Invalid payload was submitted'));
            return;
        }
        let url = 'update-channel';

        dispatch(BeginAction(EDIT_CHANNEL_BEGIN));
        const response = await networkRequest(url, payload, 'POST');
        if (response.code === 200) {
            dispatch(SuccessfulAction(EDIT_CHANNEL_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setChannelsError(response.message || response.payload));
        }
    };
}



/**
 * Getting a specific channel
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function getChannel(payload) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setChannelsError('Invalid payload was submitted'));
            return;
        }
        let url = 'get-channel?true=true';

        for (const [key, value] of Object.entries(payload)) {
            url += `&${key}=${value}`;
        }

        dispatch(BeginAction(GET_CHANNEL_BEGIN));
        const response = await networkRequest(url, null, 'GET');
        if (response.code === 200) {
            dispatch(SuccessfulAction(GET_CHANNEL_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setChannelsError(response.message || response.payload));
        }
    };
}

/**
 * Getting channels
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function getChannels(payload, appending = false) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setChannelsError('Invalid payload was submitted'));
            return;
        }
        let url = 'get-channels?true=true';

        for (const [key, value] of Object.entries(payload)) {
            url += `&${key}=${value}`;
        }

        if (appending) {
            dispatch(BeginAction(GET_MORE_CHANNELS_BEGIN));
            const response = await networkRequest(url, null, 'GET');
            if (response.code === 200) {
                dispatch(SuccessfulAction(GET_MORE_CHANNELS_SUCCESS, response.payload, response.message));
            } else {
                dispatch(setChannelsError(response.message || response.payload))
            }
        } else {
            dispatch(BeginAction(GET_CHANNELS_BEGIN));
            const response = await networkRequest(url, null, 'GET');
            if (response.code === 200) {
                dispatch(SuccessfulAction(GET_CHANNELS_SUCCESS, response.payload, response.message));
            } else {
                dispatch(setChannelsError(response.message || response.payload));
            }
        };
    }
};



/** CHANNEL TARRIFS STARTS HERE */

/**
 * Getting channel tarrifs
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function getChannelTarrifs(payload, appending = false) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setChannelsError('Invalid payload was submitted'));
            return;
        }
        let url = 'get-channel-tariffs?true=true';

        for (const [key, value] of Object.entries(payload)) {
            url += `&${key}=${value}`;
        }

        if (appending) {
            dispatch(BeginAction(GET_MORE_CHANNEL_TARRIFS_BEGIN));
            const response = await networkRequest(url, null, 'GET');
            if (response.code === 200) {
                dispatch(SuccessfulAction(GET_MORE_CHANNEL_TARRIFS_SUCCESS, response.payload, response.message));
            } else {
                dispatch(setChannelsError(response.message || response.payload))
            }
        } else {
            dispatch(BeginAction(GET_CHANNEL_TARRIFS_BEGIN));
            const response = await networkRequest(url, null, 'GET');
            if (response.code === 200) {
                dispatch(SuccessfulAction(GET_CHANNEL_TARRIFS_SUCCESS, response.payload, response.message));
            } else {
                dispatch(setChannelsError(response.message || response.payload));
            }
        };
    }
};

/**
 * Update a specific channel tarrif
 * @param payload
 * @returns {(function(*): Promise<void>)|*}
 */
export function updateChannelTarrifs(payload) {

    return async (dispatch) => {
        if (payload === undefined) {
            dispatch(setChannelTariffsError('Invalid payload was submitted'));
            return;
        }
        let url = 'update-channel-tariffs';

        dispatch(BeginAction(EDIT_CHANNEL_TARRIFS_BEGIN));
        const response = await networkRequest(url, payload, 'POST');
        if (response.code === 200) {
            dispatch(SuccessfulAction(EDIT_CHANNEL_TARRIFS_SUCCESS, response.payload, response.message));
        } else {
            dispatch(setChannelTariffsError(response.message || response.payload));
        }
    };
}





