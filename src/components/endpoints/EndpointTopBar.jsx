/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { compose } from "redux"
import { withRouter } from "react-router-dom"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import IconButton from "@material-ui/core/IconButton"
import EndpointMenu from "./EndpointMenu"
import TopBar from "../utils/TopBar"

export class EndpointTopBar extends Component {
  state = {
    anchorEl: null,
    openMenu: false,
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {
  }

  handleVerIconClick = event => this.setState({ anchorEl: event.currentTarget, openMenu: true })

  handleMenuClose = () => this.setState({ openMenu: false, anchorEl: null })

  render() {
    const { title } = this.props
    const { anchorEl, openMenu } = this.state
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
            />
          </div>
        </TopBar>
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

const mapDispatchToProps = {

}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(EndpointTopBar)
