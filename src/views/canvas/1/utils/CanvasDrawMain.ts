let self
const onKeyDownTrigger = async (e) => {
  console.log('e.keyCode：', e.keyCode)
  if (e.keyCode !== 32) return
  self.draw()
  self.moveArc()
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
  angle = 0

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
    this.drawArc()
  }

  clear () {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  drawBgColor () {
    this.ctx.save()
    this.ctx.beginPath()

    this.ctx.rect(0, 0, this.width, this.height)
    this.ctx.fill()

    this.ctx.closePath()
    this.ctx.restore()
  }

  drawGuideLine () {
    this.ctx.save()
    this.ctx.beginPath()

    this.ctx.strokeStyle = 'rgba(0,255,0,0.8)'
    this.ctx.setLineDash([1, 1])
    this.ctx.moveTo(0, this.centerY)
    this.ctx.lineTo(this.width, this.centerY)
    this.ctx.moveTo(this.centerX, 0)
    this.ctx.lineTo(this.centerX, this.height)
    this.ctx.stroke()

    this.ctx.closePath()
    this.ctx.restore()
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

  drawArc () {
    this.ctx.save()

    this.ctx.translate(this.centerX, this.centerY)
    this.ctx.rotate(this.angle * Math.PI / 180)

    this.ctx.beginPath()
    const bigArcX = 0
    const bigArcY = 0
    const bigArcR = this.centerY * 0.9
    this.ctx.lineWidth = Math.min(this.width, this.height) / 100
    this.ctx.strokeStyle = 'rgba(0,255,0,0.8)'
    this.ctx.arc(bigArcX, bigArcY, bigArcR, 0, 360)
    this.ctx.stroke()
    this.ctx.closePath()

    this.ctx.beginPath()
    const smallArcX = bigArcX
    const smallArcY = bigArcY + bigArcR / 2
    const smallArcR = bigArcR / 2 - this.ctx.lineWidth
    this.ctx.arc(smallArcX, smallArcY, smallArcR, 0, 360)
    this.ctx.stroke()
    this.ctx.closePath()

    this.ctx.closePath()
    this.ctx.restore()
  }

  // 判断旋转方向
  rotateDir (angle) {
    let str = '相对静止'
    const criticalValue = 36 // criticalValue是旋转角度的临界值 发现每帧的旋转角度低于这个值时 视觉效果上体现出来的 全是顺时针旋转
    if (angle >= criticalValue && 360 % angle === 0) return str
    if (angle % criticalValue !== 0) {
      let num = Math.round(360 / angle)
      if (num < 2) num = 2
      const three = angle * (num + 1) % 360
      if (three > angle || angle < criticalValue) {
        str = '顺时针旋转'
      } else {
        str = '逆时针旋转'
      }
    }
    return str
  }

  moveArc () {
    cancelAnimationFrame(this.timer1)

    let x = 0
    let i = 1
    this.angle = 0

    const changAngleTrigger = () => {
      this.timer1 = requestAnimationFrame(() => {
        console.log('changAngleTrigger：')
        x++
        const temp = 39
        console.log(this.rotateDir(temp))
        this.angle += temp
        this.angle %= 360
        // if (x % 10 === 0) {
        //   this.audios[x % this.audioMax].play()
        //   i++
        // }
        // this.draw()
        // if (i < 720) {
        //   changAngleTrigger()
        // }
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
