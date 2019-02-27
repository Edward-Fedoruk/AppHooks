import React, { Fragment } from "react"
import PropTypes from "prop-types"
import withWidth from "@material-ui/core/withWidth"
import { compose } from "redux"
import LeftPanel from "./LeftPanel"
import RightPanel from "./RightPanel"
import ShortCutPanel from "./ShortCutPanel"

const AppNavigation = ({ width }) => (
  <Fragment>
    {width !== "xs" && <LeftPanel />}
    <RightPanel />
    <ShortCutPanel />
  </Fragment>
)

AppNavigation.propTypes = {
  width: PropTypes.string.isRequired,
}
export default compose(
  withWidth(),
)(AppNavigation)
