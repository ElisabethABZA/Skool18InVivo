const createImage = (src) => {
  var img = new Image()
  img.src = src
  return img
}

class Player {
  constructor(src, x, y, w, h, appCtx) {
    this.position = { x, y }
    this.size = { w, h }
    this.moving = {
      left: false,
      up: false,
      right: false,
      down: false,
    }
    this.frame = 0
    this.direction = "up"
    this.directionTile = {
      left: { x: 0, y: 32, w: 32, h: 32 },
      up: { x: 0, y: 32 * 3, w: 32, h: 32 },
      right: { x: 0, y: 32 * 2, w: 32, h: 32 },
      down: { x: 0, y: 0, w: 32, h: 32 },
    }
    this.img = createImage(src)
    this.map = appCtx.map
  }

  moveJoystick(e) {
    if (e === "stop") {
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
    if (e.keyCode === 37) {
      this.moving.left = value // Left
    } else if (e.keyCode === 38) {
      this.moving.up = value // Up
    } else if (e.keyCode === 39) {
      this.moving.right = value // Right
    } else if (e.keyCode === 40) {
      this.moving.down = value // Down
    }
  }

  update() {
    const { x, y } = this.position
    if (
      this.moving.left &&
      !this.map.collision({ ...this, position: { x: x - 5, y } })
    ) {
      this.position.x -= 5
      this.direction = "left"
      this.frame = (this.frame + 1) % 15
    } else if (
      this.moving.up &&
      !this.map.collision({ ...this, position: { x, y: y - 5 } })
    ) {
      this.position.y -= 5
      this.direction = "up"
      this.frame = (this.frame + 1) % 15
    } else if (
      this.moving.right &&
      !this.map.collision({ ...this, position: { x: x + 5, y } })
    ) {
      this.position.x += 5
      this.direction = "right"
      this.frame = (this.frame + 1) % 15
    } else if (
      this.moving.down &&
      !this.map.collision({ ...this, position: { x, y: y + 5 } })
    ) {
      this.position.y += 5
      this.direction = "down"
      this.frame = (this.frame + 1) % 15
    } else {
      this.frame = 0
    }
  }

  choseDirectionTile() {
    switch (this.direction) {
      default:
      case "left":
        return this.directionTile.left
      case "up":
        return this.directionTile.up
      case "right":
        return this.directionTile.right
      case "down":
        return this.directionTile.down
    }
  }

  render(ctx, camera, appCtx) {
    const { x, y } = this.position
    const { w, h } = this.size

    const { x: sX, y: sY, w: sW, h: sH } = this.choseDirectionTile()

    const frameOffset = (frame) => {
      if (frame < 5) return 32
      else if (frame < 10) return 64
      else return 0
    }

    ctx.save()
    ctx.drawImage(
      this.img,
      sX + frameOffset(this.frame),
      sY,
      sW,
      sH,
      x + camera.viewPort.x,
      y + camera.viewPort.y,
      w,
      h
    )
    ctx.restore()
  }
}

export default Player
