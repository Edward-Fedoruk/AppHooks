import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core"
import { TimeRange } from "pondjs"
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis as TimeYAxis,
  LineChart,
  Resizable,
  styler 
} from "react-timeseries-charts"
import Typography from "@material-ui/core/Typography"

const styles = () => ({
  dot: {
    width: "10px",
    height: "10px",
    position: "absolute",
    top: "49%",
    left: "-10%",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
  },

  identifiersWrap: { 
    display: "flex",
    justifyContent: "flex-end",     
  },

  identifier: { 
    position: "relative", 
    fontStyle: "normal",
    padding: "0 30px 0 5px",
  },
  timeChartWrap: { width: "50%" },
})

const YAxisStyle = { 
  values: { 
    stroke: "none", 
    fill: "#828CB8", 
    "font-family": "Roboto", 
    "font-size": "12px", 
    "font-weight": "normal" 
  },
  ticks: { fill: "none", stroke: "#D7DEF1" }, 
  axis: { fill: "none", stroke: "rgba(0, 0, 0, 0)" } 
}

const timeAxisStyle  = { 
  axis: { 
    fill: "none", 
    stroke: "rgba(0, 0, 0, 0)", 
    pointerEvents: "none"
  },
  ticks: {
    fill: "none", 
    stroke: "rgba(0, 0, 0, 0)", 
    pointerEvents: "none"
  },
  values: YAxisStyle.values
}

export class DynamicTimeChart extends Component {
  state = {
    timeRange: new TimeRange([Date.parse("2019-03-19 00:00"), Date.parse("2019-03-19 00:25")]),
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    XYChartData: PropTypes.shape({
      serverErrors: PropTypes.object.isRequired, 
      clientErrors: PropTypes.object.isRequired,
      successes: PropTypes.object.isRequired,
    }).isRequired,
  }

  handleTimeRangeChange = timeRange => this.setState({ timeRange })

  createLineChartStyle = color => new styler([{key: "time", width: "2px", color}, {key: "value", width: "2px", color}])

  serverErrorStyles = this.createLineChartStyle("#F3DD1C")
  clientErrorStyles = this.createLineChartStyle("#F25252")
  successStyles = this.createLineChartStyle("#4ED8DA")

  render() {
    const { XYChartData, classes } = this.props

    return (
      <div className={classes.timeChartWrap}>
        <div className={classes.identifiersWrap}>
          <Typography style={{ color: "#F25252" }} component="em" className={classes.identifier}>
            <span style={{ backgroundColor: "#F25252", color: "#F25252" }} className={classes.dot} />4xx
          </Typography>
          <Typography style={{ color: "#F3DD1C" }} component="em" className={classes.identifier}>
            <span style={{ backgroundColor: "#F3DD1C", color: "#F3DD1C" }} className={classes.dot} />5xx
          </Typography>
          <Typography style={{ color: "#4ED8DA" }} component="em" className={classes.identifier}>
            <span style={{ backgroundColor: "#4ED8DA" }} className={classes.dot} />2xx
          </Typography>
        </div>
        <Resizable>
          <ChartContainer 
            minTime={XYChartData.serverErrors.range().begin()} 
            maxTime={XYChartData.serverErrors.range().end()} 
            onTimeRangeChanged={this.handleTimeRangeChange} 
            timeRange={this.state.timeRange}
            timeAxisStyle={timeAxisStyle}
            enablePanZoom
          >
            <ChartRow height="250">
              <TimeYAxis
                showGrid
                id="price"
                min={XYChartData.serverErrors.min()} 
                max={XYChartData.serverErrors.max()}
                width="40"
                style={YAxisStyle}
              />
              <Charts>
                <LineChart 
                  interpolation="curveLinear" 
                  axis="price" 
                  series={XYChartData.serverErrors} 
                  style={this.serverErrorStyles}
                />
                <LineChart 
                  interpolation="curveLinear" 
                  axis="price" 
                  series={XYChartData.clientErrors} 
                  style={this.clientErrorStyles}
                />
                <LineChart 
                  interpolation="curveLinear" 
                  axis="price" 
                  series={XYChartData.successes} 
                  style={this.successStyles}
                />
              </Charts>
            </ChartRow>
          </ChartContainer>
        </Resizable>
      </div>
    )
  }
}

export default withStyles(styles)(DynamicTimeChart)