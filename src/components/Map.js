import CarteImg from "../assets/map.png"

class Map {
  constructor() {
    var img = new Image()
    img.src = CarteImg
    this.img = img

    this.solidEntities = []
    this.mapBorder = []
  }

  render(ctx) {
    ctx.save()
    ctx.drawImage(this.img, 0, 0)
    ctx.restore()
  }

  update() { }

  registerSolideEntity(entity) {
    this.solidEntities.push(entity)
  }

  updateBorder(windowSize) {
    const leftBorder    = {position: {x: -100, y: 0}, size: {w: 100, h: windowSize.h}}
    const topBorder     = {position: {x: 0, y: -100}, size: {w: windowSize.w, h: 100}}
    const rightBorder   = {position: {x: windowSize.w, y: 0}, size: {w: 100, h: windowSize.h}}
    const bottomBorder  = {position: {x: 0, y: windowSize.h}, size: {w: windowSize.w, h: 100}}
    this.mapBorder = [
      leftBorder,
      topBorder,
      rightBorder,
      bottomBorder
    ]
  }

  collision(entity) {
    const {x: eX, y: eY} = entity.position
    const {w: eW, h: eH} = entity.size

    const collisionDetection = (obj) => {
      const {x: oX, y: oY} = obj.position
      const {w: oW, h: oH} = obj.size
      return (
        eX < oX + oW &&
        eX + eW > oX &&
        eY < oY + oH &&
        eY + eH > oY
      )
    }

    return this.solidEntities.some(collisionDetection) ||  
      this.mapBorder.some(collisionDetection)
  }
}

export default Map