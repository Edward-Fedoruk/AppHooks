import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { compose } from "redux"
import Card from "@material-ui/core/Card"
import { withStyles } from "@material-ui/core"
import { withRouter } from "react-router-dom"
import GeneralStats from "./GeneralStats"
import { endpointsSummary, endpointsBreakdown, endpointsTotal } from "../../actions/statistics"
import DynamicTimeChart from "./DynamicTimeChart"

const styles = ({ breakpoints }) => ({
  card: {
    padding: "14px 25px 17px 25px",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    flexWrap: "wrap",

    [breakpoints.down(768)]: { 
      padding: "14px 0px 17px 0px",
    },
  },
})

export class EndpointChartCard extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    endpointsSummary: PropTypes.func.isRequired,
    endpointsTotal: PropTypes.func.isRequired,
    endpointsBreakdown: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    total: PropTypes.object.isRequired,
    summary: PropTypes.object.isRequired,
    breakdown: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const {
      endpointsSummary, endpointsTotal, endpointsBreakdown, match: { params },
    } = this.props
    endpointsSummary(params.endpointId)
    endpointsTotal(params.endpointId)
    endpointsBreakdown(params.endpointId)
  }

  render() {
    const { classes, total, summary, breakdown } = this.props

    return (
      <Card className={classes.card}>
        <GeneralStats total={total} summary={summary} />
        <DynamicTimeChart XYChartData={breakdown} />
      </Card>
    )
  }
}

const mapStateToProps = ({ statistics }) => ({
  total: statistics.endpoint.total,
  summary: statistics.endpoint.summary,
  breakdown: statistics.endpoint.breakdown,
})

const mapDispatchToProps = dispatch => ({
  endpointsSummary: endpointId => dispatch(endpointsSummary(endpointId)),
  endpointsBreakdown: endpointId => dispatch(endpointsBreakdown(endpointId)),
  endpointsTotal: endpointId => dispatch(endpointsTotal(endpointId)),
})

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(EndpointChartCard)
