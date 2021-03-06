/* eslint-disable react/jsx-one-expression-per-line */
import React from "react"
import PropTypes from "prop-types"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import { Scrollbars } from "react-custom-scrollbars"
import { styles } from "./RequestInfo"

const ResponseInfo = ({ classes, data }) => {
  const requestData = data.response === undefined ? {} : data.response
  const headers = Object.entries(requestData.headers === undefined ? {} : requestData.headers)
  return (
    <Paper className={classes.root}>
      <Scrollbars>
        <div className={classes.wrap}>
          <Typography color="primary" className={classes.title}>View Attempt:</Typography>
          <OutlinedInput value={data.attempted_at} fullWidth className={classes.input} />
        </div>

        <div className={classes.wrap}>
          <Typography color="primary" className={classes.title}>Status:</Typography>
          <OutlinedInput value={requestData.status} fullWidth className={classes.input} />
        </div>

        <div className={classes.wrap}>
          <Typography color="primary" className={classes.title}>Destination URL:</Typography>
          <OutlinedInput value={data.destination === undefined ? "" : data.destination.url} fullWidth className={classes.input} />
        </div>

        <div className={classes.wrap}>
          <Typography color="primary" className={classes.title}>Headers:</Typography>
          <Paper className={classes.paper} elevation={0}>
            {headers.map(([key, value]) => (
              <Typography key={key} color="primary" className={classes.headerName}>
                {key}: <span className={classes.key}>{value}</span>
              </Typography>
            ))}
          </Paper>
        </div>

        <div className={classes.wrap}>
          <Typography color="primary" className={classes.title}>Body:</Typography>
          <OutlinedInput value={requestData.body} fullWidth className={classes.input} multiline />
        </div>
      </Scrollbars>
    </Paper>
  )
}

ResponseInfo.defaultProps = {
  data: {}
}

ResponseInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
}

export default withStyles(styles)(ResponseInfo)
