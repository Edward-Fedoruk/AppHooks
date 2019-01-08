import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  logIn: {
    marginTop: "34px",
    background: "linear-gradient(180deg, #35C1CE 0%, #2AA4AF 100%)",
    "&:hover": {
      opacity: ".9"
    }
  },
})

const SubmitButton = ({ classes, text }) => (
  <Button 
    fullWidth 
    variant="contained" 
    color="primary" 
    type="submit"
    className={classes.logIn}
  >
    { text }
  </Button>
)


SubmitButton.propTypes = {
  text: PropTypes.string.isRequired
}

export default withStyles(styles)(SubmitButton)
