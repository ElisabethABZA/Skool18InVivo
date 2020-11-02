const createImage = (src) => {
  var img = new Image()
  img.src = src
  return img
}

class Visitor {
  constructor(src, name, x, y, w, h, appCtx) {
    this.name = name
    this.position = { x, y, w, h }
    this.frame = 0
    this.direction = "down"
    this.directionTile = {
      left: { x: 0, y: 32, w: 32, h: 32 },
      up: { x: 0, y: 32 * 3, w: 32, h: 32 },
      right: { x: 0, y: 32 * 2, w: 32, h: 32 },
      down: { x: 0, y: 0, w: 32, h: 32 },
    }
    this.img = createImage(src)
  }

  update(doc) {
    this.position.x = doc.x
    this.position.y = doc.y
    this.direction = doc.direction
    this.frame = (this.frame + 1) % 15
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

export default Visitor
