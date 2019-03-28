import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { compose } from "redux"
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core"
import { withRouter } from "react-router-dom"
import { RadialChart } from "react-vis"
import { stageSummary, stageBreakdown, stageTotal } from "../../actions/statistics"
import CardStatsBlock from "../CardStatsBlock"

const styles = () => ({
  card: {
    padding: "14px 25px 17px 25px",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },

  summaryStats: {
    display: "flex",
    justifyContent: "space-between",
  },

  radialCenter: {
    position: "absolute",
    top: "50%",
    left: "50%",
    backgroundColor: "#fff",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
  },

  statsWrap: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px 0",
  },

  statsList: {
    padding: "0",
    margin: "0",
  },

  statsListItem: {
    margin: "10px 0",
    position: "relative",
    textTransform: "capitalize",
  },

  dot: {
    width: "10px",
    height: "10px",
    position: "absolute",
    top: "49%",
    left: "-10%",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
  },

  deliverability: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "50%",
  },

  radialChartWrap: { position: "relative" },
  generalInfo: { width: "50%" },
  radialChart: { position: "relative" },
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
  }

  componentDidMount() {
    const {
      getStagesStats, stageTotal, stageBreakdown, match: { params },
    } = this.props
    getStagesStats(params.channelId, params.stageId)
    stageTotal(params.channelId, params.stageId)
    stageBreakdown(params.channelId, params.stageId)
  }

  transformRadialChartData = () => {
    const { summary } = this.props
    const colors = ["#4ED8DA", "#F25252", "#C04DD8", "#828CB8", "#D7DEF1"]

    return Object.entries(summary)
      .filter(([name]) => name !== "deliverability")
      .map(([name, value], i) => ({ name, angle: value, color: colors[i] }))
  }

  renderChartFields = (chartData) => {
    const { classes } = this.props

    return chartData.map(({ name, color }) => (
      <Typography component="li" className={classes.statsListItem}>
        <span style={{ backgroundColor: color }} className={classes.dot} />{ name }
      </Typography>
    ))
  }

  render() {
    const { classes, total, summary } = this.props
    const radialChartData = this.transformRadialChartData()
    const chartFields = this.renderChartFields(radialChartData)

    return (
      <Card className={classes.card}>
        <div className={classes.generalInfo}>
          <div className={classes.summaryStats}>
            <CardStatsBlock leftDivider name="Inputs" amount={total.inputs} />
            <CardStatsBlock name="Destinations" amount={total.destinations} />
            <CardStatsBlock name="Requests" amount={total.requests} />
          </div>

          <div className={classes.statsWrap}>
            <div className={classes.radialChartWrap}>
              <RadialChart
                className={classes.radialChart}
                colorType="literal"
                data={radialChartData}
                width={200}
                height={200}
                innerRadius={65}
                radius={90}
                padAngle={0.04}
              />
              <div className={classes.deliverability}>
                <Typography align="center" variant="h5">{ summary.deliverability }</Typography>
                <Typography align="center" variant="subtitle1">Deliverability</Typography>
              </div>
            </div>
            <ul className={classes.statsList}>{ chartFields }</ul>
          </div>
        </div>

        <div className={classes.timeChart} />
      </Card>
    )
  }
}

const mapStateToProps = ({ statistics }) => ({
  total: statistics.stage.total,
  summary: statistics.stage.summary,
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
