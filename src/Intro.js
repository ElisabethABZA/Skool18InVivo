import React, { useMemo, useState } from "react"
import  {  animated,  useTransition  }  from  "react-spring";
import Container from "@material-ui/core/Container"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    width: "100%",
    fontFamily: "dialog",
    fontSize: "20px",
    color: "white"
  },
  title: {
    width: "100%",
    fontFamily: "dialog",
    fontSize: "30px",
    color: "white"
  }
}))



const Intro = ({setPlay}) => {
  const dialogue = [
    "HEY !!! De nouveaux skoolers sont la !!!!",
    "Va leur parler !!",
    "Pour te deplacer utilise les [ fleches ] de ton clavier et pour interagir avec eux la barre [ espace ].",
    "Tu utilises un telephone ? Rien de plus simple, fait [ glisser ton doigt ] et [ double tape ] pour interagir."
  ]

  const [ msgIdx, setMsgIdx ] = useState(0)

  const message = dialogue.slice(0, msgIdx+1).join(" ")

  const items = useMemo(
    () => 
      message.split("").map((letter, index) => ({
        item: letter,
        key: `${letter}${index}`
      })),
      [message]
    )

  const transitions = useTransition(items, item => item.key, {
    trail: 35,
    from: { display: "none" },
    enter: {display: ""} 
  })

  const handleClick = () => {
    if(msgIdx === 3) {
      setPlay()
    }
    setMsgIdx(msgIdx + 1 % 4)
  }


  const classes = useStyles()
  return (
    <Container component="main" maxWidth="xs">
      <h1 className={classes.title}>
        Skool Invivo 18
      </h1>
      <div className={classes.main}>
        <Grid container>
          <Grid item xs>
            <p className={classes.text}>
              {transitions.map(({ item, props, key }) => {
                return ( <animated.span key={key} style={props}>{item.item}</animated.span>)
              })
              }
            </p>
            <Button variant="contained" onClick={handleClick}>{
              msgIdx === 3? "Jouer" : "..."
            }</Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default Intro
