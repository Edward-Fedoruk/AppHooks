import React from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = () => ({
  formTitleWrap: {
    position: "relative",
  },

  line: {
    width: "100%",
    height: "1px",
    backgroundColor: "#DADADA"
  },

  formTitle: {
    textTransform: "uppercase",
    color: "#8E8F93",
    position: "absolute",
    fontSize: "14px",
    backgroundColor: "#fff",
    padding: "0 20px",
    top: "50%",
    right: "50%",
    transform: "translate(50%, -50%)",
    textAlign: "center",
    width: "max-content"
  },
})

const FormTitle = ({ classes, text }) => (
  <div className={classes.formTitleWrap}>
    <div className={classes.line}></div>
    <Typography variant="title" className={classes.formTitle}>{ text }</Typography>
  </div>
)

FormTitle.propTypes = {
  text: PropTypes.string.isRequired
}

export default withStyles(styles)(FormTitle)
