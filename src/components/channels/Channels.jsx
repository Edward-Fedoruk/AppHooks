import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { compose } from "redux"
import { withRouter } from "react-router-dom"
import withNavigation from "../withNavigation"
import ChannelsList from "./ChannelsList"
import { fetchChannels } from "../../actions/channel"

export class Channels extends Component {
  static propTypes = {
    fetchChannels: PropTypes.func.isRequired,
    channels: PropTypes.object,
    result: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
  }

  static defaultProps = {
    channels: {},
  }

  componentDidMount() {
    console.log("test")
    this.props.fetchChannels(this.props.history)
  }

  render() {
    const { channels, result } = this.props
    const showChannels = result !== undefined && result.length !== 0
    console.log(showChannels, channels)
    return (
      <Fragment>
        <ChannelsList channels={channels} />
      </Fragment>
    )
  }
}

const mapStateToProps = ({ channelsEntities }) => ({
  channels: channelsEntities.entities.channels,
  result: channelsEntities.result,
})

const mapDispatchToProps = {
  fetchChannels,
}

export default compose(
  withNavigation,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Channels)
