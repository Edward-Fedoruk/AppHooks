import React from "react"
import PropTypes from "prop-types"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import { styles } from "./RequestInfo"
import { Scrollbars } from 'react-custom-scrollbars'

const ResponseInfo = ({ classes, data }) => {
  console.log(data)
  const requestData = data.response
  return (
    <Paper className={classes.root}>
      <Scrollbars>
        <div className={classes.wrap}>
          <Typography color="primary" className={classes.title}>
            View Attempt:
          </Typography>
          <OutlinedInput 
            value={data.attempted_at}
            fullWidth
            className={classes.input}
          />
        </div>

        <div className={classes.wrap}>
          <Typography color="primary" className={classes.title}>
            Status:
          </Typography>
          <OutlinedInput 
            value={requestData.status}
            fullWidth
            className={classes.input}
          />
        </div>

        <div className={classes.wrap}>
          <Typography color="primary" className={classes.title}>
            Destination URL:
          </Typography>
          <OutlinedInput 
            value={data.destination.url}
            fullWidth
            className={classes.input}
          />
        </div>

        <div className={classes.wrap}>
          <Typography color="primary" className={classes.title}>
            Headers:
          </Typography>
          <Paper className={classes.paper} elevation={0}>
            {Object.entries(requestData.headers).map(([key, value]) => (
              <Typography color="primary" className={classes.headerName}>
                {key}: <span className={classes.key}>{value}</span>
              </Typography>
            ))}
          </Paper>
        </div>

        <div className={classes.wrap}>
          <Typography color="primary" className={classes.title}>
            Body:
          </Typography>
          <OutlinedInput 
            value={requestData.body}
            fullWidth
            className={classes.input}
            multiline
          />
        </div>
      </Scrollbars>
    </Paper>
  )
}

ResponseInfo.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ResponseInfo)
