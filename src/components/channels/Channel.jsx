import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withStyles } from '@material-ui/core'
import withNavigation from '../withNavigation'
import TopBar from '../TopBar'
import Title from '../Title'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Stage from "../stages/Stage"
import AddCircle from '@material-ui/icons/AddCircle'
import { fetchChannel, deleteChannel } from '../../actions/channel'
import { withRouter } from "react-router"
import ConfirmDialog from '../ConfirmDialog'

const styles = () => ({
  contentWrap: {
    padding: "25px 35px"
  },
 
  channel: {
    textTransform: "capitalize",
    color: "#fff",
    fontSize: "16px",
    background: "#35C1CE",
    "&:hover": {
      opacity: ".9",
      background: "#192B81",
    },
  },

  headerWrap: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "30px"
  },

  danger: {
    fontSize: "18px",
    fontWeight: "bold",
    fontFamily: "Lato",
    marginTop: "28px"
  },

  description: {
    color: "rgba(25, 43, 127, 0.7)",
    fontSize: "14px",
    fontFamily: "Lato"
  },

  deleteIcon: {
    transform: "rotate(45deg)",
    marginRight: "5px",
    fontSize: "19px"
  },

  delete: {
    color: "#F96565",
    textDecoration: "underline",
    display: "flex",
    alignItems: "flex-start",
    cursor: "pointer",
    width: "fit-content"
  }
})

export class Channel extends Component {
  state = {
    open: false,
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    currentChannel: PropTypes.object.isRequired
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleCloseWithAction = () => {
    this.setState({ open: false })
    this.props.deleteChannel(this.props.match.params.id, this.props.history)
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  componentDidMount() {
    this.props.fetchChannel(this.props.match.params.id, this.props.history)
  }

  addStage = () => {}

  render() {
    const { history, match, classes, currentChannel, deleteChannel } = this.props
    if(currentChannel.name) 
      return (
        <Fragment>
          <TopBar 
            title={currentChannel.name}
            onButtonClick={this.addStage}
            button={false}
          />
          <div className={classes.contentWrap}>
            <div className={classes.headerWrap}>
              <Title
                title={"Stages"}
              />
              <Button 
                size={"large"}
                color="primary" 
                variant="text" 
                className={classes.channel}
                onClick={this.addStage}
              >
                Add stage
              </Button>
            </div>

            {currentChannel.stages.map((stage) => {
              return <Stage  key={stage.id} stageName={stage.name}/>
            })}
            
            <ConfirmDialog 
              handleCloseWithAction={this.handleCloseWithAction}
              handleClose={this.handleClose}
              open={this.state.open}
            />

            <Divider variant="middle" />

            <Typography color="primary" className={classes.danger} >Danger zone</Typography>
            <Typography gutterBottom className={classes.description} >This is a permanent action and cant’t be undone</Typography>
            <Typography onClick={this.handleClickOpen} className={classes.delete}>
              <AddCircle className={classes.deleteIcon} />
              Delete this app
            </Typography>

          </div>
        </Fragment>
      )
    else return <div>loading</div>
  }
}

const mapStateToProps = ({ channels }) => ({
    currentChannel: channels.currentChannel,
})

const mapDispatchToProps = (dispatch) => ({
  fetchChannel: (id, routeHistory) => dispatch(fetchChannel(id, routeHistory)),
  deleteChannel: (id, routeHistory) => dispatch(deleteChannel(id, routeHistory)),
})

export default compose( 
  withNavigation,
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Channel)