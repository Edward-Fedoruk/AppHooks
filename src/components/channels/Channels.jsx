import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { compose } from "redux"
import { withRouter } from "react-router-dom"
import withNavigation from "../withNavigation"
import ChannelsList from "./ChannelsList"
import { fetchChannels } from "../../actions/channel"
import { toggleCreateChannelForm } from "../../actions/ui"
import FormDrawer from "../FormDrawer"
import CreateChannel from "./CreateChannel"
import MainButton from "../utils/MainButton"
import TopBar from "../utils/TopBar"
import SuccessSnackbar from "../utils/SuccessSnackbar"
import { createLoadingSelector } from "../../actions/utils"
import Preloader from "../Preloader"

export class Channels extends Component {
  static propTypes = {
    fetchChannels: PropTypes.func.isRequired,
    channels: PropTypes.object,
    history: PropTypes.object.isRequired,
    toggleCreateChannelForm: PropTypes.func.isRequired,
    createChannelForm: PropTypes.bool.isRequired,
    successMessage: PropTypes.string,
    isLoading: PropTypes.bool,
  }

  static defaultProps = {
    channels: {},
    successMessage: "Action was successful",
    isLoading: false,
  }

  componentDidMount() {
    this.props.fetchChannels(this.props.history)
  }

  render() {
    const {
      channels, toggleCreateChannelForm, createChannelForm,
      successMessage, isLoading,
    } = this.props
    return isLoading ? <Preloader /> : (
      <Fragment>
        <TopBar title="Channels Apps">
          <MainButton onClick={toggleCreateChannelForm}>Create New App</MainButton>
        </TopBar>
        <SuccessSnackbar message={successMessage} />
        <FormDrawer open={createChannelForm} toggleDialog={toggleCreateChannelForm}>
          <CreateChannel />
        </FormDrawer>
        <ChannelsList channels={channels} />
      </Fragment>
    )
  }
}

const loadingSelector = createLoadingSelector(["FETCH_CHANNELS"])

const mapStateToProps = ({ channelsEntities, view, preloader }) => ({
  channels: channelsEntities.entities.channels,
  result: channelsEntities.result,
  createChannelForm: view.createChannelForm,
  successMessage: view.successMessage,
  isLoading: loadingSelector(preloader),
})

const mapDispatchToProps = {
  fetchChannels,
  toggleCreateChannelForm,
}

export default compose(
  withNavigation,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Channels)
