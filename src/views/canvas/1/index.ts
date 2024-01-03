class CanvasDraw {
  options = { wrap: '.canvas-wrap' }
  canvasWrap
  canvas
  width
  height
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
    this.width = clientWidth
    this.height = clientHeight
    this.canvas.width = this.width
    this.canvas.height = this.height
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
    this.ctx.rect(0, 0, this.width, this.height)
    this.ctx.fill()
  }
}

export { CanvasDraw }
