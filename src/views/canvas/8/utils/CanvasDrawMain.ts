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
    this.list.forEach(v => {
      this.ctx.save()
      this.ctx.fillStyle = `rgba(0, 0, 0, 0.1)`
      this.ctx.beginPath()
      this.ctx.arc(v.x, v.y, v.r, 0, 360 * Math.PI / 180)
      this.ctx.closePath()
      this.ctx.fill()
      this.ctx.restore()

      this.ctx.save()
      this.ctx.fillStyle = v.bgColor
      this.ctx.textAlign = 'center'
      this.ctx.textBaseline = 'middle'
      this.ctx.font = `${v.fontSize}px 黑体`
      this.ctx.beginPath()
      this.ctx.fillText(v.text, v.x, v.y)
      this.ctx.closePath()
      this.ctx.fill()
      this.ctx.restore()
    })
  }

  moveMain () {
    this.list = []
    cancelAnimationFrame(this.timer1)

    let x = 0
    let i = 0

    const textAll = '祝大家新年快乐'
    const textLen = textAll.length
    const speed = 2

    const listPush = (i) => {
      const radian = Math.PI / (180 / speed)
      const angle = i * radian
      const idx = Math.floor(i / (360 / speed))
      const scale = Math.floor(this.height / 40)
      const text = textAll[idx]
      const fontSize = Math.floor(this.height / 27)
      const yPolyfill = Math.floor(this.height / 15)
      this.list.push({
        text,
        fontSize,
        bgColor: `rgb(${randomNum(Math.floor(255))},${randomNum(Math.floor(255 / 3))},${randomNum(Math.floor(255 / 3))})`,
        // 16前面加个负号就是从左往右绘制
        x: this.centerX + (16 * Math.pow(Math.sin(angle), 3)) * scale,
        y: this.centerY + (-(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle))) * scale - yPolyfill,
        r: fontSize
      })
    }

    listPush(i)

    const changAngleTrigger = () => {
      this.timer1 = requestAnimationFrame(() => {
        console.log('changAngleTrigger：')
        x++
        if (x % 20 === 0) {
          this.audios[x % this.audioMax].play()
        }
        if (i < textLen * (360 / speed)) {
          listPush(i)
          i++
        } else {
          this.list.splice(this.list.length - 1, 1)
        }
        this.draw()
        if (this.list.length) {
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
