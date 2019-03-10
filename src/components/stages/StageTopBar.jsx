/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import { withStyles } from "@material-ui/core"
import { compose } from "redux"
import { withRouter } from "react-router-dom"
import { changeStage } from "../../actions/ui"
import ChannelMenu from "../channels/ChannelMenu"
import TopBar from "../utils/TopBar"
import ConfirmDialog from "../ConfirmDialog"
import { deleteChannel } from "../../actions/channel"

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
    open: false,

  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    changeStage: PropTypes.func.isRequired,
    currentStage: PropTypes.number.isRequired,
    match: PropTypes.object.isRequired,
    deleteChannel: PropTypes.func.isRequired,
    stages: PropTypes.array,
    channel: PropTypes.object,
  }

  static defaultProps = {
    stages: [],
    channel: { name: "" },
  }

  handleChange = event => this.props.changeStage(event.target.value)

  handleClick = event => this.setState({ anchorEl: event.currentTarget })

  handleClose = () => this.setState({ anchorEl: null })

  toggleDialog = () => this.setState(({ open }) => ({ open: !open }))

  handleCloseWithAction = () => {
    const { match, deleteChannel } = this.props
    deleteChannel(match.params.id)
    this.toggleDialog()
  }

  render() {
    const {
      classes, stages, channel, currentStage,
    } = this.props
    const { anchorEl } = this.state
    const currentStageName = stages[currentStage] !== undefined && stages[currentStage].name
    return (
      <TopBar title={channel.name}>
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
          currentChannel={channel.name}
          deleteChannelAction={this.toggleDialog}
        />

        <ConfirmDialog
          handleCloseWithAction={this.handleCloseWithAction}
          handleClose={this.toggleDialog}
          open={this.state.open}
        >
          Are you sure you want to delete this channel? It can`t be undone
        </ConfirmDialog>

      </TopBar>
    )
  }
}

const mapStateToProps = ({ channels: { currentChannel }, channelsEntities, view }) => ({
  currentStage: view.currentStage,
  stages: currentChannel.stageIds.map(id => channelsEntities.entities.stages[id]),
  channel: channelsEntities.entities.channels[currentChannel.channelId],
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
