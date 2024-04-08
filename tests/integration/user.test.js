import test from 'node:test'
import assert from 'node:assert'
import {promisify} from 'node:util'

let userId;

test('User Integration Test Suite', async(t) => {
    const testPort = 9009

    //warning warning warning
    //It's a bad practice cause it mutates the environment
    process.env.PORT = testPort
    const {server} = await import('../../src/index.js')

    const testServerAddress = `http://localhost:${testPort}/users`

    await t.test('it should create a user', async(t) => {
        const data = {
            "name":"a",
            "age":22
        }
        const request = await fetch(testServerAddress, {
            method: 'POST',
            body: JSON.stringify(data)
        })
    
        assert.strictEqual(request.status, 201)
    
        const result = await request.json()
        userId = result.id; // save userID so I can use later at the other tests
        assert.deepStrictEqual(
            result.success,
            'user created with success',
            'it should return a valid text message'
        )

        assert.ok(
            result.id.length > 30, 
            'id should be a valid UUID'
        )
    })

    // Teste para PUT (update)
    await t.test('it should update a user', async(t) => {
        const data = {
            "id": userId,
            "name": "b",
            "age":10
        }
        const response = await fetch(testServerAddress, {
            method: 'PUT',
            body: JSON.stringify(data)
        })

        assert.strictEqual(response.status, 200)

        const result = await response.json()
        assert.deepStrictEqual(
            result.success,
            'user updated with success',
            'it should return a valid text message'
        )
    })


    // Teste para PATCH
    await t.test('it should partially update a user', async(t) => {
        const data = {
            "id": userId,
            "name": "c"
        }
        const response = await fetch(testServerAddress, {
            method: 'PATCH',
            body: JSON.stringify(data)
        })

        assert.strictEqual(response.status, 200)

        const result = await response.json()
        assert.deepStrictEqual(
            result.success,
            'user partially updated with success',
            'it should return a valid text message'
        )
    })

    // Teste para DELETE
    await t.test('it should delete a user', async(t) => {
        const data = {
            "id": userId
        }
        const response = await fetch(testServerAddress, {
            method: 'DELETE',
            body: JSON.stringify(data)
        })

        assert.strictEqual(response.status, 200)

        const result = await response.json()
        assert.deepStrictEqual(
            result.success,
            'user deleted with success',
            'it should return a valid text message'
        )
    })

   
    await promisify(server.close.bind(server))()
})