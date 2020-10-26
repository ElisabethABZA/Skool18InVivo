import Player from "../components/Player"
import PlayerImg from "../assets/player.png"

describe("Test component Player", () => {
  test("Player is instanciated", () => {
    const x = 1
    const y = 2
    const w = 4
    const h = 8
    const img = PlayerImg
    const oracle = {
      position: { x, y },
      size: { w, h },
      moving: {
        left: false,
        up: false,
        right: false,
        down: false,
      },
    }
    const appCtxStub = {
      map: {},
    }

    const player = new Player(img, x, y, w, h, appCtxStub)

    expect(player).toMatchObject(oracle)
    expect(player.img.getAttribute("src")).toBe(img)
  })
  test("Player call contexte on render", () => {
    const x = 1
    const y = 2
    const w = 4
    const h = 8
    const img = PlayerImg
    const ctxSpy = {
      save: jest.fn(),
      drawImage: jest.fn(),
      restore: jest.fn(),
    }
    const appCtxStub = { map: {} }
    const cameraStub = {
      viewPort: {
        x: 16,
        y: 32,
        w: 64,
        h: 128,
      },
    }

    const player = new Player(img, x, y, w, h, appCtxStub)
    player.render(ctxSpy, cameraStub)

    expect(ctxSpy.save).toHaveBeenCalledTimes(1)
    expect(ctxSpy.drawImage).toHaveBeenCalledTimes(1)
    expect(ctxSpy.drawImage).toHaveBeenCalledWith(
      player.img,
      x + cameraStub.viewPort.x,
      y + cameraStub.viewPort.y,
      w,
      h
    )
    expect(ctxSpy.restore).toHaveBeenCalledTimes(1)
  })
  test("Player position change on player movement right", () => {
    const x = 1
    const y = 2
    const w = 4
    const h = 8
    const img = PlayerImg
    const eventRightStub = { keyCode: 39 }
    const appCtxStub = {
      map: { collision: () => false },
    }

    const player = new Player(img, x, y, w, h, appCtxStub)
    player.move(eventRightStub, true)
    player.update()

    expect(player.position).toMatchObject({ x: x + 5, y})
  })
  test("Player position change on player movement up", () => {
    const x = 1
    const y = 2
    const w = 4
    const h = 8
    const img = PlayerImg
    const eventUpStub = { keyCode: 38 }
    const appCtxStub = {
      map: { collision: () => false },
    }

    const player = new Player(img, x, y, w, h, appCtxStub)
    player.move(eventUpStub, true)
    player.update()

    expect(player.position).toMatchObject({x , y: y - 5 })
  })

  test("Player position change on joystick event", () => {
    const x = 1
    const y = 2
    const w = 4
    const h = 8
    const img = PlayerImg
    const eventJoyStickStub = {
      direction: {
        angle: "left",
      },
    }
    const appCtxStub = {
      map: { collision: () => false },
    }

    const player = new Player(img, x, y, w, h, appCtxStub)
    player.moveJoystick(eventJoyStickStub)
    player.update()

    expect(player.position).toMatchObject({ x: x - 5, y: y })
  })

  test("Player position stop on joystick stop event", () => {
    const x = 1
    const y = 2
    const w = 4
    const h = 8
    const img = PlayerImg
    const eventJoyStickStub = "stop"
    const appCtxStub = {
      map: { collision: () => false },
    }
    const movingOverload = {
      left: true,
      up: true,
      right: true,
      down: true,
    }

    const player = new Player(img, x, y, w, h, appCtxStub)
    player.moving = movingOverload
    player.moveJoystick(eventJoyStickStub)
    player.update()

    expect(player.position).toMatchObject({ x: x, y: y })
  })

  test("Player postion doesn't change on collision", () => {
    const x = 1
    const y = 2
    const w = 4
    const h = 8
    const img = PlayerImg
    const eventUpStub = { keyCode: 38 }
    const eventLeftStub = { keyCode: 37 }
    const appCtxStub = {
      map: { collision: () => true },
    }

    const player = new Player(img, x, y, w, h, appCtxStub)
    player.move(eventUpStub, true)
    player.move(eventLeftStub, true)
    player.update()

    expect(player.position).toMatchObject({ x: x, y: y })
  })
})
