import { handleApiRequest } from './api.js'

export function bfitApiPlugin() {
  return {
    name: 'bfit-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/api/')) {
          return handleApiRequest(req, res)
        }
        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/api/')) {
          return handleApiRequest(req, res)
        }
        next()
      })
    }
  }
}

export default bfitApiPlugin
