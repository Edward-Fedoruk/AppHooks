import React from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import { withStyles } from "@material-ui/core/styles"
import classNames from "classnames"

const styles = () => ({
  logIn: {
    marginTop: "16px",
    background: "#35C1CE",
    color: "#fff",
    "&:hover": {
      opacity: ".9",
      background: "#192B81",
    },
  },
})

const SubmitButton = ({
  classes, text, styles, className,
}) => (
  <Button
    fullWidth
    variant="text"
    color="primary"
    type="submit"
    size="large"
    className={classNames(classes.logIn, className)}
    style={styles}
  >
    { text }
  </Button>
)

SubmitButton.defaultProps = {
  className: {},
  styles: {},
}

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  styles: PropTypes.object,
  className: PropTypes.object,
}

export default withStyles(styles)(SubmitButton)
