import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import ChannelCard from './ChannelCard'
import TopBar from '../TopBar'
import Typography from '@material-ui/core/Typography'

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
  }
})

export class ChannelsList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  render() {
    const { classes, channels } = this.props
    return (
      <Fragment>
        <TopBar 
          buttonText="Create New App"
          title="Your Channels Apps"
          onButtonClick={this.createChannel}
          button
        />
        <div className={classes.contentWrap}>  
          {channels.map((channel, i, arr) => {
            let setRegion = true
            if(arr[i - 1]) {
              setRegion = arr[i - 1].name !== channel.name
            }
            
            return (
              <Fragment key={channel.id}>
                {setRegion && 
                  <Typography className={classes.region} variant="h3">
                    {channel.region}
                  </Typography>}

                <ChannelCard 
                  id={channel.id}
                  appName={channel.name}
                  requests={channels.requests || 0}
                  connections={channels.connections || 0}
                />
              </Fragment>
            )
          })}       

        </div>
      </Fragment>
    )
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

