import React, { useEffect, useRef, useState } from 'react';

import Carte from './components/Carte'
import Personnage from './components/Personnage'

import PersoA from './assets/personnage.png'

const AppCtx = {
  visiteur: null,
  objects: []
}

const App = () => {
  const canvaRef = useRef(null)
  const [ windowSize, setWindowSize ] = useState({
    w: window.innerWidth,
    h: window.innerHeight
  })

  const gameLoop = (ctx) => {
    update()
    render(ctx)
    requestAnimationFrame( () => {gameLoop(ctx)})
  }

  const update = () => {
    AppCtx.objects.forEach(
      obj => obj.update()
    )
    AppCtx.visiteur.update()
  }

  const render = (ctx) => {
    ctx.clearRect(0, 0, windowSize.w, windowSize.h);
    ctx.save()
    AppCtx.objects.forEach(
      (obj) => {obj.render(ctx)}
    )
    AppCtx.visiteur.render(ctx)
    ctx.restore()
  }

  const registerObjects = () => {
    AppCtx.objects.push(new Carte(0,0))
    AppCtx.visiteur = new Personnage(PersoA, 200, 200, 50, 100)
  }

  const registerCallbacks = () => {
    window.addEventListener('keydown', e => AppCtx.visiteur.move(e, true));
    window.addEventListener('keyup',   e => AppCtx.visiteur.move(e, false));
    window.addEventListener('resize', () => { 
      setWindowSize({ w: window.innerWidth, h: window.innerHeight})
    }) 
  }

  useEffect(() => {
    const ctx = canvaRef.current.getContext("2d")
    registerObjects()
    registerCallbacks()
    requestAnimationFrame( () => {gameLoop(ctx)})
  })

  const {h, w} = windowSize
  return <canvas ref={canvaRef} width={w} height={h} />;
}

export default App;
