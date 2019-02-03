import React from "react"
import PropTypes from "prop-types"
import { TextValidator } from "react-material-ui-form-validator"
import { withStyles } from "@material-ui/core"

const styles = () => ({
  nameField: {
    width: "100%",
    maxWidth: "1061px",
    margin: "33px auto",
    display: "flex"
  },
}) 

const FormRuleName = ({ classes, value, onChange }) => {
  return (
    <TextValidator
      className={classes.nameField}
      variant="outlined"
      label="Rule Name"
      name="name"
      value={value}
      onChange={onChange}
      placeholder="e.g., Awesome rule"
      margin="normal"
      validators={["required"]}
      errorMessages={["this field is required"]}
    />
  )
}

FormRuleName.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func
}

export default withStyles(styles)(FormRuleName)
