import {
    GET_CHANNEL_BEGIN, GET_CHANNEL_SUCCESS,
    GET_CHANNELS_BEGIN, GET_CHANNELS_SUCCESS,
    SET_CHANNEL_ERROR,
    ADD_CHANNEL_BEGIN, ADD_CHANNEL_SUCCESS,
    DELETE_CHANNEL_BEGIN, DELETE_CHANNEL_SUCCESS,
    EDIT_CHANNEL_BEGIN, EDIT_CHANNEL_SUCCESS,
    GET_MORE_CHANNELS_BEGIN, GET_MORE_CHANNELS_SUCCESS,
    ACTIVATE_CHANNEL_BEGIN, ACTIVATE_CHANNEL_SUCCESS,
    DEACTIVATE_CHANNEL_BEGIN, DEACTIVATE_CHANNEL_SUCCESS, GET_CHANNEL_TARRIFS_BEGIN, GET_CHANNEL_TARRIFS_SUCCESS, GET_MORE_CHANNEL_TARRIFS_BEGIN, GET_MORE_CHANNEL_TARRIFS_SUCCESS, EDIT_CHANNEL_TARRIFS_BEGIN, EDIT_CHANNEL_TARRIFS_SUCCESS
} from '../actions/tarrifsActions';

const initialState = {
    currentChannel: null,
    channels: [],

    lastChannelsCount: 0,
    channelResponseMessage: null,
    channelResponseSuccess: false,
    channelWaitingForResponse: false,
    channelSmallLoader: false,

    currentChannelTarrif: null,
    channelTarrifs: [],
    lastChannelTarrifsCount: 0,
    channelTarrifResponseMessage: null,
    channelTarrifResponseSuccess: false,
    channelTarrifWaitingForResponse: false,
    channelTarrifSmallLoader: false,
};

