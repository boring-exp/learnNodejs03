import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import {Buffer} from 'buffer'

// 1.当前文件的路径
const __filename = fileURLToPath(import.meta.url)
// 2.当前文件夹的路径
const __dirname = path.dirname(__filename)
const sourceFilePath = path.join(__dirname, '../package.json')
const distFilePath = path.join(__dirname, '../upload/name')

// 文件处理
fs.readFile(sourceFilePath, (err, data) => {
  const pkgStr = data.toString('utf-8')
  const pkg = JSON.parse(pkgStr)
  pkg.scripts['copy'] = 'node src/copy.js'
  const resultBuf = Buffer.from(JSON.stringify(pkg, null, 2))
  fs.writeFile(distFilePath, resultBuf, {flag: 'w+'}, () => {
    console.log('复制成功')
  })
})


// 任务
// 1.copy 实现
// node copy.js ./package.json src/

// 2.把常用的api过一遍
// 创建文件夹 mkdir
// 删除文件夹 rmdir // 递归删除
// 删除文件 unlink
// 文件的复制 copy