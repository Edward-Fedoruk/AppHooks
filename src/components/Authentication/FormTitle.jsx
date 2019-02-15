import React from "react"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import PropTypes from "prop-types"

const styles = () => ({
  formTitleWrap: {
    position: "relative",
    marginBottom: "15px",
  },

  formTitle: {
    textTransform: "uppercase",
    color: "#8E8F93",
    position: "absolute",
    fontSize: "14px",
    fontWeight: "500",
    backgroundColor: "#fff",
    padding: "0 20px",
    top: "50%",
    right: "50%",
    transform: "translate(50%, -50%)",
    textAlign: "center",
    width: "100%",
  },
})

const FormTitle = ({ classes, text }) => (
  <div className={classes.formTitleWrap}>
    <Typography className={classes.formTitle}>{ text }</Typography>
  </div>
)

FormTitle.propTypes = {
  text: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FormTitle)
