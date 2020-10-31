import SrcDiag from "../assets/dialogBox.png"
import loarray from "lodash/array"

const createImage = (src) => {
  var img = new Image()
  img.src = src
  return img
}

class Interactible {
  constructor(src, x, y, w, h) {
    this.position = { x, y, w, h }
    this.img = createImage(src)
    this.diagImg = createImage(SrcDiag)
    this.state = false
    this.dialog = "Tu passes une bonne visite ?"
  }

  action() {
    this.state = !this.state
    return this.state
  }

  update() {}
  render(ctx, camera) {
    ctx.save()
    const { x, y, w, h } = this.position

    switch (this.state) {
      case 1:
      default:
        break
    }
    if (this.state) {
      // Dialog
      const dx = 20
      const dy = camera.viewPort.h - 64 - 20
      const dw = camera.viewPort.w - 16 - 16 - 20

      let dialog = []
      const textWidth = ctx.measureText(this.dialog).width
      if(textWidth > dw) dialog = loarray.chunk(this.dialog.split(" "), 4)
      else dialog = [this.dialog.split(" ")]

      ctx.drawImage(this.diagImg, 0, 0, 8, 32, dx, dy, 16, 64)
      ctx.drawImage(this.diagImg, 9, 0, 1, 32, dx + 16, dy, dw - 16 - 8, 64)
      ctx.drawImage(this.diagImg, 104, 0, 8, 32, dx + dw - 16, dy, 16, 64)

      ctx.font = "16px dialog"
      for(let line = 0; line < dialog.length; line++) {
        ctx.fillText(dialog[line].join(" "), dx + 16, dy + 16 + 4 + (16*line), dw)
      }
    }

    ctx.drawImage(this.img,
      0, 0, 32, 32, x + camera.viewPort.x, y + camera.viewPort.y, w, h)
    ctx.restore()
  }
}

export default Interactible
