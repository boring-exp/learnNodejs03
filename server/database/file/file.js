import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// 1.当前文件的路径
const __filename = fileURLToPath(import.meta.url)
// 2.当前文件夹的路径
const __dirname = path.dirname(__filename)
const fileDataBase = path.join(__dirname, './file.json')

function getFiles() {
  const filesStr = fs.readFileSync(fileDataBase, { flag: 'r+' }).toString()
  return JSON.parse(filesStr)
}

function saveFile(files) {
  fs.writeFileSync(fileDataBase, JSON.stringify(files), { flag: 'w+' })
}
// 获取所有图片信息
function getAllFiles() {
  const files = getFiles()
  return {
    totalSize: files.length,
    items: files
  }
}

function addFile(params) {
  const files = getFiles()
  files.push(params)
  saveFile(files)
}

function delFile(fileId) {
  const files = getFiles()
  const index = files.findIndex(file => file.uid === fileId)
  if (index > -1) {
    files.splice(index, 1)
  }
  console.log(index)
  saveFile(files)
}

function editFile(fileId, filename) {
  const files = getFiles()
  const index = files.findIndex(file => file.uid === fileId)
  console.log(index)
  if (index > -1) {
    files[index].filename = filename
  }
  saveFile(files)
}

export {
  getAllFiles,
  editFile,
  delFile,
  addFile
}