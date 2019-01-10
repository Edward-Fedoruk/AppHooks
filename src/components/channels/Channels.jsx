import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import TopBar from '../TopBar'
import withNavigation from '../withNavigation'
import { compose } from "redux"

const styles = () => ({
  contentWrap: {
    padding: "25px 35px"
  }
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
        <TopBar 
          buttonText="Create New App"
          title="Your Channels Apps"
          onButtonClick={this.createChannel}
          button
        />
          <div className={classes.contentWrap}>

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
  withNavigation,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Channels) 
