import MapImg from "../assets/map.png"
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
    const appCtxStub = {
      camera: {
        viewPort: {
          x: 0,
          y: 0,
          w: 0,
          h: 0,
        },
      },
    }

    const map = new Map()
    map.render(ctxSpy, appCtxStub)

    expect(ctxSpy.save).toHaveBeenCalledTimes(1)
    expect(ctxSpy.drawImage).toHaveBeenCalledTimes(1)
    expect(ctxSpy.drawImage).toHaveBeenCalledWith(
      map.img,
      -appCtxStub.camera.viewPort.x,
      -appCtxStub.camera.viewPort.y,
      appCtxStub.camera.viewPort.w,
      appCtxStub.camera.viewPort.h,
      0,
      0,
      appCtxStub.camera.viewPort.w,
      appCtxStub.camera.viewPort.h
    )
    expect(ctxSpy.restore).toHaveBeenCalledTimes(1)
  })

  test("Map can register solid objects", () => {
    const entity = {
      position: { x: 0, y: 0, w: 0, h: 0 },
    }

    const map = new Map()
    map.registerSolideEntity(entity)

    expect(map.solidEntities).toHaveLength(1)
    expect(map.solidEntities[0]).toMatchObject(entity)
  })

  describe("Map can detect collisions", () => {
    test("Collision present", () => {
      const object = {
        x: 0,
        y: 0,
        w: 4,
        h: 4,
      }
      const personnageMock = {
        x: 1,
        y: 1,
        w: 1,
        h: 1,
      }

      const map = new Map()
      map.solidEntities = [object]
      const res = map.collision(personnageMock)

      expect(res).toBeTruthy()
    })

    test("Collision top", () => {
      const object = {
        x: 2,
        y: 2,
        w: 8,
        h: 8,
      }
      const personnageMock = {
        x: 4,
        y: 1,
        w: 2,
        h: 2,
      }

      const map = new Map()
      map.solidEntities = [object]
      const res = map.collision(personnageMock)

      expect(res).toBeTruthy()
    })

    test("Collision down", () => {
      const object = {
        x: 2,
        y: 2,
        w: 8,
        h: 8,
      }
      const personnageMock = {
        x: 4,
        y: 7,
        w: 2,
        h: 2,
      }

      const map = new Map()
      map.solidEntities = [object]
      const res = map.collision(personnageMock)

      expect(res).toBeTruthy()
    })

    test("Collision left", () => {
      const object = {
        x: 2,
        y: 2,
        w: 8,
        h: 8,
      }
      const personnageMock = {
        x: 1,
        y: 4,
        w: 2,
        h: 2,
      }

      const map = new Map()
      map.solidEntities = [object]
      const res = map.collision(personnageMock)

      expect(res).toBeTruthy()
    })

    test("Collision right", () => {
      const object = {
        x: 2,
        y: 2,
        w: 8,
        h: 8,
      }
      const personnageMock = {
        x: 7,
        y: 4,
        w: 2,
        h: 2,
      }

      const map = new Map()
      map.solidEntities = [object]
      const res = map.collision(personnageMock)

      expect(res).toBeTruthy()
    })

    test("No collisions", () => {
      const object = {
        x: 2,
        y: 2,
        w: 8,
        h: 8,
      }
      const personnageMock = {
        x: 1,
        y: 1,
        w: 1,
        h: 1,
      }

      const map = new Map()
      map.solidEntities = [object]
      const res = map.collision(personnageMock)

      expect(res).toBeFalsy()
    })
  })

  describe("Map detect action with interactible", () => {
    test("Map register interactible as solide entities", () => {
      const interactible = {
        position: {
          x: 100,
          y: 100,
          w: 10,
          h: 10,
        },
      }

      const map = new Map()
      map.registerInteractible(interactible)

      expect(map.interactibleEntities).toHaveLength(1)
      expect(map.interactibleEntities[0]).toMatchObject(interactible)
    })
    test("Detect no intractible", () => {
      const interactible = {
        position: {
          x: 100,
          y: 100,
          w: 10,
          h: 10,
        },
      }
      const personnageMock = {
        position: {
          x: 10,
          y: 10,
          w: 10,
          h: 10,
        },
        direction: "up",
      }

      const map = new Map()
      map.interactibleEntities = [interactible]
      const res = map.interaction(personnageMock)

      expect(res).toBeUndefined()
    })
    test("Detect intractible left", () => {
      const interactible = {
        position: {
          x: 0,
          y: 0,
          w: 9,
          h: 9,
        },
      }
      const personnageMock = {
        position: {
          x: 10,
          y: 0,
          w: 10,
          h: 10,
        },
        direction: "left",
      }

      const map = new Map()
      map.interactibleEntities = [interactible]
      const res = map.interaction(personnageMock)

      expect(res).toMatchObject(interactible)
    })
    test("Detect intractible right", () => {
      const interactible = {
        position: {
          x: 10,
          y: 0,
          w: 10,
          h: 10,
        },
      }
      const personnageMock = {
        position: {
          x: 0,
          y: 0,
          w: 9,
          h: 9,
        },
        direction: "right",
      }

      const map = new Map()
      map.interactibleEntities = [interactible]
      const res = map.interaction(personnageMock)

      expect(res).toMatchObject(interactible)
    })
    test("Detect intractible up", () => {
      const interactible = {
        position: {
          x: 0,
          y: 0,
          w: 9,
          h: 9,
        },
      }
      const personnageMock = {
        position: {
          x: 0,
          y: 10,
          w: 10,
          h: 10,
        },
        direction: "up",
      }

      const map = new Map()
      map.interactibleEntities = [interactible]
      const res = map.interaction(personnageMock)

      expect(res).toMatchObject(interactible)
    })
    test("Detect intractible down", () => {
      const interactible = {
        position: {
          x: 0,
          y: 10,
          w: 10,
          h: 10,
        },
      }
      const personnageMock = {
        position: {
          x: 0,
          y: 0,
          w: 9,
          h: 9,
        },
        direction: "down",
      }

      const map = new Map()
      map.interactibleEntities = [interactible]
      const res = map.interaction(personnageMock)

      expect(res).toMatchObject(interactible)
    })
  })
})
