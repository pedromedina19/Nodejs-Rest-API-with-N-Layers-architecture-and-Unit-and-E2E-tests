import test from 'node:test'
import assert from 'node:assert'
const callTracker = new assert.CallTracker()
process.on('exit', () => callTracker.verify())

import { 
  routes
} from './../../../src/routes/userRoute.js'
import { DEFAULT_HEADER } from '../../../src/util/util.js'

test('User routes - endpoints test suite', async (t) => {
  await t.test('it should call /users:get route', async () => {
    const databaseMock = [{
      "id": "90bf10a3-c9fb-406a-a35a-3e4a8db0fbf8",
      "name": "Batman",
      "age": 50
    }]

    const userServiceStub = {
      find: async () => databaseMock
    }

    const endpoints = routes({
      userService: userServiceStub
    })

    const endpoint  = '/users:get'
    const request = {}
    const response = {
      write: callTracker.calls(item => {
        const expected = JSON.stringify({
          results: databaseMock
        })
        assert.strictEqual(
          item,
          expected,
          'write should be called with the correct payload'
        )
      }),
      end: callTracker.calls(item => {
        assert.strictEqual(
          item,
          undefined,
          'end should be called without params'
        )
      })
    }
    const route = endpoints[endpoint]
    await route(request, response)

  })
  await t.todo('it should call /users:post route')
})