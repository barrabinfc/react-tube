import { combineReducers } from 'redux'

import { SearchReducer } from './search.js'
import { PlayerReducer } from './player.js'

const rootReducer = combineReducers({
    'search': SearchReducer,
    'player': PlayerReducer
})

export default rootReducer