import React from "react"
import PropTypes from "prop-types"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core"
import EndpointCardStats from "./EndpointCardStats"

const styles = ({ palette }) => ({
  paper: {
    width: "100%",
    maxWidth: "870px",
    padding: "16px 25px",
    marginTop: "13px",
  },

  link: {
    color: "#192B7F",
    fontSize: "14px",
    display: "block",
  },

  endpointHeader: {
    display: "flex",
    marginBottom: "40px",
  },

  name: {
    fontSize: "14px",
    fontWeight: "500",
    color: palette.primary.main,
    marginRight: "20px",
  },

})

const EndpointCard = ({ endpointInfo, classes }) => {
  const statistics = endpointInfo.statistics !== undefined ? endpointInfo.statistics : {}
  return (
    <Paper className={classes.paper}>
      <div className={classes.endpointHeader}>
        <Typography variant="h6" className={classes.name}>{ endpointInfo.name }</Typography>
        <Typography variant="body1" component="a" className={classes.link} target="_black" href={endpointInfo.url}>{ endpointInfo.url }</Typography>
      </div>

      <EndpointCardStats statistics={statistics} />
    </Paper>
  )
}

EndpointCard.propTypes = {
  classes: PropTypes.object.isRequired,
  endpointInfo: PropTypes.object,
}

EndpointCard.defaultProps = {
  endpointInfo: {},
}

export default withStyles(styles)(EndpointCard)
