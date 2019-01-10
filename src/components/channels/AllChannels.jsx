import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import ChannelCard from './ChannelCard'
import TopBar from '../TopBar'

const styles = () => ({
  contentWrap: {
    padding: "25px 35px"
  }
})

export class CreateChannel extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <TopBar 
          buttonText="Create New App"
          title="Your Channels Apps"
          onButtonClick={this.createChannel}
          button
        />
        <div className={classes.contentWrap}>          
          <ChannelCard />
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(CreateChannel) 

