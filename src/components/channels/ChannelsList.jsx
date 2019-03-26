import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { compose } from "redux"
import Typography from "@material-ui/core/Typography"
import { connect } from "react-redux"
import ChannelCard from "./ChannelCard"

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

const ChannelsList = ({
  classes, channels,
}) => (
  <div className={classes.contentWrap}>
    {Object
      .keys(channels)
      .sort((a, b) => (channels[a].region > channels[b].region ? 1 : -1))
      .map((key, i, arr) => {
        let setRegion = true
        if (arr[i - 1]) {
          const channelIndex = arr[i - 1]
          setRegion = channels[channelIndex].region !== channels[key].region
        }

        return (
          <Fragment key={key}>
            {setRegion && (
            <Typography className={classes.region} variant="h3">
              {channels[key].region}
            </Typography>
            )}

            <ChannelCard channelId={channels[key].id} />
          </Fragment>
        )
      })}
  </div>
)

ChannelsList.propTypes = {
  classes: PropTypes.object.isRequired,
  channels: PropTypes.object.isRequired,
}


const mapStateToProps = ({ channelsEntities }) => ({
  channels: channelsEntities.entities.channels,
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(ChannelsList)
