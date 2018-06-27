import VideosList from '../components/VideosList.jsx'

import {connect} from 'react-redux'
import actions from '../store/actions/index.js'

const state2props = (state) => {
    return {
        items: state.related.items
    }
}

const dispatch2props = (dispatch) => ({
    onSelect: (videoId) => 
        (dispatch(actions.player.goto(videoId) )
    )
})
export default connect( state2props, dispatch2props )(VideosList)