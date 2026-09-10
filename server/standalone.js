import http from 'node:http'
import { handleApiRequest } from './api.js'

const PORT = process.env.PORT || 3001

const server = http.createServer((req, res) => {
  // Add CORS headers for standalone development
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  if (req.url?.startsWith('/api/')) {
    return handleApiRequest(req, res)
  }

  res.statusCode = 404
  res.end('Not found')
})

server.listen(PORT, () => {
  console.log(`B-FIT Standalone API server running at http://localhost:${PORT}`)
})
