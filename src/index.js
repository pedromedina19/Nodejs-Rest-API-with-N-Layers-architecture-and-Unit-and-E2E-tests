import http, { request } from 'node:http'

const PORT = process.env.PORT || 3000

const server = http.createServer((request, response) => {
    response.end('Hello World')
}).listen(PORT, () => console.log(`server is running at ${PORT}`))

export{
    server
}