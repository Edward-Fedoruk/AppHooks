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
import { fetchRequests } from "../../actions/requestLogs"


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

  componentDidMount() {
    this.props.fetchRequests()
  }

  render() {
    const { classes, data } = this.props
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

const mapStateToProps = ({ requestLogs }) => ({
  data: requestLogs.requests 
})

const mapDispatchToProps = {
  fetchRequests
}

export default compose(
  withNavigation,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AccessLogs)
