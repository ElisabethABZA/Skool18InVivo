import React, { useEffect, useRef, useCallback } from "react"
import ReactNipple from "react-nipple"
import "react-nipple/lib/styles.css"
import { db } from "./services/firebase"

//import Collision from "./assets/collisions.json"
import Map from "./components/Map"
import Player from "./components/Player"
import Camera from "./components/Camera"
import Interactible from "./components/Interactible"
import Visitor from "./components/Visitors"
import { Skoolers } from "./components/Assets"

import PersoA from "./assets/player.png"
import IAImg from "./assets/interactible.png"

/**
 * TODO:
 * Remove resize event; make viewport fixed in size: 800x800 ?
 */

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

const App = () => {
  const [, updateState] = React.useState()
  const forceUpdate = useCallback(() => updateState({}), [])
  const canvaRef = useRef(null)

  const update = () => {
    AppCtx.entities.forEach((e) => {
      e.update(AppCtx)
    })
    /*
    AppCtx.camera.update()
    AppCtx.player.update()
    AppCtx.map.update()
    */
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
    //Collision.forEach( obj => {AppCtx.map.registerSolideEntity(obj)})

    // Register
    AppCtx.player = new Player(PersoA, 1107, 986, 48, 48, AppCtx)

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
    Skoolers.forEach((sk, i) => {
      const iA = new Interactible(IAImg, 1107 + i * 50, 946, 48, 48, AppCtx, sk)
      AppCtx.map.registerInteractible(iA)
      AppCtx.entities.push(iA)
    })
    AppCtx.entities.push(AppCtx.player)
  }

  const registerFirebase = async () => {
    const visitorRef = db.ref("/visitors/")
    visitorRef.on("child_changed", (data) => {
      const obj = AppCtx.map.visitors.get(data.key)
      if(obj) obj.update(data.val())
    })
    visitorRef.on("child_added", (data) => {
      if(data.key === AppCtx.id) return
      const doc = data.val()
      AppCtx.map.visitors.set(data.key, new Visitor(
        PersoA,
        doc.name,
        doc.x,
        doc.y,
        48,
        48,
        AppCtx
      ))
      console.log("player added")
    })
    visitorRef.on("child_removed", (data) => {
      AppCtx.map.visitors.delete(data.key)
    })
    /*
    db.collection('visitors').onSnapshot(qsnapshot => {
      qsnapshot.docChanges().forEach( change => {
        if(change.type === "added") {
          const doc = change.doc.data()
          if(AppCtx.id && doc.id !== AppCtx.id)
            AppCtx.map.visitors.set(doc.id, new Visitor(PersoA, doc.name, doc.x, doc.y, 48, 48, AppCtx))
        }
        if(change.type === "modified") {
          const doc = change.doc.data()
          const visitor = AppCtx.map.visitors.get(doc.id)
          if(visitor)
            visitor.update(doc)
        }
        if(change.type === "removed") {
          const doc = change.doc.data()
          AppCtx.map.visitors.delete(doc.id)
        }
      })
    
    })
    */
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
    window.addEventListener("beforeunload", (e) => {
      AppCtx.closing = true
      db.ref("/visitors/" + AppCtx.id).remove()
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
    registerFirebase()
    requestAnimationFrame(() => {
      gameLoop(ctx)
    })

    const data = {
      name: "RAndome name",
    }
    AppCtx.id = "id" + Math.floor(Math.random() * 10000)
    db.ref("/visitors/" + AppCtx.id).set(data)
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
