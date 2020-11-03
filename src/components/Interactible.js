import Dialog from "./Dialog"

class Interactible {
  constructor(x, y, w, h, appCtx, data) {
    this.position = { x, y, w, h }
    this.state = false
    this.dialog = new Dialog(data.name, data.text, data.skill, data.img)
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
  render() { }
}

export default Interactible
