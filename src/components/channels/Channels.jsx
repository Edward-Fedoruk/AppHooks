import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import withNavigation from '../withNavigation'
import { compose } from "redux"
import CreateChannel from './CreateChannel'
import ChannelsList from './ChannelsList'
import { fetchChannels } from '../../actions/channel'
import { withRouter } from 'react-router'

const fakeData = [
  {
    id: 5,
    name: "aedf",
    region: "Albania",
    stages: [],
    created_at: "2019-01-11 14:39:46",
    updated_at: "2019-01-11 14:39:46"
  }
]

export class Channels extends Component {
  static propTypes = {
    fetchChannels: PropTypes.func.isRequired
  }
  
  componentDidMount() {
    this.props.fetchChannels(this.props.history)
  }

  render() {
    const { channels } = this.props
    return (
      <Fragment>
        {/* channels.length !== 0  */}
        {true
          ? <ChannelsList channels={fakeData} />
          : <CreateChannel />}
      </Fragment>
    )
  }
}

const mapStateToProps = ({ channels }) => ({
  channels: channels.channels
})

const mapDispatchToProps = {
  fetchChannels
}

export default compose(
  withNavigation,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Channels) 