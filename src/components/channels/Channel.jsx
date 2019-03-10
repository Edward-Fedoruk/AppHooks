/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core"
import { withRouter } from "react-router-dom"
import { compose } from "redux"
import withNavigation from "../withNavigation"
import Title from "../utils/Title"
import { fetchChannel } from "../../actions/channel"
import { toggleCreateStageForm } from "../../actions/ui"
import ConfirmDialog from "../ConfirmDialog"
import StageTopBar from "../stages/StageTopBar"
import Endpoints from "../endpoints/Endpoints"
import Placeholder from "../Placeholder"
import stageImg from "../../assets/stages.png"
import endpointImg from "../../assets/endpoints.png"
import CreateStage from "../stages/CreateStage"
import FormDrawer from "../FormDrawer"

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
  static propTypes = {
    classes: PropTypes.object.isRequired,
    currentStage: PropTypes.object,
    endpoints: PropTypes.array,
    stages: PropTypes.array,
    toggleCreateStageForm: PropTypes.func.isRequired,
    fetchChannel: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    createStageForm: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    currentStage: {},
    endpoints: [],
    stages: [],
  }

  state = {
    open: false,
  }


  componentDidMount() {
    const { history, match } = this.props
    this.props.fetchChannel(match.params.id, history)
  }

  handleCloseWithAction = () => {
    this.setState({ open: false })
    // this.props.deleteChannel(this.props.match.params.id, this.props.history)
  }

  handleClose = () => {
    this.setState({ open: false })
  }


  render() {
    const {
      classes, currentStage, endpoints,
      stages, createStageForm, toggleCreateStageForm,
    } = this.props
    return (
      <Fragment>
        <StageTopBar />
        <div className={classes.contentWrap}>

          <FormDrawer open={createStageForm} toggleDialog={toggleCreateStageForm}>
            <CreateStage />
          </FormDrawer>

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
          >
            sdf
          </ConfirmDialog>

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

  return {
    currentStage,
    endpoints,
    stages,
    createStageForm: view.createStageForm,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchChannel: (id, routeHistory) => dispatch(fetchChannel(id, routeHistory)),
  toggleCreateStageForm: () => dispatch(toggleCreateStageForm()),
})

export default compose(
  withNavigation,
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Channel)
