import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { compose } from "redux"
import Card from "@material-ui/core/Card"
import { withStyles } from "@material-ui/core"
import { withRouter } from "react-router-dom"
import { stageBreakedown } from "../../actions/statistics"

const styles = () => ({

})

export class ChannelChartCard extends Component {
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
    return (
      <div>
        <Card />
      </div>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  getStagesStats: (channelId, stageId) => dispatch(stageBreakedown(channelId, stageId)),
})

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ChannelChartCard)
