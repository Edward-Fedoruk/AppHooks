import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import withWidth from "@material-ui/core/withWidth"
import { compose } from "redux"
import LeftPanel from "./LeftPanel"
import RightPanel from "./RightPanel"
import { fetchUserSettings } from "../../actions/user"
import ShortCutPanel from "./ShortCutPanel"

class AppNavigation extends Component {
  static propTypes = {
    width: PropTypes.string.isRequired,
    fetchUserSettings: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchUserSettings()
  }

  render() {
    const { width } = this.props
    return (
      <Fragment>
        {width !== "xs" && <LeftPanel />}
        <RightPanel />
        <ShortCutPanel />
      </Fragment>
    )
  }
}

const mapDispatchToProps = {
  fetchUserSettings,
}

export default compose(
  withWidth(),
  connect(null, mapDispatchToProps)
)(AppNavigation)
