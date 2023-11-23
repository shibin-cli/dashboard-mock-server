import Koa from 'koa'
import Router from '@koa/router'
import { koaBody } from 'koa-body'
import jwt from 'koa-jwt'
import { publicKey } from './config'
import mocklist from './mock'

const app = new Koa()

const router = new Router({
  prefix: '/api',
})
app.use(koaBody())
app.use(jwt({ secret: publicKey }).unless({ path: ['/api/login', '/api/register'] }))

function sleep(second: number) {
  return new Promise(resolve => {
    setTimeout(resolve, 1000 * second)
  })
}
mocklist.forEach(item => {
  const { url, method, response } = item
  router[method](url, async ctx => {
    await sleep(0.5)
    ctx.body = response(ctx)
  })
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(8080)
