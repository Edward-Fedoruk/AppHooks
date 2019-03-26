/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
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
import Placeholder from "../Placeholder"
import endpointImg from "../../assets/endpoints.png"
import ErrorSnackbar from "../utils/ErrorSnackbar"
import { createErrorMessageSelector } from "../../actions/utils"
import SuccessSnackbar from "../utils/SuccessSnackbar"
import ChannelsForms from "./ChannelsForms"

const styles = () => ({
  contentWrap: {
    padding: "25px 35px",
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
      classes, endpoints,
      stages, errorMessage,
      successMessage,
    } = this.props
    return (
      <Fragment>
        <StageTopBar />
        <ErrorSnackbar message={errorMessage} />
        <SuccessSnackbar message={successMessage} />

        <div className={classes.contentWrap}>

          <ChannelsForms />

          {endpoints.length
            ? <Endpoints endpoints={endpoints} />
            : stages.length ? (
              <Placeholder
                title="There is no Endpoint here yet."
                subtitle="To create new Endpoint"
                button="click here"
                imgSrc={endpointImg}
                className={classes.placeholder}
              />
            ) : null}

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
    stages,
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
