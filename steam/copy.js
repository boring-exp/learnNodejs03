// 文件offset
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'

// 1.当前文件的路径
const __filename = fileURLToPath(import.meta.url)
// 2.当前文件夹的路径
const __dirname = path.dirname(__filename)
const namePath = path.join(__dirname, '../upload/name')
const pkgPath = path.join(__dirname, '../package.json')

const pkgReadStream = fs.createReadStream(pkgPath)
const nameWriteStream = fs.createWriteStream(namePath, {flags: 'a+'})
pkgReadStream.pipe(nameWriteStream)
console.log('哈哈哈')