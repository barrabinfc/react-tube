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
  onDefaultAction: () => {
    dispatch(actions.player.goto('_fuIMye31Gw'))
  }
})

export default connect( state2props, dispatch2props )(App)