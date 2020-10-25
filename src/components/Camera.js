class Camera {
  constructor(x, y, w, h, followed, map) {
    this.viewPort = {
      x,
      y,
      w,
      h,
    }
    this.followed = followed
    this.map = map
  }

  updateViewPort(x, y, w, h) {
    this.viewPort = { x, y, w, h }
  }

  update() {}

  render() {
    this.viewPort.x = this.clamp(
      -this.followed.position.x + this.viewPort.w / 2,
      this.viewPort.w - this.map.worldSize.w,
      0
    )
    this.viewPort.y = this.clamp(
      -this.followed.position.y + this.viewPort.h / 2,
      this.viewPort.h - this.map.worldSize.h,
      0
    )
  }

  clamp(n, lo, hi) {
    return n < lo ? lo : n > hi ? hi : n
  }
}

export default Camera
