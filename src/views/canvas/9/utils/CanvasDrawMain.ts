import canvasApi from 'zhf.canvas-api'
import randomNum from 'zhf.random-num'

let self
const onKeyDownTrigger = async (e) => {
  console.log('e.keyCode：', e.keyCode)
  if (e.keyCode !== 32) return
  self.draw()
  self.moveMain()
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
  audioMax
  audios: any = []
  timer1
  list = []

  constructor (options: any = {}) {
    Object.assign(this.options, options)

    this.init()
    window.addEventListener('resize', () => this.init())
  }

  async init () {
    this.genCanvas()
    this.genCtx()
    this.genAudios()
    this.drawText()
    this.getParticleList()
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
    this.audioMax = this.options.mainBgAudioUrls.length * 10
  }

  genCtx () {
    this.ctx = this.canvas.getContext('2d')
  }

  drawText () {
    this.ctx.save()

    this.ctx.textAlign = 'center'
    this.ctx.fillStyle = 'rgba(0,255,0,0.6)'

    const obj: any = {}
    let allLineHeight = 0
    this.options.mainTexts.forEach((text, index) => {
      const prefectWordLength = 20 // 16比9的分辨率：一行展示30个字效果最佳
      obj[`fontSize${index}`] = (this.width - this.padding * 2) / prefectWordLength
      obj[`lineHeight${index}`] = obj[`fontSize${index}`] * 1.6
      allLineHeight += obj[`lineHeight${index}`]
    })

    // this.ctx.save()
    // const w = this.width - this.padding
    // const h = allLineHeight + this.padding / 2
    // const x = this.padding / 2
    // const y = this.centerY - h / 2
    // const r = Math.min(w, allLineHeight) / 10
    // this.ctx.fillStyle = 'rgba(0,255,0,0.2)'
    // canvasApi.drawRoundRect(this.ctx, x, y, w, h, r)
    // this.ctx.fill()
    // this.ctx.restore()

    this.options.mainTexts.forEach((text, index) => {
      if (index === 0) {
        obj[`y${index}`] = this.centerY - allLineHeight / 2
      } else {
        obj[`y${index}`] = obj[`y${index - 1}`] + obj[`lineHeight${index - 1}`]
      }
      canvasApi.drawMoreLineText({
        ctx: this.ctx,
        text,
        fontFamily: '黑体', // 在win系统上，黑体可以让文字正正好处于行高的正中间，其他字体多多少少都存在点肉眼可见的误差。
        fontSize: obj[`fontSize${index}`],
        lineWidth: this.width,
        lineHeight: obj[`lineHeight${index}`],
        x: this.centerX,
        y: obj[`y${index}`]
      })
    })

    this.ctx.restore()
  }

  getParticleList () {
    this.list = []

    const imageData = this.ctx.getImageData(0, 0, this.width, this.height)
    let obj: any = {}
    let j = 0
    imageData.data.forEach((v, i) => {
      obj[i % 4] = v
      if (i % 4 === 3) {
        obj.x = Math.floor(i / 4) % this.width
        obj.y = Math.floor(j / this.width)
        j++
        if (obj[0] === 0 && obj[1] === 0 && obj[2] === 0) return
        this.list.push(obj)
        obj = {}
      }
    })

    this.list.forEach((v) => {
      // v.r = v['0']
      // v.g = v['1']
      // v.b = v['2']
      v.w = 1
      v.h = 1
    })
  }

  draw () {
    this.clear()
    this.drawBgColor()
    // this.drawGuideLine()
    this.drawMain()
  }

  clear () {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  drawBgColor (opacity = 1) {
    this.ctx.save()

    this.ctx.fillStyle = `rgba(0,0,0,${opacity})`
    this.ctx.fillRect(0, 0, this.width, this.height)

    this.ctx.restore()
  }

  drawGuideLine () {
    this.ctx.save()

    this.ctx.strokeStyle = 'rgba(0,255,0,0.4)'
    this.ctx.setLineDash([this.width / (16 * 3 + 1)])
    this.ctx.beginPath()
    this.ctx.moveTo(0, this.centerY + 0.5)
    this.ctx.lineTo(this.width, this.centerY + 0.5)
    this.ctx.stroke()
    this.ctx.setLineDash([this.height / (9 * 3)])
    this.ctx.beginPath()
    this.ctx.moveTo(this.centerX + 0.5, 0)
    this.ctx.lineTo(this.centerX + 0.5, this.height)
    this.ctx.stroke()

    this.ctx.restore()
  }

  genAudioInfo (src) {
    const audio = document.createElement('audio')
    // audio video 无onLoad事件
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

  drawMain () {
    this.list.forEach((v) => {
      this.ctx.save()
      this.ctx.fillStyle = `rgba(${v.r}, ${v.g}, ${v.b}, 1)`
      this.ctx.fillRect(v.x, v.y, v.w, v.h)
      this.ctx.restore()
    })
  }

  moveMain () {
    cancelAnimationFrame(this.timer1)

    let x = 0
    let i = 1

    const changAngleTrigger = () => {
      this.timer1 = requestAnimationFrame(() => {
        console.log('changAngleTrigger：')
        this.list.forEach((v) => {
          v.r = randomNum(Math.floor(255))
          v.g = randomNum(Math.floor(255))
          v.b = randomNum(Math.floor(255))
        })
        x++
        if (x % 10 === 0) {
          // this.audios[x % this.audioMax].play()
          i++
        }
        this.draw()
        if (i < 360) {
          changAngleTrigger()
        }
      })
    }

    changAngleTrigger()
  }

  addOnKeyDown () {
    self = this
    document.removeEventListener('keydown', onKeyDownTrigger)
    document.addEventListener('keydown', onKeyDownTrigger)
  }

  clearTimersAndEvents () {
    cancelAnimationFrame(this.timer1)
    document.removeEventListener('keydown', onKeyDownTrigger)
  }
}

export { CanvasDrawMain }
