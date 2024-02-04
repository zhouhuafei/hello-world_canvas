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
  scale = 7
  rotations = 1

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
      this.ctx.beginPath()
      this.ctx.fillStyle = v.bgColor
      this.ctx.arc(v.x, v.y, v.r, 0, 360 * Math.PI / 180)
      this.ctx.fill()
      this.ctx.closePath()
      this.ctx.restore()
    })
  }

  moveMain () {
    this.list = []
    cancelAnimationFrame(this.timer1)

    let x = 0
    let i = 0

    const listPush = (i) => {
      const radian = Math.PI / 180
      const angle = i * radian
      const yPolyfill = Math.floor(this.height / 15)
      this.list.push({
        r: 2,
        bgColor: `rgb(${randomNum(255)},${randomNum(255)},${randomNum(255)})`,
        x: this.centerX + (-16 * Math.pow(Math.sin(angle), 3)) * this.scale,
        y: this.centerY + (-(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle))) * this.scale - yPolyfill
      })
    }

    listPush(i)

    const changAngleTrigger = () => {
      this.timer1 = requestAnimationFrame(() => {
        console.log('changAngleTrigger：')
        this.draw()
        x++
        if (x % 20 === 0) {
          this.audios[x % this.audioMax].play()
        }
        i++
        if (i < this.rotations * 360) {
          listPush(i)
        }
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
