import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"

const styles = () => ({
  textWrap: {
    margin: "auto",
    maxWidth: "1061px",
  },

  header: {
    color: "#5A5B5F",
    fontSize: "25px",
    fontWeight: "500",
  },

  subHead: {
    color: "#5A5B5F",
    fontSize: "16px",
    fontWeight: "normal",
  },
})

const FormHeader = ({ classes, header, subHeader }) => (
  <div className={classes.textWrap}>
    <Typography className={classes.header} variant="h1">
      {header}
    </Typography>
    <Typography className={classes.subHead} variant="subtitle1">
      {subHeader}
    </Typography>
  </div>
)

FormHeader.defaultProps = {
  header: "",
  subHeader: "",
}

FormHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  header: PropTypes.string,
  subHeader: PropTypes.string,
}

export default withStyles(styles)(FormHeader)
