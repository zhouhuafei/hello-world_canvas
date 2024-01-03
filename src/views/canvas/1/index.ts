class CanvasDraw {
  options = { wrap: '.canvas-wrap' }
  canvasWrap
  canvas
  ctx

  constructor (options: any = {}) {
    Object.assign(this.options, options)

    this.init()
  }

  init () {
    this.genCanvas()
    this.genCtx()
    this.draw()
  }

  genCanvas () {
    this.canvasWrap = document.querySelector(this.options.wrap)
    this.canvas = document.createElement('canvas')
    const { clientWidth, clientHeight } = document.documentElement
    this.canvas.width = clientWidth
    this.canvas.height = clientHeight
    this.canvas.style.display = 'block'
    this.canvasWrap.appendChild(this.canvas)
  }

  genCtx () {
    this.ctx = this.canvas.getContext('2d')
  }

  draw () {
    this.drawReact()
  }

  drawReact () {
    this.ctx.rect(0, 0, 100, 100)
    this.ctx.fill()
  }
}

export { CanvasDraw }
