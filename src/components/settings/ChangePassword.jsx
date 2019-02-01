import React, { Component } from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import Create from "@material-ui/icons/CreateOutlined"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import Grow from "@material-ui/core/Grow"
import Button from "@material-ui/core/Button"

const styles = ({ palette, breakpoints }) => ({
  settingsWrap: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",

    [breakpoints.down(425)]: {
      backgroundColor: "#fff",
      padding: "20px 0 20px 20px",
    },
  },

  btnGroup: { 
    position: "absolute",
    bottom: "-60px",

    [breakpoints.down(425)]: {
      paddingLeft: "15px",
      height: "60px",
      width: "100%",
      backgroundColor: "#fff"
    },
  },

  header: {
    fontSize: "18px",
    fontWeight: "900",
    marginRight: "5px",

    [breakpoints.down(425)]: {
      paddingLeft: "24px"
    },
  },

  headerWrap: {
    display: "flex",
    alignItems: "center"
  },

  field: {
    fontSize: "14px"
  },

  fieldName: {
    fontSize: "14px",
    marginRight: "5px",
    color: palette.primary.main,
    width: "110px",
    display: "flex",
    alignSelf: "center"
  },

  fieldWrap: {
    marginRight: "80px",

    [breakpoints.down(600)]: {
      marginTop: "20px",
    },
  },

  submitBtn: {
    textTransform: "capitalize",
    backgroundColor: palette.secondary.main,
    color: "#fff",
    marginLeft: "15px",

    "&:hover": {
      opacity: ".9",
      background: palette.primary.main
    }
  },
  
  contentWrap: { 
    marginBottom: "20px", 
    transition: ".25s margin linear",
    position: "relative"
  },
  underline: { "&::before, &::after": {display: "none"} },
  disabled: { color: palette.primary.main }
})

class ChangePassword extends Component {
  state = {
    show: false
  }

  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  toggleFrom = () => this.setState(({ show }) => ({ show: !show }))

  onSubmit = e => {
    e.preventDefault()
  }

  onChange = input => e => this.setState({ [input]: e.target.value })
  handleBlur = event => 
    this.refs[event.target.name].validate(event.target.value)

  render() {
    const { classes } = this.props
    const { show } = this.state
    const showInput = !show && {
      classes: {
        underline: classes.underline,
        disabled: classes.disabled
      }
    }
    return (
      <div style={{ marginBottom: show && "70px" }} className={classes.contentWrap}>
        <div className={classes.headerWrap}>
          <Typography className={classes.header} variant="h2" color="primary">
            Change password
          </Typography>
          <IconButton onClick={this.toggleFrom}>
            <Create/>
          </IconButton>
        </div>
        <ValidatorForm onSubmit={this.onSubmit} instantValidate={false}>
          <div className={classes.settingsWrap}>
            <Typography className={classes.fieldName} color="primary">
              Password
            </Typography>
            <TextValidator
              label="*******"
              type="password"
              placeholder="e.g., secret"
              onChange={this.onChange("password")}
              onBlur={this.handleBlur}
              value={this.state.password}
              InputProps={showInput}
              disabled={!show}
              name="password"
              ref="password"
              validators={["required", "minStringLength:6", "maxStringLength:16"]}
              errorMessages={["this field is required", "password must contain at least 6 characters", "password must contain no more then 16 characters"]}
            />
          </div>
          <div className={classes.settingsWrap}>
            <Typography className={classes.fieldName} color="primary">
              New Password 
            </Typography>
            <TextValidator
              label="*******"
              type="password"
              placeholder="e.g., secret"
              onChange={this.onChange("password")}
              onBlur={this.handleBlur}
              value={this.state.password}
              InputProps={showInput}
              disabled={!show}
              margin="none"
              name="password"
              ref="password"
              validators={["required", "minStringLength:6", "maxStringLength:16"]}
              errorMessages={["this field is required", "password must contain at least 6 characters", "password must contain no more then 16 characters"]}
            />
          </div>
          <div style={{ display: !show && "none" }} className={classes.btnGroup}>
            <Grow
              in={show}
              style={{ transformOrigin: '0 0 0' }}
            >
              <Button
                variant="outlined"
                color="secondary"
                size="medium"
                className={classes.transform}
                onClick={this.toggleFrom}
              >
                cancel
              </Button>
            </Grow>
            <Grow
              in={show}
              style={{ transformOrigin: '0 0 0' }}
              {...(show ? { timeout: 1000 } : {})}
            >
              <Button 
                color="secondary"
                size="medium"
                type="submit"
                className={classes.submitBtn}
              >
                Save Password
              </Button>
            </Grow>
          </div>
        </ValidatorForm>
      </div>
    )
  }
}

export default withStyles(styles)(ChangePassword)
