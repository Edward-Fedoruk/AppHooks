/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react"
import PropTypes from "prop-types"
import Gravatar from "react-gravatar"
import { withStyles } from "@material-ui/core/styles"
import Tooltip from "@material-ui/core/Tooltip"
import Close from "@material-ui/icons/Close"
import NavigateBefore from "@material-ui/icons/NavigateBefore"
import NavigateNext from "@material-ui/icons/NavigateNext"
import Slider from "react-slick"

const styles = () => ({
  userWrap: {
    display: "inline-flex !important",
    alignItems: "flex-start",
    flexWrap: "nowrap",
    padding: "2px",

    "&:hover $user": {
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.24)"
    },

    "&:hover $closeIcon": {
      visibility: "visible",
      opacity: "1",
    },

    "&:focus": { outline: "none" },
  },

  tooltip: {
    background: "#000"
  },

  user: {
    height: "28px",
    width: "auto",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "opacity, box-shadow .3s",
  },

  closeIcon: {
    visibility: "hidden",
    opacity: "0",
    fontSize: "15px",
    color: "#828CB8",
    cursor: "pointer",
  },

  collaboratorsWrap: {
    width: "70%",
    display: "flex",
    alignItems: "center",
  },

  slickSlider: { width: "100%" },
  prev: {
    color: "#D7DEF1",
    cursor: "pointer",
  },

  next: {
    color: "#D7DEF1",
    transform: "translateX(-30%)",
    cursor: "pointer",
  },
})

const slickSettings = {
  slidesToShow: 4,
  swipe: false,
  accessibility: false,
  arrows: false,
  infinity: false,
}

export class Collaborators extends Component {
  static propTypes = {
    collaborators: PropTypes.array,
    classes: PropTypes.object.isRequired,
  }

  static defaultProps = {
    collaborators: [],
  }

  slider = React.createRef()

  slideNext = () => {
    console.log(this.slider)
    this.slider.current.slickNext()
  }

  slidePrev = () => {
    console.log(this.slider)
    this.slider.current.slickPrev()
  }

  render() {
    const { collaborators, classes } = this.props
    return (
      <div className={classes.collaboratorsWrap}>
        <NavigateBefore className={classes.prev} onClick={this.slidePrev} />

        <Slider className={classes.slickSlider} ref={this.slider} {...slickSettings}>
          {collaborators.map(({ email }) => (
            <Tooltip placement="top" classes={{ tooltip: classes.tooltip }} title={email}>
              <div className={classes.userWrap}>
                <Gravatar email={email} className={classes.user} default="identicon" />
                <Close className={classes.closeIcon} />
              </div>
            </Tooltip>
          ))}
          {collaborators.map(({ email }) => (
            <Tooltip placement="top" classes={{ tooltip: classes.tooltip }} title={email}>
              <div className={classes.userWrap}>
                <Gravatar email={email} className={classes.user} default="identicon" />
                <Close className={classes.closeIcon} />
              </div>
            </Tooltip>
          ))}
          {collaborators.map(({ email }) => (
            <Tooltip placement="top" classes={{ tooltip: classes.tooltip }} title={email}>
              <div className={classes.userWrap}>
                <Gravatar email={email} className={classes.user} default="identicon" />
                <Close className={classes.closeIcon} />
              </div>
            </Tooltip>
          ))}
          {collaborators.map(({ email }) => (
            <Tooltip placement="top" classes={{ tooltip: classes.tooltip }} title={email}>
              <div className={classes.userWrap}>
                <Gravatar email={email} className={classes.user} default="identicon" />
                <Close className={classes.closeIcon} />
              </div>
            </Tooltip>
          ))}
          {collaborators.map(({ email }) => (
            <Tooltip placement="top" classes={{ tooltip: classes.tooltip }} title={email}>
              <div className={classes.userWrap}>
                <Gravatar email={email} className={classes.user} default="identicon" />
                <Close className={classes.closeIcon} />
              </div>
            </Tooltip>
          ))}
          {collaborators.map(({ email }) => (
            <Tooltip placement="top" classes={{ tooltip: classes.tooltip }} title={email}>
              <div className={classes.userWrap}>
                <Gravatar email={email} className={classes.user} default="identicon" />
                <Close className={classes.closeIcon} />
              </div>
            </Tooltip>
          ))}
          {collaborators.map(({ email }) => (
            <Tooltip placement="top" classes={{ tooltip: classes.tooltip }} title={email}>
              <div className={classes.userWrap}>
                <Gravatar email={email} className={classes.user} default="identicon" />
                <Close className={classes.closeIcon} />
              </div>
            </Tooltip>
          ))}
        </Slider>

        <NavigateNext className={classes.next} onClick={this.slideNext} />
      </div>
    )
  }
}

export default withStyles(styles)(Collaborators)
