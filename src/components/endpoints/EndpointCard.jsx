import React from "react"
import PropTypes from "prop-types"
import Paper from "@material-ui/core/Paper"
import { withStyles } from "@material-ui/core"
import Title from "../Title"

const styles = () => ({
  paper: {
    width: "100%",
    maxWidth: "870px",
    padding: "16px 25px",
    marginTop: "13px",
  },

  stats: {
    display: "flex",
    justifyContent: "space-between",
  },

  name: {
    display: "block",
    fontSize: "14px",
  },

  link: {
    color: "#192B7F",
    fontFamily: "Lato",
    fontSize: "14px",
    margin: "12px 0 27px 0",
    display: "block",
  },
})

const EndpointCard = ({ endpointName, link, classes }) => (
  <Paper className={classes.paper}>
    <Title styles={{ fontSize: "14px" }}>
      {endpointName}
    </Title>

    <a className={classes.link} href={link}>{link}</a>

    <div className={classes.stats}>
      <span>0000</span>
      <span>0000</span>
      <span>0000</span>
      <span>0000</span>
    </div>

  </Paper>
)

EndpointCard.propTypes = {
  endpointName: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(EndpointCard)
