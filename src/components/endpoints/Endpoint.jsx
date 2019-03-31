/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core"
import { withRouter } from "react-router-dom"
import { compose } from "redux"
import withNavigation from "../withNavigation"
// import Placeholder from "../Placeholder"
import ErrorSnackbar from "../utils/ErrorSnackbar"
import { createErrorMessageSelector } from "../../actions/utils"
import { fetchEndpoint } from "../../actions/endpoint"
import SuccessSnackbar from "../utils/SuccessSnackbar"
import EndpointTopBar from "./EndpointTopBar"
import CreateDestination from "../destinations/CreateDestination"
import Destinations from "../destinations/Destinations"
import EditDestination from "../destinations/EditDestination"
import EndpointChartCard from "../statistics/EndpointChartCard"

const styles = ({ breakpoints }) => ({
  contentWrap: {
    padding: "25px 35px",

    [breakpoints.down(768)]: { padding: "25px 0" },
  },

  placeholder: {
    margin: "100px auto 0 auto",
    width: "550px",
  },
})

export class Endpoint extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    fetchEndpoint: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    errorMessage: PropTypes.string.isRequired,
    successMessage: PropTypes.string,
  }

  static defaultProps = {
    successMessage: "action was successful",
  }

  componentDidMount() {
    const { match: { params }, fetchEndpoint } = this.props
    fetchEndpoint(params.channelId, params.stageId, params.endpointId)
  }

  render() {
    const {
      classes,
      errorMessage,
      successMessage,
    } = this.props
    return (
      <Fragment>
        <EndpointTopBar />

        <CreateDestination />
        <EditDestination />

        <ErrorSnackbar message={errorMessage} />
        <SuccessSnackbar message={successMessage} />

        <div className={classes.contentWrap}>
          <EndpointChartCard />
          <Destinations />
        </div>
      </Fragment>
    )
  }
}

const errorSelector = createErrorMessageSelector([
  "FETCH_ENDPOINT",
  "CREATE_DESTINATION",
  "FETCH_DESTINATIONS",
  "DELETE_DESTINATION",
])

const mapStateToProps = ({
  errorHandler, view,
}) => ({
  successMessage: view.successMessage,
  errorMessage: errorSelector(errorHandler),
})

const mapDispatchToProps = dispatch => ({
  fetchEndpoint: (channelId, stageId, endpointId) => dispatch(fetchEndpoint(channelId, stageId, endpointId)),
})

export default compose(
  withNavigation,
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Endpoint)
