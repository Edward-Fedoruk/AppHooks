import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  logIn: {
    marginTop: "34px",
    background: "#35C1CE",
    "&:hover": {
      opacity: ".9",
      // background: "#35C1CE",
    }
  },
})

const SubmitButton = ({ classes, text, styles }) => (
  <Button 
    fullWidth 
    variant="contained" 
    color="primary" 
    type="submit"
    className={classes.logIn}
    style={styles}
  >
    { text }
  </Button>
)


SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  styles: PropTypes.object
}

export default withStyles(styles)(SubmitButton)
