import { combineReducers } from 'redux'

//import { SearchReducer } from './search.js'
import { PlayerReducer } from './player.js'
import { RelatedReducer } from './related.js'

const rootReducer = combineReducers({
    //'search': SearchReducer,
    'player': PlayerReducer,
    'related': RelatedReducer
})

export default rootReducer