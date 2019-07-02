const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('test-db.json')
const middlewares = jsonServer.defaults({ noCors: false })
server.use(middlewares)


server.use(jsonServer.rewriter({
    '/:route/all': '/:route',
    '/tracker/:id': '/tracker?trackerId=:id',
    '/invoice/:id/recalculate': '/invoice/:id'
}))

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})