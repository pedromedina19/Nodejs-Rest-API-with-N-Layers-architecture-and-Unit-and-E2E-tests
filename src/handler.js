import {parse} from 'node:url'
import { DEFAULT_HEADER } from './util/util.js'

const allRoutes = {
    '/heroes:get': (request, response) => {
        response.write('GET')
        response.end()
    },
    //404 routes
    default: (request, response) => {
        response.writeHead(404, DEFAULT_HEADER)
        response.write('not found')
        response.end()
    }
}

function handler(request, response){
    const {
        url,
        method
    } = request
    const {
        pathname
    } = parse(url, true)
    const key = `${pathname}:${method.toLowerCase()}`
    const chosen = allRoutes[key] || allRoutes.default
    return chosen(request, response)
    response.end('Hello World')
}

export default handler