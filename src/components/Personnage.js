
const createImage = (src) => {
  var img = new Image()
  img.src = src
  return img
}

class Personnage {
  constructor(src, x, y, w, h) {
    this.position = {x, y}
    this.size = { w, h }
    this.moving = {
      left: false,
      up: false,
      right: false,
      down: false
    }
    this.img = createImage(src)
  }

  move(e, value) {
    if(e.keyCode === 37) this.moving.left  = value // Left
    if(e.keyCode === 38) this.moving.up    = value // Up
    if(e.keyCode === 39) this.moving.right = value // Right
    if(e.keyCode === 40) this.moving.down  = value // Down
  }

  update() {
    if(this.moving.left) this.position.x  -= 5
    if(this.moving.up) this.position.y    -= 5
    if(this.moving.right) this.position.x += 5
    if(this.moving.down) this.position.y  += 5
  }

  render(ctx) {
    const {x, y} = this.position
    const {w, h} = this.size

    ctx.save()
    ctx.drawImage(this.img, x, y, w, h)
    ctx.restore()

  }
}

export default Personnage