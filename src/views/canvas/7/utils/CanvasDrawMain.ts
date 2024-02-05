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
    this.drawBgColor()
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
    // this.clear()
    // this.drawBgColor()
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
    this.drawBgColor(0.02)
    this.list.forEach(item => {
      item.forEach(v => {
        this.ctx.save()
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'
        this.ctx.font = `${v.fontSize}px 黑体`
        this.ctx.fillStyle = 'rgba(0,255,0,0.8)'
        // this.ctx.globalAlpha = v.opacity / 100
        this.ctx.beginPath()
        this.ctx.fillText(v.text, v.x, v.y)
        this.ctx.closePath()
        this.ctx.fill()
        this.ctx.restore()
      })
    })
  }

  moveMain () {
    cancelAnimationFrame(this.timer1)

    let x = 0
    let i = 0

    // const text = 'abcdefghijklmnopqrstuvwxyz'
    const text = '我听到了股灾的回响。送你上路的是自己人，请你不要怨恨。'
    const textLen = text.length
    const rows = this.height / (textLen * 2)
    const rowHeight = rows
    const fontSize = rows
    const colWidth = rows
    const cols = Math.floor(this.width / colWidth)
    const gap = (this.width - colWidth * cols) / 2

    this.list = [...Array(cols)].map(() => [])

    const listPush = () => {
      // const colIdx = i % cols
      const colIdx = randomNum(cols - 1)
      const idx = 0
      this.list[colIdx].push({
        idx,
        x: gap + colWidth / 2 + colWidth * colIdx,
        y: rowHeight / 2 + idx * rowHeight,
        fontSize,
        text: text.split('')[idx % textLen],
        opacity: 100
      })
    }
    const listPushTrigger = () => {
      // const rNum = randomNum(Math.floor(cols / 5))
      const rNum = 2
      const arr = [...Array(rNum)]
      arr.forEach(() => listPush())
    }
    listPushTrigger()

    const changAngleTrigger = () => {
      this.timer1 = requestAnimationFrame(() => {
        console.log('changAngleTrigger：')

        this.list.forEach(vArr => {
          vArr.forEach(v => {
            v.text = text.split('')[v.idx % textLen]
            v.y = rowHeight / 2 + v.idx * rowHeight
            v.idx++
          })
        })
        x++
        this.list = this.list.map(vArr => vArr.filter(v => v.y <= this.height))
        if (x % 10 === 0) {
          this.audios[x % this.audioMax].play()
          if (i < 360) {
            i++
            listPushTrigger()
          }
        }
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
