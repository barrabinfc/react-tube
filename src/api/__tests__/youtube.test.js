import fetch from 'node-fetch';

import {search, searchRelatedOf} from '../youtube.js'

describe('youtube v3 API', () => {
    it('search', () => {
        let subject   = `gigi masin`
        return search( subject ).then( (results) => {
            expect(results.kind).toBe('youtube#searchListResponse')
            expect(results.items.length).toBeGreaterThanOrEqual(0)

            let firstResult = results.items[0]
            expect(firstResult.id).toBeDefined()
            expect(firstResult.snippet).toBeDefine d()
        })
    })
    it('related', () => {
        let videoId = `d4Ws3jTM_cQ`
        return searchRelatedOf(videoId).then( (results) => {
            expect(results.kind).toBe('youtube#searchListResponse')
            expect(results.items.length).toBeGreaterThanOrEqual(0)

            let firstResult = results.items[0]
            expect(firstResult.id).toBeDefined()
            expect(firstResult.snippet).toBeDefined()
        })
    }) 
})
