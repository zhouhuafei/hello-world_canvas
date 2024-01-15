import canvasApi from 'zhf.canvas-api'
import { CanvasDrawMask } from '@/views/canvas/0/utils/CanvasDrawMask'

let self
const onKeyDownTrigger = async (e) => {
  console.log('e.keyCode：', e.keyCode)
  if (e.keyCode !== 32) return
  for (let i = self.options.maskBgImageUrls.length - 1; i >= 0; i--) {
    await self[`canvasDrawMask${i}`].draw()
    await self[`canvasDrawMask${i}`].runMaskTransparent()
  }
}

class CanvasDrawMain {
  options: any = { wrap: '.ui-canvas-wrap' }
  canvasWrap
  canvas
  padding = 40
  width
  height
  centerX
  centerY
  ctx
  imgBak1

  constructor (options: any = {}) {
    Object.assign(this.options, options)

    this.init()
    window.addEventListener('resize', () => this.init())
  }

  async init () {
    this.genCanvas()
    this.genCtx()
    await this.draw()
    this.addOnKeyDown()
  }

  genCanvas () {
    this.canvasWrap = document.querySelector(this.options.wrap)
    this.canvasWrap.innerHTML = ''
    this.canvas = document.createElement('canvas')
    const { clientWidth, clientHeight } = document.documentElement
    this.width = clientWidth
    this.height = clientHeight
    this.centerX = this.width / 2
    this.centerY = this.height / 2
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.canvas.style.display = 'block'
    this.canvasWrap.appendChild(this.canvas)
  }

  genCtx () {
    this.ctx = this.canvas.getContext('2d')
  }

  async draw () {
    this.clear()
    this.drawBgColor()
    await this.drawBgImage()
    // this.drawGuideLine()
    this.drawText()
    this.drawMask()
  }

  clear () {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  drawBgColor () {
    this.ctx.save()

    this.ctx.beginPath()
    this.ctx.fillRect(0, 0, this.width, this.height)
    this.ctx.closePath()

    this.ctx.restore()
  }

  drawGuideLine () {
    this.ctx.save()

    this.ctx.strokeStyle = 'rgba(0,255,0,0.8)'
    this.ctx.setLineDash([1, 1])
    this.ctx.beginPath()
    this.ctx.moveTo(0, this.centerY)
    this.ctx.lineTo(this.width, this.centerY)
    this.ctx.moveTo(this.centerX, 0)
    this.ctx.lineTo(this.centerX, this.height)
    this.ctx.closePath()
    this.ctx.stroke()

    this.ctx.restore()
  }

  getImageInfo (src) {
    return new Promise(resolve => {
      const img = document.createElement('img')
      img.src = src
      img.onload = () => resolve(img)
    })
  }

  async drawBgImage () {
    let img
    if (this.imgBak1) {
      img = this.imgBak1
    } else {
      img = await this.getImageInfo(this.options.mainBgImageUrl)
      this.imgBak1 = img
    }
    this.ctx.drawImage(img, 0, 0, this.width, this.height)
  }

  drawText () {
    this.ctx.save()

    this.ctx.textAlign = 'center'
    this.ctx.fillStyle = 'rgba(255,255,255,0.8)'

    const obj: any = {}
    let allLineHeight = 0
    this.options.mainTexts.forEach((text, index) => {
      const prefectWordLength = 28 // 16比9的分辨率：一行展示28个字效果最佳
      obj[`fontSize${index}`] = (this.width - this.padding * 2) / prefectWordLength
      obj[`lineHeight${index}`] = obj[`fontSize${index}`] * 1.6
      allLineHeight += obj[`lineHeight${index}`]
    })

    this.ctx.save()
    const w = this.width - this.padding
    const h = allLineHeight + this.padding / 2
    const x = this.padding / 2
    const y = this.centerY - h / 2
    const r = Math.min(w, allLineHeight) / 10
    this.ctx.fillStyle = 'rgba(0,0,0,0.4)'
    this.ctx.beginPath()
    canvasApi.drawRoundRect(this.ctx, x, y, w, h, r)
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.restore()

    this.options.mainTexts.forEach((text, index) => {
      if (index === 0) {
        obj[`y${index}`] = this.centerY - allLineHeight / 2
      } else {
        obj[`y${index}`] = obj[`y${index - 1}`] + obj[`lineHeight${index - 1}`]
      }
      canvasApi.drawMoreLineText({
        ctx: this.ctx,
        text,
        fontSize: obj[`fontSize${index}`],
        lineWidth: this.width,
        lineHeight: obj[`lineHeight${index}`],
        x: this.centerX,
        y: obj[`y${index}`]
      })
    })

    this.ctx.restore()
  }

  drawMask () {
    for (let i = 0; i < this.options.maskBgImageUrls.length; i++) {
      this[`canvasDrawMask${i}`] = new CanvasDrawMask({
        ...this.options,
        maskBgImageUrl: this.options.maskBgImageUrls[i]
      })
    }
  }

  addOnKeyDown () {
    self = this
    document.removeEventListener('keydown', onKeyDownTrigger)
    document.addEventListener('keydown', onKeyDownTrigger)
  }

  clearTimersAndEvents () {
    for (let i = 0; i < this.options.maskBgImageUrls.length; i++) {
      this[`canvasDrawMask${i}`].clearTimers()
    }
    document.removeEventListener('keydown', onKeyDownTrigger)
  }
}

export { CanvasDrawMain }
