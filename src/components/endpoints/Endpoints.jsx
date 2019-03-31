/* eslint-disable react/jsx-one-expression-per-line */
import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core"
import { compose } from "redux"
import { connect } from "react-redux"
import Title from "../utils/Title"
import EndpointCard from "./EndpointCard"
import ConfirmDialog from "../ConfirmDialog"
import { deleteEndpoint } from "../../actions/endpoint"
import { toggleEndpointDeleteDialog } from "../../actions/ui"
import Placeholder from "../Placeholder"
import endpointImg from "../../assets/endpoints.png"
import { toggleCreateEndpointForm } from "../../actions/ui"

const styles = () => ({
  endpointsTitle: {
    display: "flex",
    width: "140px",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "55px",
    marginLeft: "13px",
    marginBottom: "20px",
  },

  addIcon: {
    color: "#35C1CE",
    fontSize: "30px",
    transition: "opacity .5s",
    cursor: "pointer",

    "&:hover": {
      opacity: ".8",
    },
  },
})

const Endpoints = ({
  classes, endpoints, deleteEndpointAction, toggleCreateEndpointForm,
  endpointInfo, toggleEndpointDeleteDialog, endpointDeleteDialog,
}) => {
  const deleteEndpoint = () => {
    const {
      id: endpointId,
      application_id: channelId,
      application_stage_id: stageId,
    } = endpointInfo

    deleteEndpointAction(channelId, stageId, endpointId)
    toggleEndpointDeleteDialog()
  }
  console.log(endpoints.length)
  return endpoints.length ? (
    <Fragment>
      <div className={classes.endpointsTitle}>
        <Title styles={{ fontSize: "20px" }}>Endpoints</Title>
      </div>

      {endpoints.map(endpoint => (
        <EndpointCard key={endpoint.id} endpointInfo={endpoint} />
      ))}

      <ConfirmDialog
        handleCloseWithAction={deleteEndpoint}
        handleClose={toggleEndpointDeleteDialog}
        open={endpointDeleteDialog}
        title="delete endpoint"
      >
        Are you sure you want to delete this endpoint? It can`t be undone
      </ConfirmDialog>
    </Fragment>
  ) : (
    <Placeholder
      title="There is no Endpoint here yet."
      subtitle="To create new Endpoint"
      button="click here"
      imgSrc={endpointImg}
      buttonAction={toggleCreateEndpointForm}
    />
  )
}


Endpoints.propTypes = {
  endpoints: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  endpointInfo: PropTypes.object.isRequired,
  deleteEndpointAction: PropTypes.func.isRequired,
  endpointDeleteDialog: PropTypes.bool.isRequired,
  toggleEndpointDeleteDialog: PropTypes.func.isRequired,
  toggleCreateEndpointForm: PropTypes.func.isRequired,
}

const mapStateToProps = ({ view }) => ({
  endpointInfo: view.endpointInfo,
  endpointDeleteDialog: view.endpointDeleteDialog,
})

const mapDispatchToProps = dispatch => ({
  toggleEndpointDeleteDialog: () => dispatch(toggleEndpointDeleteDialog({})),
  toggleCreateEndpointForm: () => dispatch(toggleCreateEndpointForm({})),
  deleteEndpointAction: (channelId, stageId, endpointId) => dispatch(deleteEndpoint(channelId, stageId, endpointId)),
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Endpoints)
