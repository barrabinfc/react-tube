import SearchBar from '../components/SearchBar.jsx'

import {connect} from 'react-redux'
import actions from '../store/actions/search.js'

const state2props = (state) => {
    return {
        searchItems: state.search.searchItems
    }
}

const dispatch2props = (dispatch) => ({
    onSearch: (searchTerm) => 
        (dispatch(actions.search(searchTerm) )
    )
})
export default connect( state2props, dispatch2props )(SearchBar)