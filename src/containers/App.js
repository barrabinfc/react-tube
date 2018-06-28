import { connect } from 'react-redux'
import actions from '../store/actions/index.js'

import App from '../components/App.jsx'

const state2props = (state) => {
  return {
      player: state.player,
      related: state.related,
  }
}

const dispatch2props = (dispatch) => ({
  onDefaultAction: (ev) => {
    ev.preventDefault()

    let suggestions   = ['_fuIMye31Gw', 'mSS5p9BdNGU', 'd4Ws3jTM_cQ', 'SDeuYY3Hi_I']
    let s = suggestions[ Math.floor( Math.random()*suggestions.length) ]

    dispatch(actions.player.goto( s ))
  },
  onVideoSelect: (videoId) => {
    dispatch(actions.player.goto( videoId ))
  }
})

export default connect( state2props, dispatch2props )(App)