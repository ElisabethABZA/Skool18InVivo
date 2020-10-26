const createImage = (src) => {
  var img = new Image()
  img.src = src
  return img
}

class Interactible {
  constructor(src, x, y, w, h) {
    this.position = {x, y}
    this.size = {w, h}
    this.img = createImage(src)
    this.state = {
      active: true
    }
  }

  activate() {
    this.state.active = true
  }

  deactivate() {
    this.state.active = false
  }

  update() {}
  render(ctx, camera) {
    const { x, y } = this.position
    const { w, h } = this.size

    ctx.save()
    ctx.drawImage(this.img, x + camera.viewPort.x, y + camera.viewPort.y, w, h)
    if(this.state.active) {
      ctx.font = '32px dialog'
      ctx.fillText("Mon petit message", 100, 100)
    }
    ctx.restore()
  }
}

export default Interactible