import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import ChannelCard from './ChannelCard'
import TopBar from '../TopBar'
import Typography from '@material-ui/core/Typography'
import CreateChannel from './CreateChannel'
import Button from '@material-ui/core/Button'

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

  createChannel: {
    textTransform: "capitalize",
    color: "#fff",
    fontSize: "16px",
    background: "#35C1CE",
    "&:hover": {
      opacity: ".9",
      background: "#192B81",
    },
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
          <TopBar title="Your Channels Apps">
            <Button 
              size="large"
              color="primary" 
              variant="text" 
              className={classes.createChannel}
              onClick={this.createChannel}
            >
              Create New App
            </Button>
          </TopBar>

          <div className={classes.contentWrap}>  
            {Object.keys(channels).map((key, i, arr) => {
              let setRegion = true
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

