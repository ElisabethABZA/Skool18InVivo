import { CarteImg } from "./Assets"
class World {
  constructor() {
    this.img = CarteImg

    this.worldSize = {
      w: this.img.width,
      h: this.img.height,
    }

    this.solidEntities = []
    this.interactibleEntities = []
    this.visitors = new Map()
    this.mapBorder = [/*leftBorder, topBorder, rightBorder, bottomBorder*/]
  }

  render(ctx, AppCtx) {
    const camera = AppCtx.camera


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
    this.visitors.forEach(v => v.render(ctx, AppCtx))
    ctx.restore()
  }

  update() {}

  registerSolideEntity(entity) {
    this.solidEntities.push(entity)
  }

  registerInteractible(entity) {
    this.interactibleEntities.push(entity)
    this.solidEntities.push(entity.position)
  }

  collision({x: eX, y: eY, w: eW, h: eH}) {
    const collisionDetection = ({ x: oX, y: oY, w: oW, h: oH }) => {
      return eX < oX + oW && eX + eW > oX && eY < oY + oH && eY + eH > oY
    }

    return (
      this.solidEntities.some(collisionDetection) ||
      this.mapBorder.some(collisionDetection)
    )
  }

  interaction(player) {
    const {x: eX, y: eY, w: eW, h: eH} = player.position
    const direction = player.direction
    const collisionDetection = ({ position: { x: oX, y: oY, w: oW, h: oH }}) => {
      switch(direction) {
        case "left": {
          const x = eX - eW * 0.5
          const y = eY + eH * 0.5
          return x < oX + oW && x + eW > oX && y < oY + oH && y + eH > oY
        }
        case "up": {
          const x = eX + eW * 0.5
          const y = eY - eH * 0.5
          return x < oX + oW && x + eW > oX && y < oY + oH && y + eH > oY
        }
        case "right": {
          const x = eX + eW * 1.5
          const y = eY + eH * 0.5
          return x < oX + oW && x + eW > oX && y < oY + oH && y + eH > oY
        }
        case "down": {
          const x = eX + eW * 0.5
          const y = eY + eH * 1.5
          return x < oX + oW && x + eW > oX && y < oY + oH && y + eH > oY
        }
        default: return false;
      }
    }

    return this.interactibleEntities.find(collisionDetection)
  }
}

export default World
