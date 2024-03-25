import test from 'node:test'
import assert from 'node:assert'
const callTracker = new assert.CallTracker()
process.on('exit', () => callTracker.verify())

import { 
  routes
} from '../../../src/routes/userRoute.js'
import { DEFAULT_HEADER } from '../../../src/util/util.js'

test('User routes - endpoints test suite', async (t) => {
  await t.test('it should call /users:get route', async () => {
    const databaseMock = [{"id":"1b1866a7-cbc3-404a-8e25-fdeafc2707de","name":"medina","age":22}]

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