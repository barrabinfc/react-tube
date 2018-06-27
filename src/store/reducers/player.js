import { CLEAR, DETAILS_REQUEST, DETAILS_RESPONSE } from '../actions/player.js'

import {MockVideoData} from '../../mock/index.js'

/**
 * Current Video reducer
 */
export const PlayerReducer = (state = {
    ...MockVideoData,
    ...{isLoading:  false, videoId:    false},
}, action ) => {
    switch(action.type) {
        case CLEAR:
            return {
                ...MockVideoData,
                
                isLoading: false,
            }
        case DETAILS_REQUEST:
            return {
                ...state,

                isLoading: true,
            }
        case DETAILS_RESPONSE:
            let videoInfo = action.videoData.items[0]
            return {
                ...state,
                ...videoInfo.snippet,

                'isLoading': false,
                
                'videoId':    videoInfo.id,
                'details':    videoInfo.contentDetails,
                'statistics': videoInfo.statistics,
            }
        default:
            return state
    }    
}