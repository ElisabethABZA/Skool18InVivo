import React, { useState } from "react"
import World from "./World"
import Intro from "./Intro"
import "./components/Assets"



const App = () => {
  const [ playing, setPlaying ] = useState(false)

  const callback = () => {
    console.log("callback")
    setPlaying(true)
  }
  
  if(playing)
    return <World />
  return <Intro setPlay={callback} />
}

export default App