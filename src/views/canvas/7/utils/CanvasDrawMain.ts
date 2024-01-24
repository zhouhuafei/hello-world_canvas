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
    this.drawBgColor(0.02)
    // this.drawGuideLine()
    // this.drawText()
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

  drawText () {
    this.ctx.save()

    this.ctx.textAlign = 'center'
    this.ctx.fillStyle = 'rgba(0,255,0,0.6)'

    const obj: any = {}
    let allLineHeight = 0
    this.options.mainTexts.forEach((text, index) => {
      const prefectWordLength = 30 // 16比9的分辨率：一行展示30个字效果最佳
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
    this.ctx.fillStyle = 'rgba(0,255,0,0.2)'
    canvasApi.drawRoundRect(this.ctx, x, y, w, h, r)
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

  drawMain () {
    this.list.forEach(item => {
      item.forEach(v => {
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'
        this.ctx.font = `${v.fontSize}px 黑体`
        this.ctx.fillStyle = 'rgba(0,255,0,0.8)'
        this.ctx.globalAlpha = v.opacity / 100
        this.ctx.fillText(v.text, v.x, v.y)
        this.ctx.fill()
        this.ctx.closePath()
        this.ctx.restore()
      })
    })
  }

  moveMain () {
    this.list = []
    cancelAnimationFrame(this.timer1)

    let x = 0
    let i = 1

    const colWidth = 20
    const rowHeight = 15
    const cols = this.width / colWidth
    const rows = this.height / rowHeight
    const fontSize = 12
    const text = '辣鸡股市'

    const listPush = (i) => {
      this.list = [...Array(cols)].map(() => [])
      this.list.forEach((vArr, colIdx) => {
        vArr.push({
          x: colWidth / 2 + colWidth * colIdx,
          y: rowHeight / 2 + i % rows * rowHeight,
          fontSize,
          text: text.split('')[i % text.length],
          opacity: 100
        })
      })
    }

    listPush(i)

    const changAngleTrigger = () => {
      this.timer1 = requestAnimationFrame(() => {
        console.log('changAngleTrigger：')

        x++
        this.list.forEach(vArr => {
          vArr.forEach(v => {
            v.opacity--
          })
        })
        this.list = this.list.map(vArr => vArr.filter(v => v.opacity > 0))
        if (x % 20 === 0) {
          this.audios[x % this.audioMax].play()
          // i++
          // if (i < 180) {
          //   listPush(i)
          // }
        }
        i++
        if (i < 180) {
          listPush(i)
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
