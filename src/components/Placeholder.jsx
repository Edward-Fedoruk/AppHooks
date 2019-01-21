import React from 'react'
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'

const styles = () => ({
  placeholder: {
    width: "500px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
  },

  subtitle: {
    color: "#3049B5",
    fontFamily: "Lato",
    fontSize: "15px", 
  },

  title: {
    color: "#5D6AA8",
    fontFamily: "Lato",
    fontSize: "25px",
    fontWeight: "300"
  },

  textButton: {
    textDecoration: "underline",
    color: "#35C1CE",
    fontFamily: "Lato",
    cursor: "pointer",
    "&:hover": {
      opacity: ".5"
    }
  },

  wrap: {
    display: "flex",
    flexWrap: "wrap",
    width: "65%",
    marginLeft: "10px"
  }
})

const Placeholder = ({ classes, title, subtitle, button, className, imgSrc }) => {
  return (
    <div className={classNames(classes.placeholder, className)}>
      <img src={imgSrc} alt="stages"/>
      <div className={classes.wrap}>
        <Typography variant="h5" className={classes.title}>{ title }</Typography>
        <Typography variant="subtitle2" className={classes.subtitle}>{ subtitle }<span className={classes.textButton}> { button }</span></Typography>
      </div>
    </div>
  )
}

export default withStyles(styles)(Placeholder)
