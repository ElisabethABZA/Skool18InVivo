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

    const interactible = new Interactible(src, x, y, w, h)

    expect(interactible).toMatchObject(oracle)
    expect(interactible.img.getAttribute("src")).toBe(src)
  })

  test("Interactible change state on interaction", () => {
    const x = 1
    const y = 2
    const w = 4
    const h = 8
    const src = "src"

    const interactible = new Interactible(src, x, y, w, h)
    const initialState = interactible.state
    interactible.action()

    expect(interactible.state).not.toBe(initialState)

  })

  test("Interactible display dialogue", () => {


  })
})
