import React, { useEffect, useRef } from 'react';
import ReactNipple from "react-nipple"
import 'react-nipple/lib/styles.css';

import Map from './components/Map'
import Player from './components/Player'

import PersoA from './assets/player.png'

/**
 * TODO: 
 * Remove resize event; make viewport fixed in size: 800x800 ?
 */

const AppCtx = {
  windowSize: {
    w: 0,
    h: 0
  },
  toRender: [],
  player: null,
  map: null
}

const App = () => {
  const canvaRef = useRef(null)

  const gameLoop = (ctx) => {
    update()
    render(ctx)
    requestAnimationFrame( () => {gameLoop(ctx)})
  }

  const update = () => {
    AppCtx.player.update()
    AppCtx.map.update()
  }

  const render = (ctx) => {
    ctx.clearRect(0, 0, AppCtx.windowSize.w, AppCtx.windowSize.h);
    ctx.save()

    AppCtx.toRender.forEach( o => {
      o.render(ctx)
    })
    ctx.restore()
  }

  const registerObjects = () => {
    AppCtx.map = new Map()
    const solide = { 
      position: {x: 0, y: 0},
      size: {w: 150, h: 150}
    }
    AppCtx.map.registerSolideEntity(solide)
    AppCtx.map.updateBorder(AppCtx.windowSize)

    // Register 
    AppCtx.player = new Player(PersoA, 200, 200, 50, 100, AppCtx)

    AppCtx.toRender.push(AppCtx.player)
    AppCtx.toRender.push(AppCtx.map)
  }

  const registerCallbacks = () => {
    window.addEventListener('keydown', e => AppCtx.player.move(e, true));
    window.addEventListener('keyup',   e => AppCtx.player.move(e, false));
    window.addEventListener('resize', () => { 
      AppCtx.windowSize = { w: window.innerWidth, h: window.innerHeight}
      AppCtx.map.updateBorder({ w: window.innerWidth, h: window.innerHeight})

    }) 
  }

  useEffect(() => {
    const ctx = canvaRef.current.getContext("2d")
    AppCtx.windowSize = {w: window.innerWidth, h: window.innerHeight}

    registerObjects()
    registerCallbacks()
    requestAnimationFrame( () => {gameLoop(ctx)})
  }, [])

  return (<>
    <ReactNipple 
      onDir={(_, value) => AppCtx.player.moveJoystick(value)}
      onEnd={(_,__) => AppCtx.player.moveJoystick('stop')}
      options= {{ 
        zone: document.getElementById('root'),
        mode: 'dynamic' }}
    />
    <canvas ref={canvaRef} width={window.innerWidth} height={window.innerHeight} />
  </>)
}

export default App;
