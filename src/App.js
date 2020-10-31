import React, { useEffect, useRef, useCallback } from "react"
import ReactNipple from "react-nipple"
import "react-nipple/lib/styles.css"

//import Collision from "./assets/collisions.json"
import Map from "./components/Map"
import Player from "./components/Player"
import Camera from "./components/Camera"
import Interactible from './components/Interactible'

import PersoA from "./assets/player.png"
import IAImg from "./assets/interactible.png"

/**
 * TODO:
 * Remove resize event; make viewport fixed in size: 800x800 ?
 */

const AppCtx = {
  windowSize: {
    w: 0,
    h: 0,
  },
  toRender: [],
  player: null,
  map: null,
  camera: null,
  frame: 0
}

const App = () => {
  const [, updateState] = React.useState()
  const forceUpdate = useCallback(() => updateState({}), [])
  const canvaRef = useRef(null)

  const update = () => {
    AppCtx.camera.update()
    AppCtx.player.update()
    AppCtx.map.update()
  }

  const render = (ctx) => {
    ctx.clearRect(0, 0, AppCtx.windowSize.w, AppCtx.windowSize.h)
    ctx.save()
    AppCtx.toRender.forEach((o) => {
      o.render(ctx, AppCtx.camera, AppCtx)
    })
    ctx.restore()
  }

  const gameLoop = useCallback((ctx) => {
    AppCtx.frame = (AppCtx.frame + 1) % 60
    update()
    render(ctx)
    requestAnimationFrame(() => {
      gameLoop(ctx)
    })
  }, [])

  const registerInteractible = () => {
    const iA = new Interactible(IAImg, 1107, 946, 48, 48)
    AppCtx.map.registerInteractible(iA)
  }

  const registerObjects = () => {
    AppCtx.map = new Map()
    //Collision.forEach( obj => {AppCtx.map.registerSolideEntity(obj)})

    // Register
    AppCtx.player = new Player(
      PersoA,
      839,
      1663,
      48,
      48,
      AppCtx
    )
    AppCtx.camera = new Camera(
      0,
      0,
      AppCtx.windowSize.w,
      AppCtx.windowSize.h,
      AppCtx.player,
      AppCtx.map
    )

    AppCtx.toRender.push(AppCtx.camera)
    AppCtx.toRender.push(AppCtx.map)
    AppCtx.toRender.push(AppCtx.player)
  }

  const registerCallbacks = useCallback(() => {
    window.addEventListener("keydown", (e) => AppCtx.player.move(e, true))
    window.addEventListener("keyup", (e) => AppCtx.player.move(e, false))
    window.addEventListener("resize", () => {
      AppCtx.windowSize = { w: window.innerWidth, h: window.innerHeight }
      AppCtx.camera.updateViewPort(
        0,
        0,
        AppCtx.windowSize.w,
        AppCtx.windowSize.h
      )
      forceUpdate()
    })
  }, [forceUpdate])

  useEffect(() => {
    const ctx = canvaRef.current.getContext("2d")
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    AppCtx.windowSize = { w: window.innerWidth, h: window.innerHeight }

    registerObjects()
    registerInteractible()
    registerCallbacks()
    requestAnimationFrame(() => {
      gameLoop(ctx)
    })
  }, [gameLoop, registerCallbacks])

  return (
    <>
      <ReactNipple
        onStart={(_, value) => AppCtx.player.joystickEvent("start")}
        onDir={(_, value) => AppCtx.player.joystickEvent(value)}
        onEnd={(_, __) => AppCtx.player.joystickEvent("stop")}
        options={{
          zone: document.getElementById("root"),
          mode: "dynamic",
        }}
      />
      <canvas
        ref={canvaRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </>
  )
}

export default App
