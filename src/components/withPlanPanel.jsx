/* eslint-disable react/jsx-one-expression-per-line */
import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core"
import { connect } from "react-redux"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom"
import withWidth from "@material-ui/core/withWidth"

const mapStateToProps = ({ userSettings }) => ({
  userPackage: userSettings.settings.package,
})

const mapDispatchToProps = {

}

const styles = ({ palette, breakpoints }) => ({
  panel: {
    background: "#fff",
    display: "flex",
    height: "60px",
    position: "fixed",
    bottom: "0",
    right: "0",

    minWidth: "calc(100% - 250px)",
    maxWidth: "calc(100% - 270px)",
    marginLeft: "auto",
    width: "77vw",

    [breakpoints.down(960)]: {
      width: "100%",
      marginLeft: "55px",
      minWidth: "unset",
      maxWidth: "unset",
    },
    [breakpoints.down(600)]: {
      width: "100%",
      marginLeft: "0",
      paddingBottom: "60px",
    },
  },

  planCircle: {
    border: "1px solid #D7DEF1",
    borderRadius: "50%",
    width: "50px",
    display: "flex",
    margin: "5px",
    marginLeft: "24px",
    height: "50px",
    justifyContent: "center",
    alignItems: "center",
  },

  caption: {
    color: palette.primary.dark,
    fontSize: "11px",
    textAlign: "center",
  },

  planInfo: {
    display: "flex",
    flexDirection: "column",
    height: "60px",
    justifyContent: "center",
    marginLeft: "10px",
  },

  planInfoText: {
    fontSize: "11px",
    fontWeight: "500",
    color: palette.primary.dark,
  },

  upgradeButton: {
    color: palette.secondary.main,
    textTransform: "capitalize",
    height: "30px",
    alignSelf: "center",
    display: "flex",
    marginLeft: "auto",
    marginRight: "30px",
    borderColor: palette.secondary.main,
  },

  highlight: { fontWeight: "600" },
  blue: { color: "#00A1F1" },
})

const hocComponentName = (WrappedComponent) => {
  const hocComponent = ({
    width, userPackage, classes, ...props
  }) => {
    const isMobile = width === "xs"
    return isMobile ? (
      <WrappedComponent {...props} />
    ) : (
      <Fragment>
        <WrappedComponent {...props} />
        <div className={classes.panel}>
          <div className={classes.planCircle}>
            <Typography variant="caption" className={classes.caption}>{userPackage}</Typography>
          </div>
          <div className={classes.planInfo}>
            <Typography className={classes.planInfoText}>Your Channels plan | <span className={classes.blue}>{userPackage}</span></Typography>
            <Typography className={classes.planInfoText}>includes ,<span>100 connections</span> and <span>200,000 messages per day</span></Typography>
          </div>
          <Button variant="outlined" size="medium" className={classes.upgradeButton} component={Link} to="/billing">Upgrade now</Button>
        </div>
      </Fragment>
    )
  }

  hocComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    userPackage: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
  }

  return withWidth()(withStyles(styles)(hocComponent))
}


export default WrapperComponent => connect(mapStateToProps, mapDispatchToProps)(hocComponentName(WrapperComponent))
