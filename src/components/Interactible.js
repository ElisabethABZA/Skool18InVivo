import SrcDiag from "../assets/dialogBox.png"
import SkillBoardImg from "../assets/skillboard.png"
import Dialog from "./Dialog"

const createImage = (src) => {
  var img = new Image()
  img.src = src
  return img
}

class Interactible {
  constructor(src, x, y, w, h, appCtx, data) {
    this.position = { x, y, w, h }
    this.img = createImage(src)
    this.diagImg = createImage(SrcDiag)
    this.skillboardImg = createImage(SkillBoardImg)
    this.state = false
    this.dialog = new Dialog(data.name, data.text, data.skill)
    this.appCtx = appCtx
  }

  action() {
    this.state = !this.state
    if(this.state) {
      this.appCtx.entities.push(this.dialog)
    } else {
      this.appCtx.entities.pop()
    }
    return this.state
  }

  update() { }
  render(ctx, AppCtx) {
    const camera = AppCtx.camera
    const { x, y, w, h } = this.position

    ctx.save()
    ctx.drawImage(this.img,
      0, 0, 32, 32, x + camera.viewPort.x, y + camera.viewPort.y, w, h)
    ctx.restore()
  }
}

export default Interactible
