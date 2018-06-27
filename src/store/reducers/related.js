import { RELATED_REQUEST, RELATED_RESPONSE } from '../actions/related.js'

/**
 * Youtube Related Videos reducer
 */
export const RelatedReducer = (state = {
    items: [],
    isSearching: false
}, action ) => {
    switch(action.type) {
        case RELATED_REQUEST:
            return {
                ...state,
                isSearching: true,
            }
        case RELATED_RESPONSE:
            return {
                ...state,
                isSearching: false,

                /** Format data according to PropType */
                items: action.related.items.map( (item) => {
                    return {
                        videoId: item.id.videoId,
                        ...item.snippet
                    }
                })
            }
        default:
            return state
    }    
}