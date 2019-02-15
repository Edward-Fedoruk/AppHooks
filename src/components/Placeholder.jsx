import React from "react"
import { withStyles } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import classNames from "classnames"
import PropTypes from "prop-types"

const styles = ({ breakpoints }) => ({
  placeholder: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },

  subtitle: {
    color: "#3049B5",
    fontSize: "15px",

    [breakpoints.down(600)]: {
      fontSize: "10px",
    },
  },

  title: {
    color: "#5D6AA8",
    fontSize: "25px",
    fontWeight: "300",

    [breakpoints.down(600)]: {
      fontSize: "20px",
    },
  },

  textButton: {
    textDecoration: "underline",
    color: "#35C1CE",

    cursor: "pointer",
    "&:hover": {
      opacity: ".5",
    },
  },

  wrap: {
    display: "flex",
    flexWrap: "wrap",
    width: "auto",
    marginLeft: "10px",
  },
})

const Placeholder = ({
  classes, title, subtitle, button, className, imgSrc, children,
}) => (
  <div className={classNames(classes.placeholder, className)}>
    <img src={imgSrc} alt="stages" />
    <div className={classes.wrap}>
      <Typography variant="h5" className={classes.title}>{ title }</Typography>
      {subtitle
        ? (
          <Typography variant="subtitle2" className={classes.subtitle}>
            { subtitle }
            <span className={classes.textButton}>
              {" "}
              { button }
            </span>
          </Typography>
        )
        : ""}
      {children}
    </div>
  </div>
)

Placeholder.defaultProps = {
  title: "",
  subtitle: "",
  button: "",
  className: "",
  children: "",
}

Placeholder.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  button: PropTypes.string,
  className: PropTypes.string,
  imgSrc: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

export default withStyles(styles)(Placeholder)
