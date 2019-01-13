import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core'

const styles = () => ({
  paper: {
    width: "100%",
    height: "140px",
    padding: "16px 22px",
    marginBottom: "20px"
  },

  stageName: {
    fontSize: "14px",
    fontFamily: "Lato",
    color: "#192B7F",
    fontWeight: "bold"
  }
})

const Stage = ({ stageName, classes }) => {
  return (
    <Paper className={classes.paper} elevation={1} >
      <Typography className={classes.stageName}>test</Typography> 
    </Paper>
  )
}

Stage.propTypes = {
  stageName: PropTypes.string.isRequired
}

export default withStyles(styles)(Stage)
