import MapImg from "../assets/map.jpg"
import Map from "../components/Map"

describe("Test component Map", () => {
  test("Map is instanciated", () => {
    const map = new Map()
    expect(map.img.getAttribute("src")).toEqual(MapImg)
  })
  test("Map call context on render", () => {
    const ctxSpy = {
      save: jest.fn(),
      drawImage: jest.fn(),
      restore: jest.fn(),
    }
    const cameraStub = {
      viewPort: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
    }

    const map = new Map()
    map.render(ctxSpy, cameraStub)

    expect(ctxSpy.save).toHaveBeenCalledTimes(1)
    expect(ctxSpy.drawImage).toHaveBeenCalledTimes(1)
    expect(ctxSpy.drawImage).toHaveBeenCalledWith(
      map.img,
      -cameraStub.viewPort.x,
      -cameraStub.viewPort.y,
      cameraStub.viewPort.w,
      cameraStub.viewPort.h,
      0,
      0,
      cameraStub.viewPort.w,
      cameraStub.viewPort.h
    )
    expect(ctxSpy.restore).toHaveBeenCalledTimes(1)
  })

  test("Map can register solid objects", () => {
    const entity = {
      position: { x: 0, y: 0 },
      size: { w: 0, h: 0 },
    }

    const map = new Map()
    map.registerSolideEntity(entity)

    expect(map.solidEntities).toHaveLength(1)
    expect(map.solidEntities[0]).toMatchObject(entity)
  })

  describe("Map can detect collisions", () => {
    test("Collision present", () => {
      const object = {
        position: { x: 0, y: 0 },
        size: { w: 4, h: 4 },
      }
      const personnageMock = {
        position: { x: 1, y: 1 },
        size: { w: 1, h: 1 },
      }

      const map = new Map()
      map.solidEntities = [object]
      const res = map.collision(personnageMock)

      expect(res).toBeTruthy()
    })

    test("Collision top", () => {
      const object = {
        position: { x: 2, y: 2 },
        size: { w: 8, h: 8 },
      }
      const personnageMock = {
        position: { x: 4, y: 1 },
        size: { w: 2, h: 2 },
      }

      const map = new Map()
      map.solidEntities = [object]
      const res = map.collision(personnageMock)

      expect(res).toBeTruthy()
    })

    test("Collision down", () => {
      const object = {
        position: { x: 2, y: 2 },
        size: { w: 8, h: 8 },
      }
      const personnageMock = {
        position: { x: 4, y: 7 },
        size: { w: 2, h: 2 },
      }

      const map = new Map()
      map.solidEntities = [object]
      const res = map.collision(personnageMock)

      expect(res).toBeTruthy()
    })

    test("Collision left", () => {
      const object = {
        position: { x: 2, y: 2 },
        size: { w: 8, h: 8 },
      }
      const personnageMock = {
        position: { x: 1, y: 4 },
        size: { w: 2, h: 2 },
      }

      const map = new Map()
      map.solidEntities = [object]
      const res = map.collision(personnageMock)

      expect(res).toBeTruthy()
    })

    test("Collision right", () => {
      const object = {
        position: { x: 2, y: 2 },
        size: { w: 8, h: 8 },
      }
      const personnageMock = {
        position: { x: 7, y: 4 },
        size: { w: 2, h: 2 },
      }

      const map = new Map()
      map.solidEntities = [object]
      const res = map.collision(personnageMock)

      expect(res).toBeTruthy()
    })

    test("No collisions", () => {
      const object = {
        position: { x: 2, y: 2 },
        size: { w: 8, h: 8 },
      }
      const personnageMock = {
        position: { x: 1, y: 1 },
        size: { w: 1, h: 1 },
      }

      const map = new Map()
      map.solidEntities = [object]
      const res = map.collision(personnageMock)

      expect(res).toBeFalsy()
    })
  })
})
