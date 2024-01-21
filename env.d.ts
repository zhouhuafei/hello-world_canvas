/// <reference types="vite/client" />

// 对第三方包进行文件声明
declare module 'zhf.random-num'
declare module 'zhf.canvas-api' {
  const canvasApi: any
  export = canvasApi
}
