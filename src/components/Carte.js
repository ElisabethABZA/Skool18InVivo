import CarteImg from "../assets/carte.png"

// Charger la carte

class Carte {
  constructor() {
    var img = new Image()
    img.src = CarteImg
    this.img = img
  }

  render(ctx) {
    ctx.save()
    ctx.drawImage(this.img, 0, 0)
    ctx.restore()
  }

  update() { }
}

export default Carte