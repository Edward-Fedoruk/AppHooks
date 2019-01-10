import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import withNavigation from '../withNavigation'
import { compose } from "redux"
import CreateChannel from './CreateChannel'
import AllChannels from './AllChannels'

const styles = () => ({

})

export class Channels extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  createChannel = () => {}

  render() {
    const { classes } = this.props
    return (
      <Fragment>
        {true 
          ? <AllChannels />
          : <CreateChannel />}
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
)(Channels) 
