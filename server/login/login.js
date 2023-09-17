// assert实验特性，不稳定，原生的cjs模块支持直接导入json
import response from './response.json' assert {
  type: 'json'
}
console.log(response)
const routerItem = {
  path: '/login',
  handle: login
}

function helper() {
  return JSON.stringify(response)
}

async function login(ctx) {
  console.log(ctx.query)
  ctx.res.end(helper())
}

export default routerItem