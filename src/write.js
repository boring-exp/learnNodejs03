import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import {Buffer} from 'node:buffer'

// 1.当前文件的路径
const __filename = fileURLToPath(import.meta.url)
// 2.当前文件夹的路径
const __dirname = path.dirname(__filename)
const aimFilePath = path.join(__dirname, '../upload/name')

const buf = Buffer.from('测试', 'utf-8')

// 写文件必须传递一个可以写的flag
// https://nodejs.org/api/fs.html#file-system-flags
fs.open(aimFilePath, 'a', (err, fd) => {
  fs.write(fd, buf, (err, written, bufParams) => {
    console.log(written, bufParams)
  })
})

fs.writeFile(aimFilePath, '这是追加的一句话', {flag: 'a'}, () => {
  console.log('追加成功')
})