import VideosList from '../components/VideosList.jsx'

import {connect} from 'react-redux'
import actions from '../store/actions/related.js'

const state2props = (state) => {
    return {
        list: state.related.items
    }
}

const dispatch2props = (dispatch) => ({
    onSelect: (videoId) => 
        (dispatch(actions.relatedOf(videoId) )
    )
})
export default connect( state2props, dispatch2props )(VideosList)