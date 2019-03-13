import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import Gravatar from "react-gravatar"
import { withStyles } from "@material-ui/core/styles"
import Tooltip from "@material-ui/core/Tooltip"
import Close from "@material-ui/icons/Close"
import NavigateBefore from "@material-ui/icons/NavigateBefore"
import NavigateNext from "@material-ui/icons/NavigateNext"
import Slider from "react-slick"

const styles = ({ palette }) => ({
  userWrap: {
    display: "inline-flex !important",
    alignItems: "flex-start",
    flexWrap: "nowrap",
    padding: "2px",

    "&:hover $user": {
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.24)",
    },

    "&:hover $closeIcon": {
      visibility: "visible",
      opacity: "1",
    },

    "&:focus": { outline: "none" },
  },

  tooltip: { background: "#000" },

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

    "&:hover": { color: palette.primary.main },
  },

  collaboratorsWrap: {
    width: "70%",
    display: "flex",
    alignItems: "center",

    "& .slick-track": {
      display: "flex",
      overflow: "hidden",
    },
  },

  slickSlider: { width: "100%" },
  prev: {
    color: "#D7DEF1",
    cursor: "pointer",

    "&:hover": { color: palette.primary.main },
  },

  next: {
    color: "#D7DEF1",
    transform: "translateX(-30%)",
    cursor: "pointer",

    "&:hover": { color: palette.primary.main },
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

  slideNext = () => this.slider.current.slickNext()

  slidePrev = () => this.slider.current.slickPrev()


  renderCollaborators = () => {
    const { collaborators, classes } = this.props

    return collaborators.map(({ email }) => (
      <Tooltip placement="top" classes={{ tooltip: classes.tooltip }} title={email}>
        <div className={classes.userWrap}>
          <Gravatar email={email} className={classes.user} default="identicon" />
          <Close className={classes.closeIcon} />
        </div>
      </Tooltip>
    ))
  }

  render() {
    const { collaborators, classes } = this.props
    const renderedUsers = this.renderCollaborators()
    return (
      <div className={classes.collaboratorsWrap}>
        {collaborators.length > 4
          ? (
            <Fragment>
              <NavigateBefore className={classes.prev} onClick={this.slidePrev} />

              <Slider className={classes.slickSlider} ref={this.slider} {...slickSettings}>
                {renderedUsers}
              </Slider>

              <NavigateNext className={classes.next} onClick={this.slideNext} />
            </Fragment>
          ) : renderedUsers}
      </div>
    )
  }
}

export default withStyles(styles)(Collaborators)
