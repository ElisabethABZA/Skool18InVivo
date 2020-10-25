import Camera from "../components/Camera"

describe("Test Camera Component", () => {
  test("Component is instanciated", () => {
    const x = 0
    const y = 1
    const w = 2
    const h = 4
    const followed = {}
    const map = {}

    const camera = new Camera(x, y, w, h, followed, map)

    expect(camera.viewPort.x).toBe(x)
    expect(camera.viewPort.y).toBe(y)
    expect(camera.viewPort.w).toBe(w)
    expect(camera.viewPort.h).toBe(h)
    expect(camera.followed).toBe(followed)
    expect(camera.map).toBe(map)
  })

  test("Camera ViewPort is updated", () => {
    const x = 0
    const newX = 10
    const y = 1
    const newY = 20
    const w = 2
    const newW = 40
    const h = 4
    const newH = 80
    const followed = {}
    const map = {}

    const camera = new Camera(x, y, w, h, followed, map)
    camera.updateViewPort(newX, newY, newW, newH)

    expect(camera.viewPort.x).toBe(newX)
    expect(camera.viewPort.y).toBe(newY)
    expect(camera.viewPort.w).toBe(newW)
    expect(camera.viewPort.h).toBe(newH)
  })

  describe("Camera clamp is clamping values", () => {
    test("Within min max", () => {
      const camera = new Camera()
      expect(camera.clamp(10, 0, 100)).toBe(10)
    })
    test("Less than min ", () => {
      const camera = new Camera()
      expect(camera.clamp(-100, 0, 100)).toBe(0)
    })
    test("Above than max", () => {
      const camera = new Camera()
      expect(camera.clamp(200, 0, 100)).toBe(100)
    })
  })

  describe("Camera successfuly follow object", () => {
    test("Followed move near 0,0", () => {
      const x = 5
      const y = 5
      const w = 400
      const h = 400
      const followedStub = {
        position: { x: 100, y: 100 },
      }
      const mapStub = {
        worldSize: {
          w: 1000,
          h: 1000,
        },
      }

      const camera = new Camera(x, y, w, h, followedStub, mapStub)
      camera.render()

      expect(camera.viewPort.x).toBe(0)
      expect(camera.viewPort.y).toBe(0)
    })

    test("Followed move near mapWidth, mapHeight", () => {
      const x = 5
      const y = 5
      const w = 400
      const h = 400
      const followedStub = {
        position: { x: 900, y: 900 },
      }
      const mapStub = {
        worldSize: {
          w: 1000,
          h: 1000,
        },
      }

      const camera = new Camera(x, y, w, h, followedStub, mapStub)
      camera.render()

      expect(camera.viewPort.x).toBe(w - mapStub.worldSize.w)
      expect(camera.viewPort.y).toBe(h - mapStub.worldSize.h)
    })

    test("Followed move in middle of the map", () => {
      const x = 5
      const y = 5
      const w = 20
      const h = 20
      const followedStub = {
        position: { x: 50, y: 50 },
      }
      const mapStub = {
        worldSize: {
          w: 1000,
          h: 1000,
        },
      }

      const camera = new Camera(x, y, w, h, followedStub, mapStub)
      camera.render()

      expect(camera.viewPort.x).toBe(-followedStub.position.x + w / 2)
      expect(camera.viewPort.y).toBe(-followedStub.position.y + h / 2)
    })
  })
})
