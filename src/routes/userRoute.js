import {once} from 'node:events'
import User from '../entities/user.js'
import { DEFAULT_HEADER } from '../util/util.js'

const routes = ({
    userService
}) => ({
    '/users:get': async (request, response) => {
        const users = await userService.find()

        response.write(JSON.stringify({results: users}))
        return response.end()
    },
    '/users:post': async (request, response) => {
        const data = await once(request, 'data')
        const item = JSON.parse(data)
        const user = new User(item)
        const id = await userService.create(user)
        response.writeHead(201, DEFAULT_HEADER)
        response.write(JSON.stringify({
            id,
            success: 'user created with success',
        }))
        return response.end()
    },
    '/users:put': async (request, response) => {
        const data = await once(request, 'data')
        const { id, ...userData } = JSON.parse(data)
        await userService.update(id, userData)
        response.writeHead(200, DEFAULT_HEADER)
        response.write(JSON.stringify({
            success: 'user updated with success',
        }))
        return response.end()
    },    
    '/users:patch': async (request, response) => {
        const data = await once(request, 'data')
        const { id, ...userData } = JSON.parse(data)
        await userService.patch(id, userData)
        response.writeHead(200, DEFAULT_HEADER)
        response.write(JSON.stringify({
            success: 'user partially updated with success',
        }))
        return response.end()
    },    
    '/users:delete': async (request, response) => {
        const data = await once(request, 'data')
        const { id } = JSON.parse(data)
        await userService.delete(id)
        response.writeHead(200, DEFAULT_HEADER)
        response.write(JSON.stringify({
            success: 'user deleted with success',
        }))
        return response.end()
    },    
})

export {
    routes
}