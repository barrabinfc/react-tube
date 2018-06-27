import { SEARCH_CLEAR, SEARCH_REQUEST, SEARCH_RESPONSE } from '../actions/search'

/**
 * Current Video reducer
 */
export const PlayerReducer = (state = {
    videoId: undefined,
    publishedAt: `2015-05-28T09:19:05.000Z`,
    title:       'Erik Satie - Once Upon A Time In Paris',
    description: `Erik Satie - Gymnopédie No.1`,
    channelTitle:      'Estoy Perdida',
    channelId:         '',        
    thumbnail:   {
        'default': 'https://img.youtube.com/vi/_fuIMye31Gw/0.jpg',
        'hight':   'https://img.youtube.com/vi/_fuIMye31Gw/0.jpg',
        'medium':  'https://img.youtube.com/vi/_fuIMye31Gw/0.jpg'
    }
}, action ) => {
    switch(action.type) {
        default:
            return state
    }    
}