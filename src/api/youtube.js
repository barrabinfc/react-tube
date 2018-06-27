/**
 * Youtube API 
 */

const API_KEY = 'AIzaSyA84xjydegSxJZz03yxgOG5dB48q0C1DSM'

/** URL Querystring encoding 
 *  note: params is shallow 
 */
const urlQS = (url, params) => {
    let queryParams = Object.keys(params)
                            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
                            .join('&')

    return new URL(`${url}?${queryParams}`)
}

/**
 * Youtube REST Api wrapper.
 */
export function youtubeREST(URI='https://www.googleapis.com/youtube/v3/search', opts={}) {
    const data = {
        ...opts, ...{
            key: API_KEY
        }
    }
    let url = urlQS(URI, data)
    return fetch(url)
        .then(response => response.json())
}

/**
 * Youtube Search
 */
export function search(subject, opts = {q: subject}) {
    const data = {
        ...opts, ...{
            part: 'snippet',
            type: 'video',
            order: 'viewCount'
        }
    }

    return youtubeREST('https://www.googleapis.com/youtube/v3/search', data)
}

/**
 * Search for related videos of `videoId`
 * @param {String} videoId 
 */
export function searchRelatedOf( videoId ) {
    return search( undefined, {'relatedToVideoId': videoId })
}

/**
 * Retieve detailed info for `videoId`
 */
export function details( videoId ) {
    const data = {
        part: 'snippet,contentDetails,status,topicDetails,statistics',
        type: 'video',
        id: videoId
    }

    return youtubeREST('https://www.googleapis.com/youtube/v3/videos', data)
}