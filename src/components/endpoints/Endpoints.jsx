import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core"
// import AddCircle from "@material-ui/icons/AddCircle"
import { compose } from "redux"
import Title from "../utils/Title"
import EndpointCard from "./EndpointCard"

const styles = () => ({
  endpointsTitle: {
    display: "flex",
    width: "140px",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "55px",
    marginLeft: "13px",
    marginBottom: "20px",
  },

  addIcon: {
    color: "#35C1CE",
    fontSize: "30px",
    transition: "opacity .5s",
    cursor: "pointer",

    "&:hover": {
      opacity: ".8",
    },
  },
})

const Endpoints = ({ classes, endpoints }) => (
  <Fragment>
    <div className={classes.endpointsTitle}>
      <Title styles={{ fontSize: "20px" }}>Endpoints</Title>
    </div>
    {endpoints.map(endpoint => (
      <EndpointCard key={endpoint.id} endpointInfo={endpoint} />
    ))}
  </Fragment>
)


Endpoints.propTypes = {
  endpoints: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
}


export default compose(
  withStyles(styles)
)(Endpoints)
