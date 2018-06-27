import { details as YoutubeDetails } from '../../api/youtube'

import RelatedActions from './related.js'

export const CLEAR                  = 'PLAYER_CLEAR'
export const GOTO                   = 'PLAYER_GOTO'
export const DETAILS_REQUEST        = 'PLAYER_DETAILS_REQUEST'
export const DETAILS_RESPONSE       = 'PLAYER_DETAILS_RESPONSE'

class PlayerActions {

    clear = () => ({
        type: CLEAR
    })

    /** Async Search for `subject` in youtube */
    goto = (videoId) => (dispatch) => { 
        dispatch(this._detailsRequest(videoId))
        
        // also trigger related search
        dispatch(RelatedActions.relatedOf(videoId))

        return YoutubeDetails( videoId )
                .then(json => dispatch(this._detailsResponse(videoId, json)))
    }


    _detailsRequest( videoId ) {
        return {type: DETAILS_REQUEST, videoId: videoId}
    }

    _detailsResponse( videoId, result ) {
        return {type: DETAILS_RESPONSE, videoId: videoId, videoData: result}
    }

}

export default new PlayerActions()