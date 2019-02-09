import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import { withStyles } from "@material-ui/core"
import { compose } from "redux"
import { withRouter } from "react-router-dom"
import { changeStage } from "../../actions/ui"
import { deleteChannel } from "../../actions/channel"
import ChannelMenu from "../channels/ChannelMenu"
import TopBar from "../TopBar"

const styles = () => ({
  menu: {
    width: "300px",
  },

  select: {
    marginRight: "20px",
  },

  deleteIcon: {
    transform: "rotate(45deg)",
    fontSize: "19px",
    color: "#F96565",
  },

  delete: {
    color: "#F96565",
    alignItems: "flex-start",
    cursor: "pointer",
  },
})

export class StageTopBar extends Component {
  state = {
    anchorEl: null,
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    stages: PropTypes.array,
    channel: PropTypes.object,
    currentStage: PropTypes.number,
    deleteChannel: PropTypes.func.isRequired,
  }

  handleChange = (event) => {
    this.props.changeStage(event.target.value)
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  deleteChannel = () => {
    const { deleteChannel, match, history } = this.props
    deleteChannel(match.params.id, history)
  }

  render() {
    const {
      classes, stages, channel, currentStage,
    } = this.props
    const { anchorEl } = this.state
    const currentChannel = channel !== undefined && channel.name
    const currentStageName = stages[currentStage] !== undefined && stages[currentStage].name
    return (
      <TopBar title={currentChannel}>
        <Select
          value={currentStage}
          onChange={this.handleChange}
          displayEmpty
          className={classes.select}
        >
          {stages.map((stage, i) => (
            <MenuItem key={stage.id} value={i}>{stage.name}</MenuItem>
          ))}
        </Select>

        <ChannelMenu
          anchorEl={anchorEl}
          handleClick={this.handleClick}
          handleClose={this.handleClose}
          currentStageName={currentStageName}
          currentChannel={currentChannel}
          deleteChannel={this.deleteChannel}
        />

      </TopBar>
    )
  }
}

const mapStateToProps = ({ channels: { currentChannel }, channelsEntities, view }) => ({
  stages: currentChannel.stageIds.map(id => channelsEntities.entities.stages[id]),
  channel: channelsEntities.entities.channels[currentChannel.channelId],
  currentStage: view.currentStage,
})

const mapDispatchToProps = dispatch => ({
  changeStage: stage => dispatch(changeStage(stage)),
  deleteChannel: (id, routeHistory) => dispatch(deleteChannel(id, routeHistory)),
})

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(StageTopBar)
