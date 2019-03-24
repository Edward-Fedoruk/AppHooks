import React from "react"
import PropTypes from "prop-types"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core"
import { compose } from "redux"
import CardStats from "../CardStats"
// import DestinationCardMenu from "./DestinationCardMenu"

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
  },

})

const DestinationCard = ({ destInfo, classes }) => {
  const statistics = destInfo.statistics !== undefined ? destInfo.statistics : {}
  return (
    <Paper className={classes.paper}>
      <div className={classes.endpointHeader}>
        <Typography variant="h6" className={classes.name}>{ destInfo.name }</Typography>
        <Typography variant="body1" component="a" className={classes.link} target="_black" href={destInfo.url}>{ destInfo.url }</Typography>
        {/* <DestinationCardMenu destInfo={destInfo} /> */}
      </div>

      <CardStats statistics={statistics} />
    </Paper>
  )
}

DestinationCard.propTypes = {
  classes: PropTypes.object.isRequired,
  destInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    application_id: PropTypes.number.isRequired,
    application_stage_id: PropTypes.number.isRequired,
  }),
}

DestinationCard.defaultProps = {
  destInfo: {},
}

export default compose(
  withStyles(styles),
)(DestinationCard)
