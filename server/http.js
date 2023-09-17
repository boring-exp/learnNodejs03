// http 的服务端
// 一直运行的状态
import http from 'node:http'

// 路由表
const router = [
  { path: '/', handle: async (ctx) => { ctx.res.end('根路径') } },
  { path: '/login', handle: async (ctx) => { ctx.res.end(JSON.stringify({ success: true })) } }
]


const server = http.createServer(async (req, res) => {
  // http请求通过 [请求方法 + 请求url] 区分接口功能
  // console.log(req.url, req.method)
  // 如何让不同的url+method组合，路由到不同的处理函数
  const context = {
    req: req,
    res: res
  }
  const routerInstance = router.find(r => r.path === req.url)
  if (routerInstance) {
    await routerInstance.handle(context)
  }
})

// 本地loopback interface
// localhost 127.0.0.1
const HOST = '0.0.0.0' // 不能乱写，写当前操作系统所拥有的网卡地址
const PORT = 3000 // tcp端口号2个字节表示（0~65535）
// (ip+port)

server.listen(PORT, HOST, () => {
  console.log('启动服务器')
})
