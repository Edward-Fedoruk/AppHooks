import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import Create from "@material-ui/icons/CreateOutlined"

const styles = ({ breakpoints }) => ({
  header: {
    fontSize: "18px",
    fontWeight: "500",
    marginRight: "5px",

    [breakpoints.down(425)]: {
      paddingLeft: "24px",
    },
  },

  headerWrap: {
    display: "flex",
    alignItems: "center",
  },
})

const FormTitle = ({ classes, children, toggleForm }) => (
  <div className={classes.headerWrap}>
    <Typography className={classes.header} variant="h2" color="primary">
      { children }
    </Typography>
    <IconButton onClick={toggleForm}>
      <Create />
    </IconButton>
  </div>
)


FormTitle.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.string.isRequired,
  toggleForm: PropTypes.func.isRequired,
}

export default withStyles(styles)(FormTitle)
