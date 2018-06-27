import fetch from 'node-fetch';

import {search, searchRelatedOf, details} from '../youtube.js'

describe('youtube v3 API', () => {
    it('search', () => {
        let subject   = `gigi masin`
        return search( subject ).then( (results) => {
            expect(results.kind).toBe('youtube#searchListResponse')
            expect(results.items.length).toBeGreaterThanOrEqual(0)

            let firstResult = results.items[0]
            expect(firstResult.id).toBeDefined()
            expect(firstResult.snippet).toBeDefined()
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
    it('details', () => {
        let videoId = `clC6cgoh1sU`
        return details(videoId).then( (results) => {
            expect(results.kind).toBe('youtube#videoListResponse')
            expect(results.items.length).toBeGreaterThanOrEqual(0)

            let firstResult = results.items[0]
            console.log("Details: ", firstResult)
            expect(firstResult.id).toBeDefined()
            expect(firstResult.snippet).toBeDefined()
        })
    })
})
