import { connect } from 'react-redux'
import actions from '../store/actions/index.js'

import App from '../components/App.jsx'

const state2props = (state) => {
  console.log("App:state2props", state)
  return {
      active: state.player,
      related: state.related,
  }
}

const dispatch2props = (dispatch) => ({
  onSearch: (searchTerm) => 
      (dispatch(actions.search(searchTerm) )
  )
})

export default connect( state2props, dispatch2props )(App)