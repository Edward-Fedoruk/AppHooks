import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'
import Title from '../Title'
import AddCircle from '@material-ui/icons/AddCircle'
import { compose } from 'redux'
import EndpointCard from '../endpoints/EndpointCard'

const styles = () => ({
  endpointsTitle: {
    display: "flex",
    width: "140px",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "55px",
    marginLeft: "13px",
    marginBottom: "20px"
  },

  addIcon: {
    color: "#35C1CE",
    fontSize: "30px",
    transition: "opacity .5s",
    cursor: "pointer",

    "&:hover": {
      opacity: ".8"
    }
  }
})

const Endpoints = ({ classes, endpoints }) => (
  <Fragment>
    <div className={classes.endpointsTitle}>
      <Title styles={{fontSize: "20px"}}>
        Endpoints
      </Title>
      <AddCircle className={classes.addIcon} />
    </div>

    {endpoints.map(({url, name}, i) => (
      <EndpointCard 
        key={i}
        link={url}
        endpointName={name}
      />
    ))}
  </Fragment>
)


Endpoints.propTypes = {
  endpoints: PropTypes.array.isRequired
}


export default compose(
  withStyles(styles)
)(Endpoints)
