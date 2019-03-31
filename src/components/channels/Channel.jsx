import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core"
import { withRouter } from "react-router-dom"
import { compose } from "redux"
import withNavigation from "../withNavigation"
import { fetchChannel } from "../../actions/channel"
import StageTopBar from "../stages/StageTopBar"
import Endpoints from "../endpoints/Endpoints"
import ErrorSnackbar from "../utils/ErrorSnackbar"
import { createErrorMessageSelector } from "../../actions/utils"
import SuccessSnackbar from "../utils/SuccessSnackbar"
import ChannelsForms from "./ChannelsForms"
import ChannelChartCard from "../statistics/ChannelChartCard"

const styles = ({ breakpoints }) => ({
  contentWrap: { 
    padding: "25px 35px",

    [breakpoints.down(768)]: { padding: "25px 0px" },
  },

  placeholder: {
    margin: "100px auto 0 auto",
    width: "550px",
  },
})

export class Channel extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    endpoints: PropTypes.array,
    stages: PropTypes.array,
    fetchChannel: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    errorMessage: PropTypes.string.isRequired,
    successMessage: PropTypes.string,
  }

  static defaultProps = {
    endpoints: [],
    stages: [],
    successMessage: "Action in channel was successful",
  }

  componentDidMount() {
    const { match, fetchChannel } = this.props
    fetchChannel(match.params.channelId)
  }

  render() {
    const {
      classes, 
      endpoints,
      errorMessage,
      successMessage,
    } = this.props
    return (
      <Fragment>
        <StageTopBar />
        <ErrorSnackbar message={errorMessage} />
        <SuccessSnackbar message={successMessage} />
        <ChannelsForms />

        <div className={classes.contentWrap}>
          {endpoints.length && <ChannelChartCard />}
          <Endpoints endpoints={endpoints} />
        </div>
      </Fragment>
    )
  }
}

const errorSelector = createErrorMessageSelector([
  "EDIT_STAGE_NAME",
  "CREATE_STAGE",
  "REMOVE_STAGE",
  "CREATE_ENDPOINT",
])

const mapStateToProps = ({
  errorHandler, channels, channelsEntities: { entities }, view,
}, { match }) => {
  const stages = channels.currentChannel.stageIds.map(id => entities.stages[id])
  const currentStage = stages.find(stage => `${stage.id}` === `${match.params.stageId}`)
  let endpoints = []
  if (currentStage !== undefined) endpoints = currentStage.endpoints.map(id => entities.endpoints[id])

  return {
    endpoints,
    errorMessage: errorSelector(errorHandler),
    successMessage: view.successMessage,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchChannel: id => dispatch(fetchChannel(id)),
})

export default compose(
  withNavigation,
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Channel)
