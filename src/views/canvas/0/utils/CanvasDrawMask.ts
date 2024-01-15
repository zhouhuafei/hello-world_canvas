class CanvasDrawMask {
  options: any = { wrap: '.ui-canvas-wrap' }
  canvasWrap
  canvas
  width
  height
  ctx
  audioMax
  audios: any = []
  imgBak1
  timer1

  constructor (options: any = {}) {
    Object.assign(this.options, options)

    this.init()
  }

  async init () {
    this.genCanvas()
    this.genCtx()
    this.genAudios()
    await this.draw()
  }

  genCanvas () {
    this.canvasWrap = document.querySelector(this.options.wrap)
    this.canvas = document.createElement('canvas')
    const { clientWidth, clientHeight } = document.documentElement
    this.width = clientWidth
    this.height = clientHeight
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.canvas.setAttribute('style', 'display:block;position:absolute;left:0;top:0;')
    this.canvasWrap.appendChild(this.canvas)
    this.audioMax = this.options.mainBgAudioUrls.length * 10
  }

  genCtx () {
    this.ctx = this.canvas.getContext('2d')
  }

  async draw () {
    this.clear()
    this.drawBgColor()
    await this.drawBgImage()
  }

  clear () {
    // 源图像 = 您打算放置到画布上的绘图
    // 目标图像 = 您已经放置在画布上的绘图
    this.ctx.globalCompositeOperation = 'source-over' // 默认。在目标图像上显示源图像。
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  drawBgColor () {
    this.ctx.save()

    this.ctx.beginPath()
    this.ctx.rect(0, 0, this.width, this.height)
    this.ctx.closePath()
    this.ctx.fill()

    this.ctx.restore()
  }

  getImageInfo (src) {
    return new Promise(resolve => {
      const img = document.createElement('img')
      img.onload = () => resolve(img)
      img.src = src
    })
  }

  async drawBgImage () {
    let img
    if (this.imgBak1) {
      img = this.imgBak1
    } else {
      img = await this.getImageInfo(this.options.maskBgImageUrl)
      this.imgBak1 = img
    }
    this.ctx.drawImage(img, 0, 0, this.width, this.height)
  }

  genAudioInfo (src) {
    const audio = document.createElement('audio')
    // audio video 无onLoad事件
    // audio.innerHTML = `<source src="${src}">`
    audio.src = src
    audio.preload = 'auto'
    return audio
  }

  genAudios () {
    const mainBgAudioNum = this.options.mainBgAudioUrls.length
    for (let i = 0; i < this.audioMax; i++) {
      const audio = this.genAudioInfo(this.options.mainBgAudioUrls[i % mainBgAudioNum])
      this.audios.push(audio)
    }
  }

  runMaskTransparent () {
    return new Promise(resolve => {
      cancelAnimationFrame(this.timer1)

      // 源图像 = 您打算放置到画布上的绘图
      // 目标图像 = 您已经放置在画布上的绘图
      this.ctx.globalCompositeOperation = 'destination-out' // 在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。
      this.ctx.save()
      this.ctx.beginPath()

      let i = 0
      let x = 0
      let y = 0
      const allArea = this.width * this.height
      // requestAnimationFrame 每秒绘制60次 1分钟就是3600次 绘制maskNum张mask
      const maskNum = this.options.maskBgImageUrls.length
      const oneArea = allArea / ((60 * 60) / maskNum)
      const w = Math.sqrt(oneArea)
      const h = w

      const removeMaskTrigger = () => {
        this.timer1 = requestAnimationFrame(() => {
          console.log('removeMaskTrigger：')
          this.ctx.rect(x, y, w, h)
          this.ctx.fill()
          if (x < this.width) {
            x += w
          } else {
            x = 0
            y += h
            this.audios[i % this.audioMax].play()
            i++
          }
          if (y < this.height) {
            removeMaskTrigger()
          } else {
            resolve()
          }
        })
      }

      removeMaskTrigger()

      this.ctx.closePath()
      this.ctx.restore()
    })
  }

  clearTimers () {
    cancelAnimationFrame(this.timer1)
  }
}

export { CanvasDrawMask }
