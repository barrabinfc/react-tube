import { SEARCH_CLEAR, SEARCH_REQUEST, SEARCH_RESPONSE } from '../actions/search.js'

/**
 * Youtube Search reducer
 */
export const SearchReducer = (state = {
    searchSubject: 'Gigi Masin',
    searchItems: [],
    isSearching: false,
}, action ) => {
    switch(action.type) {
        case SEARCH_CLEAR:
            return {
                searchSubject: '',
                isSearching: false,
                searchItems: []
            }
        case SEARCH_REQUEST:
            return {
                ...state,
                isSearching: true,
                searchSubject: action.searchSubject
            }
        case SEARCH_RESPONSE:
            return {
                ...state,
                isSearching: false,
                searchItems: action.searchItems
            }
        default:
            return state
    }    
}