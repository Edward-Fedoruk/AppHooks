import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { compose } from "redux"
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core"
import { withRouter } from "react-router-dom"
import { RadialChart, Hint } from "react-vis"
import { stageSummary } from "../../actions/statistics"
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

  generalInfo: { width: "50%" },
  radialChart: { position: "relative" },
})

export class ChannelChartCard extends Component {
  state = {
    value: false,
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    getStagesStats: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { getStagesStats, match: { params } } = this.props
    getStagesStats(params.channelId, params.stageId)
  }

  render() {
    const { classes } = this.props
    const { value } = this.state
    const myData = [
      { angle: 1, label: "Successful Requests" },
      { angle: 5, label: "Failed Requests" },
      { angle: 2, label: "Pending Requests" },
    ]
    console.log(value)
    return (
      <Card className={classes.card}>
        <div className={classes.generalInfo}>
          <div className={classes.summaryStats}>
            <CardStatsBlock leftDivider name="test" amount="200" />
            <CardStatsBlock name="test2" amount="2000" />
            <CardStatsBlock name="test3" amount="0" />
          </div>

          <div>
            <RadialChart
              className={classes.radialChart}
              data={myData}
              width={150}
              height={150}
              innerRadius={50}
              radius={70}
              padAngle={0.04}
              labelsRadiusMultiplier={0.82}
              onValueMouseOver={v => this.setState({ value: v })}
              onSeriesMouseOut={() => this.setState({ value: false })}
            >
              <div className={classes.radialCenter}>60%</div>
              {value !== false && (
              <Hint value={value} align={{ horizontal: "center", vertical: "center" }}>
                <Card>
                  <Typography>{ value.label }</Typography>
                  <Typography>{ value.angle }</Typography>
                </Card>
              </Hint>
              )}
            </RadialChart>
          </div>
        </div>

        <div className={classes.timeChart} />
      </Card>
    )
  }
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = dispatch => ({
  getStagesStats: (channelId, stageId) => dispatch(stageSummary(channelId, stageId)),
})

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ChannelChartCard)
