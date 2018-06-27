import { search as YoutubeSearch } from '../../api/youtube'

export const SEARCH_REQUEST      = 'SEARCH_REQUEST'
export const SEARCH_RESPONSE     = 'SEARCH_RESPONSE'
export const SEARCH_CLEAR    = 'SEARCH_CLEAR'
export const SEARCH_SELECT   = 'SEARCH_SELECT'

class SearchActions {

    searchClear = () => ({
        type: SEARCH_CLEAR
    })

    /** Select single video from search results */
    searchSelect = ( youtube_id ) => ({
        type: SEARCH_SELECT, id: youtube_id 
    })

    /** Async Search for `subject` in youtube */
    search = (subject) => (dispatch) => { 
        dispatch(this._searchRequest(subject))
        return YoutubeSearch( subject )
                .then(json => dispatch(this._searchResponse(subject, json)))
    }


    
    _searchRequest( subject ) {
        return {type: SEARCH_REQUEST, searchSubject: subject}
    }

    _searchResponse( subject, results ) {
        return {type: SEARCH_RESPONSE, searchSubject: subject, searchItems: results}
    }

}

export default new SearchActions()