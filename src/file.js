// 一个经典的文件读写
// 1. 打开文件
// 将文件的描述符拿到，（并且加入至当前进程的fd列表）
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// 1.当前文件的路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const uploadPath = path.join(__dirname, '../upload/name')
console.log(uploadPath)

// nodejs 回调函数特点
// 所有回调函数第一个参数一定是err，真实的回调数据放在其后
// fs.open(uploadPath, (err, fd) => {
//   if (err) {
//     console.log(err)
//     return
//   }
//   fs.read(fd, (err,bufSize, buf) => {
//     if (err) {
//       console.log(err)
//       return
//     }
//     console.log(bufSize)
//     console.log(buf.toString('utf-8'))
//   })
// })

// 可能会导致nodejs线程阻塞
const fd = fs.openSync(uploadPath, 'r')
console.log(fd)

const buf = Buffer.allocUnsafe(100)
// 对象的浅拷贝
const bufSize = fs.readSync(fd, buf)
console.log(bufSize)
console.log(buf)

