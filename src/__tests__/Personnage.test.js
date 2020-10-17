import Personnage from "../components/Personnage"
import PersonnageImg from "../assets/personnage.png"

describe("Test composant Personnage", () => {
  test("Le personnage s'instencie avec les bon paramètres", () => {
    const x = 1
    const y = 2
    const w = 4
    const h = 8    
    const img = PersonnageImg
    const oracle = {
      position: {x, y},
      size: {w, h},
      moving: {
        left: false,
        up: false,
        right: false,
        down: false
      }
    }

    const personnage = new Personnage(img, x, y, w, h) 

    expect(personnage).toMatchObject(oracle)
    expect(personnage.img.getAttribute("src")).toBe(img)

  })
  test("Le personnage appel les fonctions de context pour s'afficher à la bonne place", () => {
    const x = 1
    const y = 2
    const w = 4
    const h = 8    
    const img = PersonnageImg
    const spyCtx = {
      save: jest.fn(),
      drawImage: jest.fn(),
      restore: jest.fn(),
    }

    const personnage = new Personnage(img, x, y, w, h)
    personnage.render(spyCtx)

    expect(spyCtx.save).toHaveBeenCalledTimes(1)
    expect(spyCtx.drawImage).toHaveBeenCalledTimes(1)
    expect(spyCtx.drawImage).toHaveBeenCalledWith(personnage.img, x, y, w, h)
    expect(spyCtx.restore).toHaveBeenCalledTimes(1)
  })
  test("La position du personnage change lorqu'il bouge en bas à droite et qu'il est affiché", () => {
    const x = 1
    const y = 2
    const w = 4
    const h = 8
    const img = PersonnageImg
    const stubEventDown = { keyCode: 40 }
    const stubEventRight = { keyCode: 39 }

    const personnage = new Personnage(img, x, y, w, h)
    personnage.move(stubEventDown, true)
    personnage.move(stubEventRight, true)
    personnage.update()
   
    expect(personnage.position).toMatchObject({x: x+5, y: y+5})
  })
  test("La position du personnage change lorqu'il bouge en heut à gauche et qu'il est affiché", () => {
    const x = 1
    const y = 2
    const w = 4
    const h = 8
    const img = PersonnageImg
    const stubEventUp = { keyCode: 38 }
    const stubEventLeft = { keyCode: 37 }

    const personnage = new Personnage(img, x, y, w, h)
    personnage.move(stubEventUp, true)
    personnage.move(stubEventLeft, true)
    personnage.update()
   
    expect(personnage.position).toMatchObject({x: x-5, y: y-5})
  })

})