import path, { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import { rejects } from 'node:assert'
import fsPromise from 'node:fs/promises'

// 1.当前文件的路径
const __filename = fileURLToPath(import.meta.url)
// 2.当前文件夹的路径
const __dirname = path.dirname(__filename)
const uploadPath = path.join(__dirname, '../upload/name')

// 虽然不会阻塞nodejs主线程
// 但是对于大文件的读取会有性能问题
fs.readFile(uploadPath, { flag: 'r' }, (err, buf) => {
  console.log(buf.toString())
})

const fileBuf = fs.readFileSync(uploadPath)
console.log(fileBuf)

const result = await fsPromise.readFile(uploadPath)
console.log(result)


// 依然保持异步，但是想使用promise
// function readFilePromise(filePath, option = { flag: 'r' }) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, option, (err, buf) => {
//       if (err) {
//         reject(err)
//         return
//       }
//       resolve(buf)
//     })
//   })
// }

// const result = await readFilePromise(uploadPath)
// console.log(result.toString())
