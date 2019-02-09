import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core/styles"
import { compose } from "redux"
import Typography from "@material-ui/core/Typography"
import ChannelCard from "./ChannelCard"
import TopBar from "../TopBar"
import CreateChannel from "./CreateChannel"
import MainButton from "../MainButton"

const styles = ({ breakpoints }) => ({
  contentWrap: {
    padding: "25px 35px",

    [breakpoints.down(425)]: {
      padding: "25px 17px",
    },
  },

  region: {
    marginBottom: "20px",
    color: "#192B7F",
    fontSize: "16px",
    paddingLeft: "10px",
  },
})

export class ChannelsList extends Component {
  state = {
    open: false,
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  createChannel = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { classes, channels } = this.props
    const { open } = this.state
    if (open) {
      return (
        <CreateChannel />
      )
    }

    return (
      <Fragment>
        <TopBar title="Channels Apps">
          <MainButton>Create New App</MainButton>
        </TopBar>

        <div className={classes.contentWrap}>
          {Object.keys(channels).map((key, i, arr) => {
            let setRegion = true
            if (arr[i - 1]) {
              setRegion = channels[arr[i - 1]].region !== channels[key].region
            }

            return (
              <Fragment key={i}>
                {setRegion
                    && (
                    <Typography className={classes.region} variant="h3">
                      {channels[key].region}
                    </Typography>
                    )}

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

const mapStateToProps = ({ channels }) => ({

})

const mapDispatchToProps = {

}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(ChannelsList)
