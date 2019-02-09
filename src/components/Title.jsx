import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

const styles = ({ breakpoints }) => ({
  title: {
    flexGrow: 1,
    fontSize: "25px",
    textTransform: "capitalize",
    color: "#192B7F",
    fontWeight: "bold",

    [breakpoints.down(425)]: {
      fontSize: "18px"
    },
  },  
})

const Title = ({ classes, styles, children }) => (
  <Typography 
    variant="h2" 
    color="primary" 
    className={classes.title}
    style={styles}
  >
    { children }
  </Typography>
)

Title.propTypes = {
  classes: PropTypes.object.isRequired,
  styles: PropTypes.object,
}

export default withStyles(styles)(Title)
