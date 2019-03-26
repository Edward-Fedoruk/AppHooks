/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { compose } from "redux"
import { withRouter } from "react-router-dom"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import IconButton from "@material-ui/core/IconButton"
import EndpointMenu from "./EndpointMenu"
import TopBar from "../utils/TopBar"
import ConfirmDialog from "../ConfirmDialog"
import { deleteEndpoint } from "../../actions/endpoint"

export class EndpointTopBar extends Component {
  state = {
    anchorEl: null,
    openMenu: false,
    deleteEndpointDialog: false,
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired,
    deleteEndpoint: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  handleVerIconClick = event => this.setState({ anchorEl: event.currentTarget, openMenu: true })

  handleMenuClose = () => this.setState({ openMenu: false, anchorEl: null })

  toggleDialog = dialog => () => this.setState(state => ({ [dialog]: !state[dialog] }))

  deleteEndpoint = () => {
    const { deleteEndpoint, match: { params } } = this.props
    deleteEndpoint(params.channelId, params.stageId, params.endpointId)
  }

  render() {
    const { title } = this.props
    const { anchorEl, openMenu, deleteEndpointDialog } = this.state
    return (
      <div>
        <TopBar title={title}>
          <div>
            <IconButton
              aria-owns={anchorEl ? "simple-menu" : undefined}
              aria-haspopup="true"
              onClick={this.handleVerIconClick}
            >
              <MoreVertIcon />
            </IconButton>
            <EndpointMenu
              anchorEl={anchorEl}
              openMenu={openMenu}
              handleMenuClose={this.handleMenuClose}
              toggleDialog={this.toggleDialog}
            />
          </div>
        </TopBar>

        <ConfirmDialog
          handleCloseWithAction={this.deleteEndpoint}
          handleClose={this.toggleDialog("deleteEndpointDialog")}
          open={deleteEndpointDialog}
          title="delete current endpoint"
        >
          Are you sure you want to delete this endpoint? It can`t be undone
        </ConfirmDialog>
      </div>
    )
  }
}

const mapStateToProps = ({ channelsEntities: { entities } }, { match }) => {
  const endpoint = entities.endpoints[match.params.endpointId]
    ? entities.endpoints[match.params.endpointId].name : ""

  return {
    title: endpoint,
  }
}

const mapDispatchToProps = dispatch => ({
  deleteEndpoint: (channelId, stageId, endpointId) => dispatch(deleteEndpoint(channelId, stageId, endpointId)),
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(EndpointTopBar)
