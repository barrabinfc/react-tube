import { connect } from 'react-redux'
import actions from '../store/actions/index.js'

import App from '../components/App.jsx'

const state2props = (state) => {
  return {
      player: state.player,
      related: state.related,
      
      isLoading: state.player.isLoading
  }
}

const dispatch2props = (dispatch) => ({
  onDefaultAction: (ev) => {
    ev.preventDefault()

    let suggestions   = ['_fuIMye31Gw', 'mSS5p9BdNGU', 'd4Ws3jTM_cQ', 
                         'SDeuYY3Hi_I', 'rMdf9AL_6Bw', 'ZwQwXlQyha8',
                         'r9TgaoA3NhE', '7NOpNs3UmKM', 'DJDz7eEurxE',
                         'y374WwqZtOI', 'Rilf6ZQxZ2s', 'hZevnHRcibU']
    let s = suggestions[ Math.floor( Math.random()*suggestions.length) ]

    dispatch(actions.player.goto( s ))
  },
  onVideoSelect: (videoId) => {
    console.log("App:videoSelect ", videoId )
    dispatch(actions.player.goto( videoId ))
  }
})

export default connect( state2props, dispatch2props )(App)