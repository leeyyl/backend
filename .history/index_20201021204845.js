const http = require('http')

const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type'})
})