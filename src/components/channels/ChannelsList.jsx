import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import ChannelCard from './ChannelCard'
import TopBar from '../TopBar'
import Typography from '@material-ui/core/Typography'
import CreateChannel from './CreateChannel'

const styles = () => ({
  contentWrap: {
    padding: "25px 35px"
  },

  region: {
    fontFamily: "Lato",
    marginBottom: "20px",
    color: "#192B7F",
    fontSize: "16px",
    paddingLeft: "10px"
  },
})

export class ChannelsList extends Component {
  state = {
    open: false
  }

  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  createChannel = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { classes, channels } = this.props
    const { open } = this.state
    if(open) {
      return (
        <CreateChannel />
      )
    }
    else {
      return (
        <Fragment>
          <TopBar 
            buttonText="Create New App"
            title="Your Channels Apps"
            onButtonClick={this.createChannel}
            button
          />
          <div className={classes.contentWrap}>  
            {Object.keys(channels).map((key, i, arr) => {
              let setRegion = true
              console.log(channels, Object.keys(channels), arr[i - 1], arr[i])
              if(arr[i - 1]) {
                setRegion = channels[arr[i - 1]].region !== channels[key].region
              }

              return (
                <Fragment key={i}>
                  {setRegion && 
                    <Typography className={classes.region} variant="h3">
                      {channels[key].region}
                    </Typography>}

                  <ChannelCard 
                    channelId={channels[key].id}
                    appName={channels[key].name}
                    requests={channels[key].requests || 0}
                    connections={channels[key].connections || 0}
                  />
                </Fragment>
              )
            })}       

          </div>
        </Fragment>
      )
    }
  }
}

const mapStateToProps = ({ channels }) => ({

})

const mapDispatchToProps = {
  
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(ChannelsList) 

