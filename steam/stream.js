// 文件offset
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'

// 1.当前文件的路径
const __filename = fileURLToPath(import.meta.url)
// 2.当前文件夹的路径
const __dirname = path.dirname(__filename)
const pkgPath = path.join(__dirname, '../package.json')
const namePath = path.join(__dirname, '../upload/name')
const pkgFileStream = fs.createReadStream(pkgPath, {
  // 决定一个nodejs流，一次传递多大的buf
  highWaterMark: 10
})
pkgFileStream.on('data', (chunk) => {
  fs.writeFileSync(namePath, chunk, {flag: 'a+'})
})
pkgFileStream.on('end', () => {
  console.log('文件读完了')
})

// pkgFileStream.pause()
// pkgFileStream.resume()