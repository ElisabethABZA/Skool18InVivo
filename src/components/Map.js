import CarteImg from "../assets/map.jpg"

class Map {
  constructor() {
    var img = new Image()
    img.src = CarteImg
    this.img = img

    this.worldSize = {
      w: img.width,
      h: img.height,
    }

    this.solidEntities = []

    const leftBorder = {
      position: { x: -100, y: 0 },
      size: { w: 100, h: this.worldSize.h },
    }
    const topBorder = {
      position: { x: 0, y: -100 },
      size: { w: this.worldSize.w, h: 100 },
    }
    const rightBorder = {
      position: { x: this.worldSize.w, y: 0 },
      size: { w: 100, h: this.worldSize.h },
    }
    const bottomBorder = {
      position: { x: 0, y: this.worldSize.h },
      size: { w: this.worldSize.w, h: 100 },
    }
    this.mapBorder = [leftBorder, topBorder, rightBorder, bottomBorder]
  }

  render(ctx, camera) {
    ctx.save()
    ctx.drawImage(
      this.img,
      -camera.viewPort.x,
      -camera.viewPort.y,
      camera.viewPort.w,
      camera.viewPort.h,
      0,
      0,
      camera.viewPort.w,
      camera.viewPort.h
    )
    ctx.restore()
  }

  update() {}

  registerSolideEntity(entity) {
    this.solidEntities.push(entity)
  }

  collision(entity) {
    const { x: eX, y: eY } = entity.position
    const { w: eW, h: eH } = entity.size

    const collisionDetection = (obj) => {
      const { x: oX, y: oY } = obj.position
      const { w: oW, h: oH } = obj.size
      return eX < oX + oW && eX + eW > oX && eY < oY + oH && eY + eH > oY
    }

    return (
      this.solidEntities.some(collisionDetection) ||
      this.mapBorder.some(collisionDetection)
    )
  }
}

export default Map
