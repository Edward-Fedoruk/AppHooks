import React, { Fragment } from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"

const styles = ({ palette }) => ({
  title: {
    fontWeight: "500",
    fontSize: "25px",
    color: palette.primary.main,
    marginBottom: "25px",
  },

  p: {
    fontSize: "16px",
    color: palette.primary.main,
  },
})

const FormTitle = ({
  classes, titleStyle, pStyle, title, paragraph,
}) => (
  <Fragment>
    <Typography
      className={classes.title}
      variant="h3"
      align="left"
      style={titleStyle}
    >
      {title}
    </Typography>

    <Typography
      className={classes.p}
      align="left"
      style={pStyle}
    >
      { paragraph }
    </Typography>
  </Fragment>
)

FormTitle.defaultProps = {
  titleStyle: {},
  pStyle: {},
}

FormTitle.propTypes = {
  classes: PropTypes.object.isRequired,
  titleStyle: PropTypes.object,
  pStyle: PropTypes.object,
  title: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
}

export default withStyles(styles)(FormTitle)
