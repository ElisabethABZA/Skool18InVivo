import React, { useEffect, useRef, useCallback } from "react"
import ReactNipple from "react-nipple"
import "react-nipple/lib/styles.css"

import Map from "./components/Map"
import Player from "./components/Player"
import Camera from "./components/Camera"

import PersoA from "./assets/player.png"

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
      o.render(ctx, AppCtx.camera)
    })
    ctx.restore()
  }

  const gameLoop = useCallback((ctx) => {
    update()
    render(ctx)
    requestAnimationFrame(() => {
      gameLoop(ctx)
    })
  }, [])

  const registerObjects = () => {
    AppCtx.map = new Map()
    const solide = {
      position: { x: 0, y: 0 },
      size: { w: 150, h: 150 },
    }
    AppCtx.map.registerSolideEntity(solide)

    // Register
    AppCtx.player = new Player(
      PersoA,
      AppCtx.windowSize.w / 2,
      AppCtx.windowSize.h / 2,
      50,
      100,
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
    AppCtx.windowSize = { w: window.innerWidth, h: window.innerHeight }

    registerObjects()
    registerCallbacks()
    requestAnimationFrame(() => {
      gameLoop(ctx)
    })
  }, [gameLoop, registerCallbacks])

  return (
    <>
      <ReactNipple
        onDir={(_, value) => AppCtx.player.moveJoystick(value)}
        onEnd={(_, __) => AppCtx.player.moveJoystick("stop")}
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
