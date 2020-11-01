import dialogImgSrc from "../assets/dialogBox.png"
import skillImgSrc from "../assets/skillboard2.png"
import loarray from "lodash/array"

const createImage = (src) => {
  var img = new Image()
  img.src = src
  return img
}

class Dialog {
  constructor(name, text, techlist) {
    this.name = name
    this.text = text
    this.techlist = techlist.map((t) => {
      return createImage(t)
    })
    this.dialogImg = createImage(dialogImgSrc)
    this.skillboardImg = createImage(skillImgSrc)
  }

  update() {}
  render(ctx, AppCtx) {
    const camera = AppCtx.camera

    ctx.save()
    const dx = 20
    const dy = camera.viewPort.h - 64 - 20
    const dw = camera.viewPort.w - 16 - 16 - 20

    ctx.font = "16px dialog"
    let chunkText = []
    if (camera.viewPort.w < 800) chunkText = loarray.chunk(this.text.split(" "), 6)
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

    let skillW = camera.viewPort.w - 20
    if (camera.viewPort.w > 800) skillW = camera.viewPort.w * 0.5
    const skillH = camera.viewPort.h * 0.75 // camera.viewPort.h - 64 - 20 - 8
    const skillX = 20
    const skillY = dy - skillH - 8
    ctx.drawImage(
      this.skillboardImg,
      0,
      0,
      91,
      77,
      skillX,
      skillY,
      skillW,
      skillH
    )

    const ratioH = skillH / 77
    const ratioW = skillW / 91

    ctx.font = "26px dialog"
    ctx.fillStyle = "#ffb35b"
    const nameWidth = ctx.measureText(this.name).width
    ctx.fillText(
      this.name,
      skillX - nameWidth / 2 + skillW * 0.5,
      skillY + 11 * ratioH
    )
    


    // Print skills icon
    for (let line = 0; line < 3; line++) {
      for (let col = 0; col < 3; col++) {
        const timg = this.techlist[3*line+col]
        const x = skillX + 11 * ratioW
        const y = skillY + 25 * ratioH
        const w = 16 * ratioW
        const h = 16 * ratioH
        if(timg)
          ctx.drawImage(timg, 0, 0, timg.width, timg.height,
            x + ((16+8) * ratioW * col), 
            y + ((16+8) * ratioH * line),
            w, h
          )
      }
    }

    ctx.restore()
  }
}

export default Dialog
