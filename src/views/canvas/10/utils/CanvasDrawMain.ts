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
  circle: any = {}

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
    this.circle = {
      x: this.centerX,
      y: this.centerY,
      r: this.height / 10
    }
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
    this.list.forEach((v) => {
      this.ctx.save()
      this.ctx.strokeStyle = `rgba(0, 255, 0, 1)`
      this.ctx.beginPath()
      this.ctx.moveTo(v.x, v.y)
      this.ctx.lineTo(this.circle.x, this.circle.y)
      this.ctx.closePath()
      this.ctx.stroke()
      this.ctx.restore()
    })

    this.ctx.save()
    this.ctx.fillStyle = `rgba(0, 255, 0, 1)`
    this.ctx.beginPath()
    this.ctx.arc(this.circle.x, this.circle.y, this.circle.r, 0, 360 * Math.PI / 180)
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.restore()
  }

  moveMain () {
    this.list = []
    cancelAnimationFrame(this.timer1)

    let j1 = 0
    let x1 = Math.floor(this.width / 50)
    let y1 = Math.floor(this.height / 50)

    const fnJ1 = (x, y) => {
      this.list.push({ x, y })
      j1++
      this.audios[j1 % this.audioMax].play()
    }

    const changAngleTrigger = () => {
      this.timer1 = requestAnimationFrame(() => {
        console.log('changAngleTrigger：')
        if (this.circle.x + this.circle.r >= this.width) {
          fnJ1(this.circle.x + this.circle.r, this.circle.y)
          x1 = -Math.abs(x1)
        } else if (this.circle.x - this.circle.r <= 0) {
          fnJ1(this.circle.x - this.circle.r, this.circle.y)
          x1 = Math.abs(x1)
        }
        if (this.circle.y + this.circle.r >= this.height) {
          fnJ1(this.circle.x, this.circle.y + this.circle.r)
          y1 = -Math.abs(y1)
        } else if (this.circle.y - this.circle.r <= 0) {
          fnJ1(this.circle.x, this.circle.y - this.circle.r)
          y1 = Math.abs(y1)
        }
        this.circle.x += x1
        this.circle.y += y1
        this.draw()
        changAngleTrigger()
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
