import React from "react"
import PropTypes from "prop-types"
import Fade from "@material-ui/core/Fade"
import { withStyles } from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress"

const styles = () => ({
  root: {
    width: "100%",
    height: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F8FB",
  },
})

const Preloader = ({ loading, classes }) => (
  <Fade
    in={loading}
    unmountOnExit
  >
    <div className={classes.root}>

      <CircularProgress />
    </div>
  </Fade>
)

Preloader.defaultProps = {
  loading: true,

}

Preloader.propTypes = {
  loading: PropTypes.bool,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Preloader)
