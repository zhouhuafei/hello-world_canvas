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
  angle1 = 0

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

  draw () {
    this.clear()
    this.drawBgColor()
    // this.drawGuideLine()
    this.drawText()
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
    // 1920x1080 竖着分4份 横着分2份 分成8块区域 中间空隙附加文案
    // 如果一个数既能被1920整除又能被1080整除
    // 那么以这个数为边长组合出来的正方形一定能铺满全屏
    // 能被 1920x1080 整除的数：1、2、3、4、5、6、8、10、12、15、20
    // 能被 480x270 整除的数：1、2、3、5、6、10、15
    const cols = 4
    // const row2 = 2
    const areaWH = this.width / cols
    const lineWidth = areaWH / 100
    const arr = [3, 5, 7, 9]
    const num = arr[1]
    // const num = arr[randomNum(arr.length - 1)]
    // const num = arr[this.angle1 % (arr.length - 1)]
    const recommendWH = areaWH / num // 不能定死宽度 否则不会自适应 除以3、5、7、9都能得到相对较好的视觉比例
    const iMax = this.width / recommendWH
    const jMax = areaWH / recommendWH
    for (let i = 0; i < iMax; i++) {
      if (i % 2 === 0) continue
      for (let j = 0; j < jMax; j++) {
        if (j % 2 === 0) continue
        const x = -recommendWH / 2
        const y = -recommendWH / 2
        const w = recommendWH
        const h = recommendWH
        const centerX = recommendWH / 2 + recommendWH * i - recommendWH / 2
        const centerY = recommendWH / 2 + recommendWH * j

        this.ctx.save()
        this.ctx.lineWidth = lineWidth
        this.ctx.strokeStyle = 'rgba(0,255,0,0.8)'
        this.ctx.fillStyle = 'rgba(0,255,0,0.8)'
        this.ctx.setLineDash([lineWidth, lineWidth])

        this.ctx.save()
        this.ctx.translate(centerX, centerY)
        this.ctx.rotate(this.angle1 * Math.PI / 180)
        this.ctx.strokeRect(x, y, w, h)
        this.ctx.strokeRect(x / 2, y / 2, w / 2, h / 2)
        this.ctx.restore()

        this.ctx.save()
        this.ctx.translate(centerX, this.height - centerY)
        this.ctx.rotate(this.angle1 * Math.PI / 180)
        this.ctx.strokeRect(x, y, w, h)
        this.ctx.strokeRect(x / 2, y / 2, w / 2, h / 2)
        this.ctx.restore()

        this.ctx.restore()
      }
    }
  }

  moveMain () {
    cancelAnimationFrame(this.timer1)

    let x = 0
    let i = 1

    const changAngleTrigger = () => {
      this.timer1 = requestAnimationFrame(() => {
        console.log('changAngleTrigger：')
        x++
        this.angle1 += i
        this.angle1 %= 360
        if (x % 10 === 0) {
          this.audios[x % this.audioMax].play()
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
