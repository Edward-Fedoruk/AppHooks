import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { compose } from "redux"
import Card from "@material-ui/core/Card"
import { withStyles } from "@material-ui/core"
import { withRouter } from "react-router-dom"
import GeneralStats from "./GeneralStats"
import { stageSummary, stageBreakdown, stageTotal } from "../../actions/statistics"
import DynamicTimeChart from "./DynamicTimeChart"

const styles = () => ({
  card: {
    padding: "14px 25px 17px 25px",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
})

export class ChannelChartCard extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    getStagesStats: PropTypes.func.isRequired,
    stageTotal: PropTypes.func.isRequired,
    stageBreakdown: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    total: PropTypes.object.isRequired,
    summary: PropTypes.object.isRequired,
    breakdown: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const {
      getStagesStats, stageTotal, stageBreakdown, match: { params },
    } = this.props
    getStagesStats(params.channelId, params.stageId)
    stageTotal(params.channelId, params.stageId)
    stageBreakdown(params.channelId, params.stageId)
  }

  transformTimeChartData = () => {
    const { breakdown } = this.props

    const date = Object.keys(breakdown)[0]
    if (date !== undefined) {
      return Object.entries(breakdown[date]).map(([time, axis]) => ([
        Date.parse(`${date} ${time}`),
        axis["5xx"]
      ]))
    }

    return [[Date.parse(new Date()), 0]]
  }


  render() {
    const { classes, total, summary } = this.props
    const XYChartData = this.transformTimeChartData()

    return (
      <Card className={classes.card}>
        <GeneralStats total={total} summary={summary} />
        <DynamicTimeChart XYChartData={XYChartData} />
      </Card>
    )
  }
}

const mapStateToProps = ({ statistics }) => ({
  total: statistics.stage.total,
  summary: statistics.stage.summary,
  breakdown: statistics.stage.breakdown,
})

const mapDispatchToProps = dispatch => ({
  getStagesStats: (channelId, stageId) => dispatch(stageSummary(channelId, stageId)),
  stageBreakdown: (channelId, stageId) => dispatch(stageBreakdown(channelId, stageId)),
  stageTotal: (channelId, stageId) => dispatch(stageTotal(channelId, stageId)),
})

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ChannelChartCard)
