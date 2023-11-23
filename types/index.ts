type Method = 'get' | 'post' | 'put' | 'delete' | 'patch'
import Koa from 'koa'
interface MockRes {
  errno: number
  data: any
}
export interface MockItem {
  method: Method
  url: string
  response: (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>) => MockRes
}
