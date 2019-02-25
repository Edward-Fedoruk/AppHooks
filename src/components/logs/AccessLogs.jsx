import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { compose } from "redux"
import { withStyles } from "@material-ui/core"
import LogsTable from "./LogsTable"
import Placeholder from "../Placeholder"
import logs from "../../assets/logs.png"
import withNavigation from "../withNavigation"
import TopBar from "../utils/TopBar"
import { fetchRequests } from "../../actions/requestLogs"
import Preloader from "../Preloader"
import { createLoadingSelector, createErrorMessageSelector } from "../../actions/utils"
import ErrorSnackbar from "../utils/ErrorSnackbar"
import SuccessSnackbar from "../utils/SuccessSnackbar"
import withPlanPanel from "../withPlanPanel"

const styles = ({ breakpoints }) => ({
  contentWrap: {
    padding: "20px 26px 80px 20px",
    overflowX: "hidden",

    [breakpoints.down(768)]: {
      padding: "20px 15px 5px 15px",
    },
    [breakpoints.down(600)]: {
      padding: "10px 0px 5px 0px",
    },
  },
})

export class AccessLogs extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    fetchRequests: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    successMessage: PropTypes.string,
    errorMessage: PropTypes.string,
    showLogs: PropTypes.number.isRequired,
  }

  static defaultProps = {
    successMessage: "Action was successful",
    errorMessage: "Something went wrong in logs",
  }

  componentDidMount() {
    this.props.fetchRequests()
  }

  render() {
    const {
      classes, data, isLoading, showLogs,
      errorMessage, successMessage,
    } = this.props
    return isLoading ? <Preloader /> : (
      <Fragment>
        <ErrorSnackbar message={errorMessage} />
        <SuccessSnackbar message={successMessage} />
        <TopBar title="Request Log Viewer" />
        <div className={classes.contentWrap}>
          {showLogs
            ? (
              <Fragment>
                <LogsTable data={data} />
              </Fragment>
            )
            : (
              <Placeholder
                title="Log Viewer is empty"
                imgSrc={logs}
              />
            )}
        </div>
      </Fragment>
    )
  }
}

const loadingSelector = createLoadingSelector(["SET_LOGS"])
const errorSelector = createErrorMessageSelector(["SET_LOGS"])

const mapStateToProps = ({
  requestLogs, preloader, errorHandler, view,
}) => ({
  showLogs: requestLogs.requests.length,
  searchText: requestLogs.searchText,
  data: requestLogs.requests.filter(request => request.application.name.includes(requestLogs.searchText)),
  isLoading: loadingSelector(preloader),
  errorMessage: errorSelector(errorHandler),
  successMessage: view.successMessage,
})

const mapDispatchToProps = {
  fetchRequests,
}

export default compose(
  withNavigation,
  withPlanPanel,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AccessLogs)
