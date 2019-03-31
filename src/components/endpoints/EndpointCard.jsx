import React from "react"
import PropTypes from "prop-types"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core"
import { Link } from "react-router-dom"
import { compose } from "redux"
import CardStats from "../statistics/CardStats"
import EndpointCardMenu from "./EndpointCardMenu"

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
    maxWidth: "70%",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },

  endpointHeader: {
    display: "flex",
    marginBottom: "40px",
    alignItems: "center",
  },

  name: {
    fontSize: "14px",
    fontWeight: "500",
    color: palette.primary.main,
    marginRight: "20px",
    cursor: "pointer",
    maxWidth: "20%",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },

})

const EndpointCard = ({ endpointInfo, classes }) => {
  const statistics = endpointInfo.statistics !== undefined ? endpointInfo.statistics : {}
  const pathToEndpoint = `/channels/${endpointInfo.application_id}/${endpointInfo.application_stage_id}/${endpointInfo.id}`
  return (
    <Paper className={classes.paper}>
      <div className={classes.endpointHeader}>
        <Typography component={Link} to={pathToEndpoint} variant="h6" className={classes.name}>{ endpointInfo.name }</Typography>
        <Typography variant="body1" component="a" className={classes.link} target="_black" href={endpointInfo.url}>{ endpointInfo.url }</Typography>
        <EndpointCardMenu endpointInfo={endpointInfo} />
      </div>

      <CardStats statistics={statistics} />
    </Paper>
  )
}

EndpointCard.propTypes = {
  classes: PropTypes.object.isRequired,
  endpointInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    application_id: PropTypes.number.isRequired,
    application_stage_id: PropTypes.number.isRequired,
  }),
}

EndpointCard.defaultProps = {
  endpointInfo: {},
}

export default compose(
  withStyles(styles),
)(EndpointCard)
