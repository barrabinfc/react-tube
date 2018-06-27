/**
 * Youtube API 
 */

const API_KEY = 'AIzaSyA84xjydegSxJZz03yxgOG5dB48q0C1DSM'

/** URL Querystring encoding 
 *  note: shallow
 */
const urlQS = (url, params) => {
    let queryParams = Object.keys(params).map(key => encodeURIComponent(key) + '='+ encodeURIComponent(params[key]))
                                         .join('&')
    
    return new URL(`${url}?${queryParams}`)
}

/**
 * Youtube Search
 */
export function search( subject ) {
    const API_URI = 'https://www.googleapis.com/youtube/v3/search'
    const data = {q: subject, 
                  part: 'id,snippet',
                  key: API_KEY }
    
    let url = urlQS( API_URI, data)

    return fetch(url)
                .then(response => response.json())
}