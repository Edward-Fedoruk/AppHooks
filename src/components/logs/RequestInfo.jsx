import React from "react"
import PropTypes from "prop-types"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import { Scrollbars } from 'react-custom-scrollbars'

export const styles = ({ breakpoints }) => ({
  root: {
    padding: "14px 5px 16px 0px",
    height: "calc(100vh - 95px)",
    overflow: "auto"
  },

  wrap: {
    display: "flex",
    marginBottom: "14px",

    [breakpoints.down(768)]: {
      flexDirection: "column"
    },
  },

  title: {
    width: "200px",
    minWidth: "200px",
    maxWidth: "200px",
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "right",
    paddingRight: "14px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-end",

    [breakpoints.down(768)]: {
      width: "100%",
      justifyContent: "flex-start",
    },
  },

  headerName: {
    fontSize: "16px",
    marginBottom: "17px",
    fontWeight: "bold",
  },

  key: {
    fontWeight: "400",
    wordWrap: "break-word",
    
  },

  input: {
    height: "42px",
    width: "76%"
  },

  paper: {
    width: "76%",
    padding: "21px 16px 0px 16px",
    border: "1px solid #E2E5F4",
    
  }

})

const RequestInfo = ({ classes, data }) => {
  const requestData = data !== undefined ? data : {headers: {}}
  return (
    <Paper className={classes.root}>
      <Scrollbars>
      <div className="test">
      <div className={classes.wrap}>
        <Typography color="primary" className={classes.title}>
          Incoming Gateway:
        </Typography>
        <OutlinedInput 
          value={requestData.url}
          fullWidth
          className={classes.input}
        />
      </div>

      <div className={classes.wrap}>
        <Typography color="primary" className={classes.title}>
          Method:
        </Typography>
        <OutlinedInput 
          value={requestData.method}
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
      </div>
    </Scrollbars>
    </Paper>
  )
}

RequestInfo.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(RequestInfo)