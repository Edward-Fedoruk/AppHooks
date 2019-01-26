import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import LogsTable from "./LogsTable"
import Placeholder from "../Placeholder"
import logs from "../../assets/logs.png"
import withNavigation from "../withNavigation"
import { compose } from "redux"
import { withStyles } from "@material-ui/core"
import TopBar from "../TopBar"

let counter = 0
function createData(date, app, endpoint, destination, status, code) {
  counter += 1
  return { id: counter, date, app, endpoint, destination, status, code }
}

const data = [
  createData("2 days ago [ 01/13/19  18:43", "My App #1", "Endpoint #1", "Destination #1", "Success", 200),
  createData("2 days ago [ 01/13/19  18:43", "My App #1", "Endpoint #1", "Destination #1", "Success", 200),
  createData("2 days ago [ 01/13/19  18:43", "My App #1", "Endpoint #1", "Destination #1", "Success", 200),
  createData("2 days ago [ 01/13/19  18:43", "My App #1", "Endpoint #1", "Destination #1", "Success", 200),
  createData("2 days ago [ 01/13/19  18:43", "My App #1", "Endpoint #1", "Destination #1", "Success", 200),
  createData("2 days ago [ 01/13/19  18:43", "My App #1", "Endpoint #1", "Destination #1", "Success", 200),
  createData("2 days ago [ 01/13/19  18:43", "My App #1", "Endpoint #1", "Destination #1", "Success", 200),
  createData("2 days ago [ 01/13/19  18:43", "My App #1", "Endpoint #1", "Destination #1", "Success", 200),
  createData("2 days ago [ 01/13/19  18:43", "My App #1", "Endpoint #1", "Destination #1", "Success", 200),
]

const styles = () => ({
  placeholder: {
    margin: "auto",
    marginTop: "170px"
  },

  contentWrap: {
    padding: "20px 26px 20px 13px"
  },
})

export class AccessLogs extends Component {
  static propTypes = {
    data: PropTypes.array,
    classes: PropTypes.object.isRequired
  }

  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <TopBar title="Request Log Viewer" />
        <div className={classes.contentWrap}>
          {data.length  
            ? <Fragment>
                <LogsTable data={data} />
              </Fragment>
            : <Placeholder 
                title="Log Viewer is empty"
                imgSrc={logs}
                className={classes.placeholder}
              />}
        </div>
      </Fragment>
    )
  }

  
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default compose(
  withNavigation,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AccessLogs)
