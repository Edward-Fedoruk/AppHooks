import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import AddCircle from '@material-ui/icons/AddCircle'
import { ReactComponent as LogoIcon} from "../../assets/LogoIcon.svg"
import { ReactComponent as User} from '../../assets/User.svg'
import { ReactComponent as QuestionMark} from '../../assets/QuestionMark.svg'
import IconButton from '@material-ui/core/IconButton'

const iconsGroup = {
  alignSelf: "flex-start",
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap"
}

const styles = () => ({
  paper: {
    background: "#192B81",
    width: "88px",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingTop: "13px",
    overflow: "auto"
  },

  topIcons: iconsGroup,

  logoIcon: {
    width: "100%"
  },

  addCircleWrap: {
    marginTop: "45px",
    color: "#d1d5e6"
  },

  addCircle: {
    fontSize: "35px",
  },
  
  bottomIcons: {
    ...iconsGroup,
    alignSelf: "flex-end",
    marginTop: "70px"
  },

  questionMarkWrap: {
    marginBottom: "24px"
  },

  questionMark: {
    height: "35px",
  },

  user: {
    height: "45px",
  },

  userWrap: { 
    marginBottom: "33px"
  }
})

export class LeftPanel extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.paper}>
        <div className={classes.topIcons}>
          <LogoIcon className={classes.logoIcon}/>
          
          <IconButton className={classes.addCircleWrap}>
            <AddCircle className={classes.addCircle} />
          </IconButton>
        </div>
        <div className={classes.bottomIcons}>
          <IconButton className={classes.questionMarkWrap}>
            <QuestionMark className={classes.questionMark} />
          </IconButton>

          <IconButton className={classes.userWrap}>
            <User className={classes.user} />
          </IconButton>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)( withStyles(styles)(LeftPanel))
