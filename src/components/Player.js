
const createImage = (src) => {
  var img = new Image()
  img.src = src
  return img
}

class Player {
  constructor(src, x, y, w, h, appCtx) {
    this.position = {x, y}
    this.size = { w, h }
    this.moving = {
      left: false,
      up: false,
      right: false,
      down: false
    }
    this.img = createImage(src)
    this.map = appCtx.map
  }

  moveJoystick(e) {
    if(e === "stop") {
      this.moving.left = false
      this.moving.up = false
      this.moving.right = false
      this.moving.down = false
      return
    }
    this.moving.left = e.direction.angle === "left"
    this.moving.up = e.direction.angle === "up"
    this.moving.right = e.direction.angle === "right"
    this.moving.down = e.direction.angle === "down"
  }

  move(e, value) {
    if(e.keyCode === 37) this.moving.left  = value // Left
    if(e.keyCode === 38) this.moving.up    = value // Up
    if(e.keyCode === 39) this.moving.right = value // Right
    if(e.keyCode === 40) this.moving.down  = value // Down
  }

  update() {
    const {x, y} = this.position
    if(this.moving.left  && !this.map.collision({...this, position: {x: x-5, y}}) ) this.position.x  -= 5
    if(this.moving.up    && !this.map.collision({...this, position: {x, y: y-5}}) ) this.position.y  -= 5
    if(this.moving.right && !this.map.collision({...this, position: {x: x+5, y}}) ) this.position.x  += 5
    if(this.moving.down  && !this.map.collision({...this, position: {x, y: y+5}}) ) this.position.y  += 5
  }

  render(ctx) {
    const {x, y} = this.position
    const {w, h} = this.size

    ctx.save()
    ctx.drawImage(this.img, x, y, w, h)
    ctx.restore()

  }
}

export default Player