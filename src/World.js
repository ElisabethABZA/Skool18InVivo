import React, { useEffect, useRef, useCallback } from "react"
import ReactNipple from "react-nipple"
import "react-nipple/lib/styles.css"

import Collision from "./assets/collisions.json"
import Map from "./components/Map"
import Player from "./components/Player"
import Camera from "./components/Camera"
import Interactible from "./components/Interactible"
import InteractibleEasterEgg from "./components/InteractibleEasterEgg"
import { Skoolers, EasterEgg, PlayerImg } from "./components/Assets"

const AppCtx = {
  id: undefined,
  closing: false,
  windowSize: {
    w: 0,
    h: 0,
  },
  toRender: [],
  entities: [],
  player: null,
  map: null,
  camera: null,
  frame: 0,
}

const World = () => {
  const [, updateState] = React.useState()
  const forceUpdate = useCallback(() => updateState({}), [])
  const canvaRef = useRef(null)

  const update = () => {
    AppCtx.entities.forEach((e) => {
      e.update(AppCtx)
    })
  }

  const render = (ctx) => {
    ctx.clearRect(0, 0, AppCtx.windowSize.w, AppCtx.windowSize.h)
    ctx.save()
    AppCtx.entities.forEach((e) => {
      e.render(ctx, AppCtx)
    })
    ctx.restore()
  }

  const gameLoop = useCallback((ctx) => {
    if(AppCtx.closing) return
    AppCtx.frame = (AppCtx.frame + 1) % 60
    update()
    render(ctx)
    requestAnimationFrame(() => {
      gameLoop(ctx)
    })
  }, [])

  const registerObjects = () => {
    AppCtx.map = new Map()
    Collision.forEach( obj => {AppCtx.map.registerSolideEntity(obj)})

    // Register
    AppCtx.player = new Player(PlayerImg, 841, 1664, 70, 70, AppCtx)

    AppCtx.camera = new Camera(
      0,
      0,
      AppCtx.windowSize.w,
      AppCtx.windowSize.h,
      AppCtx.player,
      AppCtx.map
    )

    AppCtx.entities.push(AppCtx.camera)
    AppCtx.entities.push(AppCtx.map)
    Skoolers.forEach((sk) => {
      const {x, y, w, h} = sk.position
      const iA = new Interactible(x, y,w,h, AppCtx, sk)
      AppCtx.map.registerInteractible(iA)
    })
    EasterEgg.forEach(egg => {
      const {x, y, w, h} = egg.position
      const easterEgg = new InteractibleEasterEgg(x, y,w,h, AppCtx, egg)
      AppCtx.map.registerInteractible(easterEgg)
    })
    AppCtx.entities.push(AppCtx.player)
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
    ctx.webkitImageSmoothingEnabled = false
    ctx.mozImageSmoothingEnabled = false
    ctx.imageSmoothingEnabled = false
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

export default World
