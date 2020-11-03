import { dialogImgSrc } from "./Assets"
import loarray from "lodash/array"



class Interactible {
  constructor(x, y, w, h, appCtx, data) {
    this.position = { x, y, w, h }
    this.dialogImg = dialogImgSrc
    this.state = false
    this.text = data.text
    this.appCtx = appCtx
  }

  action() {
    this.state = !this.state
    if (this.state) {
      this.appCtx.entities.push(this)
    } else {
      this.appCtx.entities.pop()
    }
    return this.state
  }

  update() {}
  render(ctx, AppCtx) {
    const camera = AppCtx.camera

    if (this.state) {
      const dy = camera.viewPort.h - 64 - 64
      let dw = camera.viewPort.w / 2 - 16
      if (camera.viewPort.w < 800) dw = camera.viewPort.w - 16 - 16 - 20
      const dx = camera.viewPort.w / 2 - dw / 2

      ctx.font = "16px dialog"
      let chunkText = []
      if (camera.viewPort.w < 800)
        chunkText = loarray.chunk(this.text.split(" "), 6)
      else chunkText = [this.text.split(" ")]
      ctx.drawImage(this.dialogImg, 0, 0, 8, 32, dx, dy, 16, 64)
      ctx.drawImage(this.dialogImg, 9, 0, 1, 32, dx + 16, dy, dw - 16 - 8, 64)
      ctx.drawImage(this.dialogImg, 104, 0, 8, 32, dx + dw - 16, dy, 16, 64)

      for (let line = 0; line < chunkText.length; line++) {
        ctx.fillText(
          chunkText[line].join(" "),
          dx + 16,
          dy + 16 + 4 + 16 * line,
          dw
        )
      }
    }
  }
}

export default Interactible
