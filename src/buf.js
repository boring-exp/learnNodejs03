// buffer是什么
// buffer数据的内存开销不由v8管理
// 而是nodejs的底层c++直接管理
// 一块大内存，每个元素是一个字节
import { Buffer } from 'node:buffer'

const buf = Buffer.from([1256, 0])
const buf1 = Buffer.from([0x00, 0x01, 0x33, 0x44])
const buf2 = Buffer.from('1')
const buf3 = Buffer.from('哈哈哈', 'utf-8')
console.log(buf3.toString('utf-8'))
console.log(buf3.toString('base64'))
console.log(buf3.toString('base64url'))
console.log('高低位', buf1.readInt16LE(0))
// console.log(buf1)

// alloc创建的buffer是干净的，用0填满的
const allocBuf = Buffer.alloc(100, 'helloworld')
// 不能保证buffer没有脏数据
const allocUnsafe = Buffer.allocUnsafe(100)
console.log(allocBuf.length)
console.log(allocBuf)
const bufSlice = allocBuf.slice(1, 3)
console.log(bufSlice)

// buf网络协议数据解析
// 比如说 mysql数据库操作 协议

