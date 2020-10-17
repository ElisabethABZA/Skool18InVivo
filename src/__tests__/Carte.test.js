import CarteImg from "../assets/carte.png"
import Carte from "../components/Carte"

describe("Test composant Carte", () => {
  test("La carte s'instencie avec la bonne image", () => {
    const carte = new Carte()
    expect(carte.img.getAttribute("src")).toEqual(CarteImg)
  })
  test("La carte appel les fonction de context pour s'afficher en 0,0", () => {
    const ctxSpy = {
      save: jest.fn(),
      drawImage: jest.fn(),
      restore: jest.fn(),
    }

    const carte = new Carte()
    carte.render(ctxSpy)

    expect(ctxSpy.save).toHaveBeenCalledTimes(1)
    expect(ctxSpy.drawImage).toHaveBeenCalledTimes(1)
    expect(ctxSpy.drawImage).toHaveBeenCalledWith(carte.img,0,0)
    expect(ctxSpy.restore).toHaveBeenCalledTimes(1)
  })
})