export default function tarrifsReducer(state = initialState, action) {
    let tmp = null;

    switch (action.type) {
        case SET_CHANNEL_ERROR:
            return {
                ...state,
                channelResponseMessage: action.payload,
                channelResponseSuccess: false,
                channelWaitingForResponse: false,
                channelSmallLoader: false,
            };

        case "SET_CHANNEL_TARIFFS_ERROR":
            return {
                ...state,
                channelTarrifResponseMessage: action.payload,
                channelTarrifResponseSuccess: false,
                channelTarrifWaitingForResponse: false,
                channelTarrifSmallLoader: false,
            };

        case ADD_CHANNEL_BEGIN:
            return {
                ...state,
                currentChannel: null,
                channelResponseMessage: null,
                channelResponseSuccess: false,
                channelSmallLoader: true,
            };

        case ADD_CHANNEL_SUCCESS:
            tmp = state.channels.slice();
            tmp.push(action.payload);
            return {
                ...state,
                channels: tmp,
                currentChannel: action.payload,
                channelResponseMessage: action.message,
                channelResponseSuccess: true,
                channelSmallLoader: false
            };

        case ACTIVATE_CHANNEL_BEGIN:
            return {
                ...state,
                currentChannel: null,
                channelResponseMessage: null,
                channelResponseSuccess: false,
                channelWaitingForResponse: true,
            };

        case ACTIVATE_CHANNEL_SUCCESS:
            tmp = state.channels.slice();
            for (let x = 0; x < tmp.length; x++) {
                if (tmp[x].ID === action.payload.ID) {
                    tmp[x].ID = action.payload;
                    break;
                }
            }
            return {
                ...state,
                currentChannel: action.payload,
                channels: tmp,
                channelResponseMessage: action.message,
                channelResponseSuccess: true,
                channelWaitingForResponse: false,
            };

        case DEACTIVATE_CHANNEL_BEGIN:
            return {
                ...state,
                currentChannel: null,
                channelResponseMessage: null,
                channelResponseSuccess: false,
                channelWaitingForResponse: true,
            };

        case DEACTIVATE_CHANNEL_SUCCESS:
            tmp = state.channels.slice();
            for (let x = 0; x < tmp.length; x++) {
                if (tmp[x].ID === action.payload.ID) {
                    tmp[x].ID = action.payload;
                    break;
                }
            }
            return {
                ...state,
                currentChannel: action.payload,
                channels: tmp,
                channelResponseMessage: action.message,
                channelResponseSuccess: true,
                channelWaitingForResponse: false,
            };

        case DELETE_CHANNEL_BEGIN:
            return {
                ...state,
                channelResponseMessage: null,
                channelResponseSuccess: false,
                channelSmallLoader: true,
            };

        case DELETE_CHANNEL_SUCCESS:
            tmp = state.channels.slice();
            for (let x = 0; x < tmp.length; x++) {
                if (tmp[x].ID === state.currentChannel.ID) {
                    tmp.splice(x, 1)
                    break
                }
            }
            return {
                ...state,
                channels: tmp,
                currentChannel: null,
                channelResponseMessage: action.message,
                channelResponseSuccess: true,
                channelSmallLoader: false,
            };

        case EDIT_CHANNEL_BEGIN:
            return {
                ...state,
                currentChannel: null,
                channelResponseMessage: null,
                channelResponseSuccess: false,
                channelSmallLoader: true,
            };

        case EDIT_CHANNEL_SUCCESS:
            tmp = state.channels.slice();
            for (let x = 0; x < tmp.length; x++) {
                if (tmp[x].ID === action.payload.ID) {
                    tmp[x].ID = action.payload;
                    break;
                }
            }
            return {
                ...state,
                currentChannel: action.payload,
                channels: tmp,
                channelResponseMessage: action.message,
                channelResponseSuccess: true,
                channelSmallLoader: false,
            };

        case GET_CHANNEL_BEGIN:
            return {
                ...state,
                currentChannel: null,
                channelResponseMessage: null,
                channelResponseSuccess: false,
                channelSmallLoader: true,
            };

        case GET_CHANNEL_SUCCESS:
            return {
                ...state,
                currentChannel: action.payload,
                channelResponseMessage: action.message,
                channelResponseSuccess: true,
                channelSmallLoader: false,
            };

        case GET_CHANNELS_BEGIN:
            return {
                ...state,
                channels: [],
                channelResponseMessage: null,
                channelResponseSuccess: false,
                channelWaitingForResponse: true,
            };

        case GET_CHANNELS_SUCCESS:
            return {
                ...state,
                channels: action.payload,
                channelResponseMessage: action.message,
                channelResponseSuccess: true,
                channelWaitingForResponse: false,
                lastChannelsCount: action.payload.length
            };

        case GET_MORE_CHANNELS_BEGIN:
            return {
                ...state,
                channelResponseMessage: null,
                channelResponseSuccess: false,
                channelSmallLoader: true,
            };

        case GET_MORE_CHANNELS_SUCCESS:
            tmp = state.channels.slice();
            tmp = tmp.concat(action.payload);
            return {
                ...state,
                channels: tmp,
                channelResponseMessage: action.message,
                channelResponseSuccess: true,
                channelSmallLoader: false,
                lastChannelsCount: action.payload.length
            };

        /** CHANNEL TARRIFS STARTS HERE */

        case GET_CHANNEL_TARRIFS_BEGIN:
            return {
                ...state,
                channelTarrifs: [],
                channelResponseMessage: null,
                channelTarrifResponseSuccess: false,
                channelTarrifResponseMessage: null,
                channelTarrifWaitingForResponse: true,
            };

        case GET_CHANNEL_TARRIFS_SUCCESS:
            return {
                ...state,
                channelTarrifs: action.payload,
                channelResponseMessage: action.message,
                channelTarrifResponseMessage: null,
                channelTarrifResponseSuccess: true,
                channelTarrifWaitingForResponse: false,
                lastChannelTarrifsCount: action.payload.length
            };

        case GET_MORE_CHANNEL_TARRIFS_BEGIN:
            return {
                ...state,
                channelResponseMessage: null,
                channelTarrifResponseSuccess: false,
                channelTarrifSmallLoader: true,
            };

        case GET_MORE_CHANNEL_TARRIFS_SUCCESS:
            tmp = state.channelTarrifs.slice();
            tmp = tmp.concat(action.payload);
            return {
                ...state,
                channelTarrifs: tmp,
                channelResponseMessage: action.message,
                channelTarrifResponseSuccess: true,
                channelTarrifSmallLoader: false,
                lastChannelTarrifsCount: action.payload.length
            };

        case EDIT_CHANNEL_TARRIFS_BEGIN:
            return {
                ...state,
                // currentChannelTarrif: null,
                channelTarrifResponseMessage: null,
                channelTarrifResponseSuccess: false,
                channelTarrifSmallLoader: true,
            };

        case EDIT_CHANNEL_TARRIFS_SUCCESS:
            // tmp = state.channelTarrifs.slice();
            // for (let x = 0; x < tmp.length; x++) {
            //     if (tmp[x].ID === action.payload.ID) {
            //         tmp[x].ID = action.payload;
            //         break;
            //     }
            // }
            return {
                ...state,
                // currentChannelTarrif: action.payload,
                channelTarrifs: action.payload,
                channelTarrifResponseMessage: action.message,
                channelTarrifResponseSuccess: true,
                channelTarrifSmallLoader: false,
            };





        default:
            return state;
    }

}
