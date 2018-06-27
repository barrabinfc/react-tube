import fetch from 'node-fetch';

import {search} from '../youtube.js'

describe('youtube v3 API', () => {
    it('search', () => {
        let query   = `gigi masin`
        return search( query ).then( (results) => {
            expect(results.kind).toBe('youtube#searchListResponse')
            expect(results.items.length).toBeGreaterThanOrEqual(0)

            let firstResult = results.items[0]
            console.log(firstResult)
        })
    })
})
