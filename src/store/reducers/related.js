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
                items: action.related
            }
        case RELATED_RESPONSE:
            return {
                ...state,
                isSearching: false,
                items: action.related
            }
        default:
            return state
    }    
}