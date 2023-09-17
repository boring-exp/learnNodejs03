// http 的服务端
// 一直运行的状态
import http from 'node:http'
import { listFile, donwloadFile, uploadFile } from './router/file/http-file.js'
// 路由表
const router = [
  { path: '/', handle: async (ctx) => { ctx.res.end('根路径') } },
  listFile,
  donwloadFile,
  uploadFile
]

// url参数解析
// /login?name=1
function urlParser(originUrl) {
  const params = originUrl.split('?')
  const url = params[0]
  const result = {}
  if (params.length === 2) {
    // name=1&test=2&age=3
    const pArr = params[1].split('&') // ['name=1', 'test=2', 'age=3']
    pArr.forEach(pair => {
      const pairArr = pair.split('=')
      result[pairArr[0]] = pairArr[1]
    })
  }
  return {
    url,
    param: result
  }
}



const server = http.createServer(async (req, res) => {
  // http请求通过 [请求方法 + 请求url] 区分接口功能
  // console.log(req.url, req.method)
  // 如何让不同的url+method组合，路由到不同的处理函数
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'token,content-type')
  res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET')
  const { url, param } = urlParser(req.url)
  const context = {
    req: req,
    res: res,
    query: param,
    url,
  }
  const routerInstance = router.find(r => r.path === url)
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
