import { searchRelatedOf as YoutubeRelated } from '../../api/youtube'

export const RELATED_REQUEST      = 'RELATED_REQUEST'
export const RELATED_RESPONSE     = 'RELATED_RESPONSE'

class RelatedActions {

    /** Async Search related for video `videoID` in youtube */
    relatedOf = (videoId) => (dispatch) => { 
        dispatch(this._relatedRequest(videoId))
        return YoutubeRelated( videoId )
                .then(json => dispatch(this._relatedResponse(videoId, json)))
    }

    
    _relatedRequest( videoId ) {
        return {type: RELATED_REQUEST, videoId: videoId}
    }

    _relatedResponse( videoId, results ) {
        return {type: RELATED_RESPONSE, videoId: videoId, related: results}
    }

}

export default new RelatedActions()