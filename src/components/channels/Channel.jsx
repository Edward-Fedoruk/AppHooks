import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core"
import { withRouter } from "react-router"
import { compose } from "redux"
import withNavigation from "../withNavigation"
import Title from "../utils/Title"
import { fetchChannel } from "../../actions/channel"
import ConfirmDialog from "../ConfirmDialog"
import StageTopBar from "../stages/StageTopBar"
import Endpoints from "../endpoints/Endpoints"
import Placeholder from "../Placeholder"
import stageImg from "../../assets/stages.png"
import endpointImg from "../../assets/endpoints.png"

const styles = () => ({
  contentWrap: {
    padding: "25px 35px",
  },

  placeholder: {
    margin: "100px auto 0 auto",
    width: "550px",
  },
})

export class Channel extends Component {
  state = {
    open: false,
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    currentStage: PropTypes.object,
    endpoints: PropTypes.array,
    stages: PropTypes.array,
  }

  handleCloseWithAction = () => {
    this.setState({ open: false })
    this.props.deleteChannel(this.props.match.params.id, this.props.history)
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  addStage = () => {}

  componentDidMount() {
    const { history, match } = this.props
    this.props.fetchChannel(match.params.id, history)
  }

  render() {
    const {
      classes, currentStage, endpoints, stages,
    } = this.props
    return (
      <Fragment>
        <StageTopBar />
        <div className={classes.contentWrap}>

          {stages.length
            ? (
              <Title styles={{ fontWeight: "normal" }}>
                {currentStage !== undefined && currentStage.name}
              </Title>
            )
            : (
              <Placeholder
                title="There is no Endpoint here yet."
                subtitle="To create new Endpoint"
                button="click here"
                imgSrc={stageImg}
                className={classes.placeholder}
              />
            )}

          {endpoints.length
            ? <Endpoints endpoints={endpoints} />
            : stages.length ? (
              <Placeholder
                title="There is no Endpoint here yet."
                subtitle="To create new Endpoint"
                button="click here"
                imgSrc={endpointImg}
                className={classes.placeholder}
              />
            ) : null}


          <ConfirmDialog
            handleCloseWithAction={this.handleCloseWithAction}
            handleClose={this.handleClose}
            open={this.state.open}
          />

        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ channels, channelsEntities: { entities }, view }) => {
  const stages = channels.currentChannel.stageIds.map(id => entities.stages[id])
  const currentStage = stages[view.currentStage]
  let endpoints = []
  if (currentStage !== undefined) { endpoints = currentStage.endpoints.map(id => entities.endpoints[id]) }

  return { currentStage, endpoints, stages }
}

const mapDispatchToProps = dispatch => ({
  fetchChannel: (id, routeHistory) => dispatch(fetchChannel(id, routeHistory)),
})

export default compose(
  withNavigation,
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Channel)
