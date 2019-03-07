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

export class Channels extends Component {
  static propTypes = {
    fetchChannels: PropTypes.func.isRequired,
    channels: PropTypes.object,
    result: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    toggleCreateChannelForm: PropTypes.func.isRequired,
    createChannelForm: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    channels: {},
  }

  componentDidMount() {
    this.props.fetchChannels(this.props.history)
  }

  render() {
    const {
      channels, result, toggleCreateChannelForm, createChannelForm,
    } = this.props
    const showChannels = result !== undefined && result.length !== 0
    console.log(showChannels, channels)
    return (
      <Fragment>
        <TopBar title="Channels Apps">
          <MainButton onClick={toggleCreateChannelForm}>Create New App</MainButton>
        </TopBar>

        <FormDrawer open={createChannelForm} toggleDialog={toggleCreateChannelForm}>
          <CreateChannel />
        </FormDrawer>
        <ChannelsList channels={channels} />
      </Fragment>
    )
  }
}

const mapStateToProps = ({ channelsEntities, view }) => ({
  channels: channelsEntities.entities.channels,
  result: channelsEntities.result,
  createChannelForm: view.createChannelForm,
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
