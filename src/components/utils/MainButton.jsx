import React from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import { withStyles } from "@material-ui/core"
import classNames from "classnames"

const styles = ({ breakpoints }) => ({
  btn: {
    textTransform: "capitalize",
    color: "#fff",
    fontSize: "16px",
    background: "#35C1CE",
    fontWeight: "400",

    "&:hover": {
      opacity: ".9",
      background: "#192B81",
    },

    [breakpoints.down(425)]: {
      fontSize: "12px",
      padding: "8px 10px",
    },
  },
})

const MainButton = (props) => {
  const {
    classes, className, children, ...rest
  } = props
  return (
    <Button
      size="large"
      color="primary"
      variant="text"
      className={classNames(classes.btn, className)}
      {...rest}
    >
      {children}
    </Button>
  )
}

MainButton.defaultProps = {
  className: "",
  children: "",
}

MainButton.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
}

export default withStyles(styles)(MainButton)
