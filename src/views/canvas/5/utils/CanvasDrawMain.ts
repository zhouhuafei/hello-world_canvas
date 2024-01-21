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

  draw () {
    this.clear()
    this.drawBgColor()
    // this.drawGuideLine()
    this.drawMain()
  }

  clear () {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  drawBgColor () {
    this.ctx.save()

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

  drawSmallArc (smallArcX, smallArcY, smallArcR) {
    this.ctx.beginPath()
    this.ctx.arc(smallArcX, smallArcY, smallArcR / 2, 0, 360 * Math.PI / 180) // 4个闭合外半圆
    this.ctx.closePath()
    this.ctx.stroke()
  }

  drawMain () {
    // 1920x1080 竖着分4份 横着分2份 分成8块区域 中间空隙附加文案
    const cols = 4
    const row2 = 2
    const areaWH = this.width / cols
    const lineWidth = areaWH / 100
    const fns = {
      fn0: () => {
        const bigArcX = 0
        const bigArcY = 0
        const bigArcR = areaWH / 2 * 0.9

        {
          const smallArcX = bigArcX
          const smallArcY = bigArcY + bigArcR / 2
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.beginPath()
          this.ctx.arc(smallArcX, smallArcY, smallArcR, 0, 360 * Math.PI / 180) // 4个正圆
          this.ctx.closePath()
          this.ctx.stroke()
        }

        {
          const smallArcX = bigArcX
          const smallArcY = bigArcY - bigArcR / 2
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.beginPath()
          this.ctx.arc(smallArcX, smallArcY, smallArcR, 0, 360 * Math.PI / 180) // 4个正圆
          this.ctx.closePath()
          this.ctx.stroke()
        }

        {
          const smallArcX = bigArcX + bigArcR / 2
          const smallArcY = bigArcY
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.beginPath()
          this.ctx.arc(smallArcX, smallArcY, smallArcR, 0, 360 * Math.PI / 180) // 4个正圆
          this.ctx.closePath()
          this.ctx.stroke()
        }

        {
          const smallArcX = bigArcX - bigArcR / 2
          const smallArcY = bigArcY
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.beginPath()
          this.ctx.arc(smallArcX, smallArcY, smallArcR, 0, 360 * Math.PI / 180) // 4个正圆
          this.ctx.closePath()
          this.ctx.stroke()
        }
      },
      fn1: () => {
        const bigArcX = 0
        const bigArcY = 0
        const bigArcR = areaWH / 2 * 0.9

        {
          const smallArcX = bigArcX
          const smallArcY = bigArcY + bigArcR / 2
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.beginPath()
          this.ctx.arc(smallArcX, smallArcY, smallArcR, 0, 180 * Math.PI / 180) // 4个闭合外半圆
          this.ctx.closePath()
          this.ctx.stroke()
        }

        {
          const smallArcX = bigArcX
          const smallArcY = bigArcY - bigArcR / 2
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.beginPath()
          this.ctx.arc(smallArcX, smallArcY, smallArcR, 180 * Math.PI / 180, 360 * Math.PI / 180) // 4个闭合外半圆
          this.ctx.closePath()
          this.ctx.stroke()
        }

        {
          const smallArcX = bigArcX + bigArcR / 2
          const smallArcY = bigArcY
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.beginPath()
          this.ctx.arc(smallArcX, smallArcY, smallArcR, 270 * Math.PI / 180, 90 * Math.PI / 180) // 4个闭合外半圆
          this.ctx.closePath()
          this.ctx.stroke()
        }

        {
          const smallArcX = bigArcX - bigArcR / 2
          const smallArcY = bigArcY
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.beginPath()
          this.ctx.arc(smallArcX, smallArcY, smallArcR, 90 * Math.PI / 180, 270 * Math.PI / 180) // 4个闭合外半圆
          this.ctx.closePath()
          this.ctx.stroke()
        }

        {
          this.ctx.beginPath()
          this.ctx.moveTo(-bigArcR / 3, 0)
          this.ctx.lineTo(bigArcR / 3, 0)
          this.ctx.stroke()
          this.ctx.beginPath()
          this.ctx.moveTo(bigArcR / 10, -bigArcR / 6)
          this.ctx.lineTo(bigArcR / 10, bigArcR / 3)
          this.ctx.stroke()
        }
      },
      fn2: () => {
        const bigArcX = 0
        const bigArcY = 0
        const bigArcR = areaWH / 2 * 0.9

        {
          const smallArcX = bigArcX
          const smallArcY = bigArcY + bigArcR / 2
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.beginPath()
          this.ctx.arc(smallArcX, smallArcY, smallArcR, 0, 180 * Math.PI / 180) // 4个非闭合外半圆
          this.ctx.stroke()
        }

        {
          const smallArcX = bigArcX
          const smallArcY = bigArcY - bigArcR / 2
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.beginPath()
          this.ctx.arc(smallArcX, smallArcY, smallArcR, 180 * Math.PI / 180, 360 * Math.PI / 180) // 4个非闭合外半圆
          this.ctx.stroke()
        }

        {
          const smallArcX = bigArcX + bigArcR / 2
          const smallArcY = bigArcY
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.beginPath()
          this.ctx.arc(smallArcX, smallArcY, smallArcR, 270 * Math.PI / 180, 90 * Math.PI / 180) // 4个非闭合外半圆
          this.ctx.stroke()
        }

        {
          const smallArcX = bigArcX - bigArcR / 2
          const smallArcY = bigArcY
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.beginPath()
          this.ctx.arc(smallArcX, smallArcY, smallArcR, 90 * Math.PI / 180, 270 * Math.PI / 180) // 4个非闭合外半圆
          this.ctx.stroke()
        }

        {
          this.ctx.beginPath()
          this.ctx.moveTo(-bigArcR / 6, 0)
          this.ctx.lineTo(bigArcR / 6, 0)
          this.ctx.stroke()
          this.ctx.beginPath()
          this.ctx.moveTo(0, -bigArcR / 6)
          this.ctx.lineTo(0, bigArcR / 3)
          this.ctx.stroke()
        }
      },
      fn3: () => {
        const bigArcX = 0
        const bigArcY = 0
        const bigArcR = areaWH / 2 * 1.4

        {
          const smallArcX = bigArcX
          const smallArcY = bigArcY + bigArcR / 2
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.beginPath()
          this.ctx.arc(smallArcX, smallArcY, smallArcR, 180 * Math.PI / 180, 360 * Math.PI / 180) // 4个非闭合内半圆
          this.ctx.stroke()
        }

        {
          const smallArcX = bigArcX
          const smallArcY = bigArcY - bigArcR / 2
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.beginPath()
          this.ctx.arc(smallArcX, smallArcY, smallArcR, 0, 180 * Math.PI / 180) // 4个非闭合内半圆
          this.ctx.stroke()
        }

        {
          const smallArcX = bigArcX + bigArcR / 2
          const smallArcY = bigArcY
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.beginPath()
          this.ctx.arc(smallArcX, smallArcY, smallArcR, 90 * Math.PI / 180, 270 * Math.PI / 180) // 4个非闭合内半圆
          this.ctx.stroke()
        }

        {
          const smallArcX = bigArcX - bigArcR / 2
          const smallArcY = bigArcY
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.beginPath()
          this.ctx.arc(smallArcX, smallArcY, smallArcR, 270 * Math.PI / 180, 90 * Math.PI / 180) // 4个非闭合内半圆
          this.ctx.stroke()
        }
      },
      fn4: () => {
        const bigArcX = 0
        const bigArcY = 0
        const bigArcR = areaWH / 2 * 0.9

        {
          const smallArcX = bigArcX - bigArcR / 1.4
          const smallArcY = bigArcY - bigArcR + bigArcR / 4
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.strokeRect(smallArcX, smallArcY, smallArcR, smallArcR)
        }

        {
          const smallArcX = bigArcX - bigArcR / 1.4
          const smallArcY = bigArcY + bigArcR / 2 - bigArcR / 4
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.strokeRect(smallArcX, smallArcY, smallArcR, smallArcR)
        }

        {
          const smallArcX = bigArcX + bigArcR / 2 - bigArcR / 4
          const smallArcY = bigArcY - bigArcR + bigArcR / 4
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.strokeRect(smallArcX, smallArcY, smallArcR, smallArcR)
        }

        {
          const smallArcX = bigArcX + bigArcR / 2 - bigArcR / 4
          const smallArcY = bigArcY + bigArcR / 2 - bigArcR / 4
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.strokeRect(smallArcX, smallArcY, smallArcR, smallArcR)
          this.ctx.strokeRect(-smallArcR / 2, -smallArcR / 2 / 2, smallArcR, smallArcR / 2)
        }
      },
      fn5: () => {
        const bigArcX = 0
        const bigArcY = 0
        const bigArcR = areaWH / 2 * 0.9

        {
          const smallArcX = bigArcX - bigArcR / 1.4
          const smallArcY = bigArcY - bigArcR + bigArcR / 4
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.strokeRect(smallArcX, smallArcY, smallArcR, smallArcR)
        }

        {
          const smallArcX = bigArcX - bigArcR / 1.4
          const smallArcY = bigArcY + bigArcR / 2 - bigArcR / 4
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.strokeRect(smallArcX, smallArcY, smallArcR, smallArcR)
        }

        {
          const smallArcX = bigArcX + bigArcR / 2 - bigArcR / 4
          const smallArcY = bigArcY - bigArcR + bigArcR / 4
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.strokeRect(smallArcX, smallArcY, smallArcR, smallArcR)
        }

        {
          const smallArcX = bigArcX + bigArcR / 2 - bigArcR / 4
          const smallArcY = bigArcY + bigArcR / 2 - bigArcR / 4
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.strokeRect(smallArcX, smallArcY, smallArcR, smallArcR)
          this.ctx.strokeRect(-smallArcR / 2, -smallArcR / 2 / 2, smallArcR, smallArcR / 2)
        }
      },
      fn6: () => {
        const bigArcX = 0
        const bigArcY = 0
        const bigArcR = areaWH / 2 * 0.9

        {
          const smallArcX = bigArcX - bigArcR / 1.4
          const smallArcY = bigArcY - bigArcR + bigArcR / 4
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.strokeRect(smallArcX, smallArcY, smallArcR, smallArcR)
        }

        {
          const smallArcX = bigArcX - bigArcR / 1.4
          const smallArcY = bigArcY + bigArcR / 2 - bigArcR / 4
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.strokeRect(smallArcX, smallArcY, smallArcR, smallArcR)
        }

        {
          const smallArcX = bigArcX + bigArcR / 2 - bigArcR / 4
          const smallArcY = bigArcY - bigArcR + bigArcR / 4
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.strokeRect(smallArcX, smallArcY, smallArcR, smallArcR)
        }

        {
          const smallArcX = bigArcX + bigArcR / 2 - bigArcR / 4
          const smallArcY = bigArcY + bigArcR / 2 - bigArcR / 4
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.strokeRect(smallArcX, smallArcY, smallArcR, smallArcR)
          this.ctx.strokeRect(-smallArcR / 2, -smallArcR / 2 / 2, smallArcR, smallArcR / 2)
        }
      },
      fn7: () => {
        const bigArcX = 0
        const bigArcY = 0
        const bigArcR = areaWH / 2 * 0.9

        {
          const smallArcX = bigArcX - bigArcR / 1.4
          const smallArcY = bigArcY - bigArcR + bigArcR / 4
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.strokeRect(smallArcX, smallArcY, smallArcR, smallArcR)
        }

        {
          const smallArcX = bigArcX - bigArcR / 1.4
          const smallArcY = bigArcY + bigArcR / 2 - bigArcR / 4
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.strokeRect(smallArcX, smallArcY, smallArcR, smallArcR)
        }

        {
          const smallArcX = bigArcX + bigArcR / 2 - bigArcR / 4
          const smallArcY = bigArcY - bigArcR + bigArcR / 4
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.strokeRect(smallArcX, smallArcY, smallArcR, smallArcR)
        }

        {
          const smallArcX = bigArcX + bigArcR / 2 - bigArcR / 4
          const smallArcY = bigArcY + bigArcR / 2 - bigArcR / 4
          const smallArcR = bigArcR / 2 - this.ctx.lineWidth
          this.ctx.strokeRect(smallArcX, smallArcY, smallArcR, smallArcR)
          this.ctx.strokeRect(-smallArcR / 2, -smallArcR / 2 / 2, smallArcR, smallArcR / 2)
        }
      }
    }
    for (let i = 0; i < cols * row2; i++) {
      const idx = i % cols
      const idy = Math.floor(i / cols) + 1
      const x = (idx + 1) * areaWH / 2 + idx * areaWH / 2
      let y = idy * areaWH / 2
      if (i >= cols) {
        y = this.height - areaWH / 2
      }
      this.ctx.save()
      this.ctx.translate(x, y)
      this.ctx.rotate(this.angle1 * Math.PI / 180)
      this.ctx.lineWidth = lineWidth
      this.ctx.strokeStyle = 'rgba(0,255,0,0.8)'
      this.ctx.fillStyle = 'rgba(0,255,0,0.8)'
      this.ctx.setLineDash([lineWidth, lineWidth])
      fns[`fn${i}`].call(this, { bigArcX: 0, bigArcY: 0, areaWH })
      this.ctx.restore()
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
