import Interactible from "../components/Interactible"

describe("Test class Interactible", () => {
  test("Interactible is instanciated", () => {
    const x = 1
    const y = 2
    const w = 4
    const h = 8
    const src = "src"
    const oracle = {
      position: { x, y, w, h },
    }
    const dataStub = {
      name: "",
      text: "",
      skill: []
    }
    const AppCtx = { }

    const interactible = new Interactible(src, x, y, w, h, AppCtx, dataStub)

    expect(interactible).toMatchObject(oracle)
    expect(interactible.img.getAttribute("src")).toBe(src)
  })

  test("Interactible change state on interaction", () => {
    const x = 1
    const y = 2
    const w = 4
    const h = 8
    const src = "src"
    const dataStub = {
      name: "",
      text: "",
      skill: []
    }
    const AppCtx = {
      entities: {
        push: jest.fn(),
        pop: jest.fn()
      }
    }

    const interactible = new Interactible(src, x, y, w, h, AppCtx, dataStub)
    const initialState = interactible.state
    interactible.action()

    expect(interactible.state).not.toBe(initialState)
    expect(AppCtx.entities.push).toHaveBeenCalledTimes(1)

  })

  test("Interactible display dialogue", () => {


  })
})
