import React from "react"
import withWidth from "@material-ui/core/withWidth"
import { withStyles } from "@material-ui/core"
import PropTypes from "prop-types"
import { ReactComponent as Logo } from "../../assets/Logo.svg"
import { ReactComponent as LogoIcon } from "../../assets/BlueLogoIcon.svg"

const styles = ({ breakpoints }) => ({
  formWrap: {
    background: "linear-gradient(180deg, #192B81 0%, #344DBC 100%)",
    height: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    position: "relative",

    [breakpoints.down(500)]: {
      alignItems: "flex-end",
      background: "#fff",
    },
    [breakpoints.down(800)]: {
    },
  },

  pageLogo: {
    position: "absolute",
    top: "10px",
    left: "51px",
    width: "182px",
    height: "62px",

    [breakpoints.down(900)]: {
      left: "10px",
    },
    [breakpoints.down(800)]: {
      display: "none",
    },
    [breakpoints.down(500)]: {
      display: "block",
      left: "50%",
      transform: "translateX(-50%)",
      top: "3px",
    },
  },
})

const withBackground = (Component) => {
  const HOC = ({ width, classes }) => (
    <div className={classes.formWrap}>
      {width === "xs"
        ? <LogoIcon className={classes.pageLogo} />
        : <Logo className={classes.pageLogo} />}

      <Component />

    </div>
  )

  HOC.propTypes = {
    width: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
  }

  return withWidth()(withStyles(styles)(HOC))
}

export default withBackground
