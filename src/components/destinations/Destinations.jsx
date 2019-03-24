import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { compose } from "redux"
import { withRouter } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { fetchDestinations } from "../../actions/destination"
import DestinationCard from "./DestinationCard"

export class Destinations extends Component {
  static propTypes = {
    destinations: PropTypes.array.isRequired,
    fetchDestinations: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { fetchDestinations, match: { params } } = this.props
    fetchDestinations(params.endpointId)
  }

  render() {
    const { destinations } = this.props
    return (
      <div>
        {destinations.map(dest => (
          <div>
            {console.log(dest)}
            <DestinationCard destInfo={dest} />
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = ({ destinations }) => ({
  destinations: destinations.allDestinations,
})

const mapDispatchToProps = dispatch => ({
  fetchDestinations: endpointId => dispatch(fetchDestinations(endpointId)),
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Destinations)
