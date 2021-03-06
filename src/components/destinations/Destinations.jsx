/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { compose } from "redux"
import { withRouter } from "react-router-dom"
// import { withStyles } from "@material-ui/core/styles"
// import ExpansionPanel from "@material-ui/core/ExpansionPanel"
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
// import Typography from "@material-ui/core/Typography"
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import destinationsImg from "../../assets/destinations.svg"
import { fetchDestinations, deleteDestination } from "../../actions/destination"
import DestinationCard from "./DestinationCard"
import ConfirmDialog from "../ConfirmDialog"
import { toggleDestinationDeleteDialog } from "../../actions/ui"
import Placeholder from "../Placeholder"
import { toggleCreateDestinationForm } from "../../actions/ui"

export class Destinations extends Component {
  static propTypes = {
    destinations: PropTypes.array.isRequired,
    fetchDestinations: PropTypes.func.isRequired,
    deleteDestination: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    destinationDeleteDialog: PropTypes.bool.isRequired,
    toggleDestinationDeleteDialog: PropTypes.func.isRequired,
    toggleCreateDestinationForm: PropTypes.func.isRequired,
    destInfo: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { fetchDestinations, match: { params } } = this.props
    fetchDestinations(params.endpointId)
  }

  deleteDest = () => {
    const {
      deleteDestination, toggleDestinationDeleteDialog, destInfo, match: { params },
    } = this.props
    deleteDestination(params.endpointId, destInfo.id)
    toggleDestinationDeleteDialog()
  }

  render() {
    const { destinations, destinationDeleteDialog, toggleDestinationDeleteDialog } = this.props
    return destinations.length ? (
      <div>
        {destinations.map(dest => (
          <div key={dest.id}>
            <DestinationCard destInfo={dest} />
          </div>
        ))}

        <ConfirmDialog
          handleCloseWithAction={this.deleteDest}
          handleClose={toggleDestinationDeleteDialog}
          open={destinationDeleteDialog}
          title="delete destination"
        >
          Are you sure you want to delete this destination? It can`t be undone
        </ConfirmDialog>
      </div>
    ) : (
      <Placeholder
        title="There is no Destination here yet."
        subtitle="To create new Destination"
        button="click here"
        imgSrc={destinationsImg}
        buttonAction={toggleCreateDestinationForm}
      />
    )
  }
}

const mapStateToProps = ({ destinations, view }) => ({
  destinations: destinations.allDestinations,
  destinationDeleteDialog: view.destinationDeleteDialog,
  destInfo: view.destinationInfo,
})

const mapDispatchToProps = dispatch => ({
  fetchDestinations: endpointId => dispatch(fetchDestinations(endpointId)),
  deleteDestination: (endpointId, destId) => dispatch(deleteDestination(endpointId, destId)),
  toggleDestinationDeleteDialog: () => dispatch(toggleDestinationDeleteDialog({})),
  toggleCreateDestinationForm: () => dispatch(toggleCreateDestinationForm()),
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Destinations)
