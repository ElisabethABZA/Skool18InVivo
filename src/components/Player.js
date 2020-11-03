class Player {
  constructor(src, x, y, w, h, appCtx) {
    this.position = { x, y, w, h }
    this.moving = {
      left: false,
      up: false,
      right: false,
      down: false,
    }
    this.action = false
    this.lastClick = Date.now()
    this.frame = 0
    this.direction = "down"
    this.directionTile = {
      left: { x: 0, y: 32, w: 32, h: 32 },
      up: { x: 0, y: 32 * 3, w: 32, h: 32 },
      right: { x: 0, y: 32 * 2, w: 32, h: 32 },
      down: { x: 0, y: 0, w: 32, h: 32 },
    }
    this.img = src
    this.map = appCtx.map
  }

  joystickEvent(e) {
    if (e === "start") {
      const now = Date.now()
      const elapsed = now - this.lastClick
      if (elapsed < 300 && elapsed > 0) {
        const interaction = this.map.interaction(this)
        if (interaction) {
          this.action = interaction.action()
        }
      }
      this.lastClick = Date.now()

      return
    }
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
      // Left
      this.moving.left = value
    } else if (e.keyCode === 38) {
      // Up
      this.moving.up = value
    } else if (e.keyCode === 39) {
      // Right
      this.moving.right = value
    } else if (e.keyCode === 40) {
      // Down
      this.moving.down = value
    } else if (e.keyCode === 32 && value) {
      // Space
      const interaction = this.map.interaction(this)
      if (interaction) {
        this.action = interaction.action()
      }
    }
  }

  update(AppCtx) {
    const { x, y, w, h } = this.position
    if (this.action) return // No move if in action
    if (
      this.moving.left &&
      !this.map.collision({ x: x - 5, y: y + 32, w, h: h - 32 })
    ) {
      this.position.x -= 5
      this.frame = (this.frame + 1) % 15
      this.direction = "left"
    } else if (
      this.moving.up &&
      !this.map.collision({ x, y: y - 5 + 32, w, h: h- 32 })
    ) {
      this.position.y -= 5
      this.frame = (this.frame + 1) % 15
      this.direction = "up"
    } else if (
      this.moving.right &&
      !this.map.collision({ x: x + 5, y: y + 32, w, h: h-32 })
    ) {
      this.position.x += 5
      this.frame = (this.frame + 1) % 15
      this.direction = "right"
    } else if (
      this.moving.down &&
      !this.map.collision({ x, y: y + 5 + 32, w, h: h - 32 })
    ) {
      this.position.y += 5
      this.frame = (this.frame + 1) % 15
      this.direction = "down"
    } else {
      this.frame = 0
    }
    /*
    db.ref("/visitors/" + AppCtx.id).update({
      x,
      y,
      direction: this.direction,
    })
    */
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

  render(ctx, appCtx) {
    const camera = appCtx.camera
    const { x, y, w, h } = this.position
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
