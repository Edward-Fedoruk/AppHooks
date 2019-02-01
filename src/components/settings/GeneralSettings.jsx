import React, { Component } from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import Create from "@material-ui/icons/CreateOutlined"
import Grow from "@material-ui/core/Grow"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"


const styles = ({ palette, breakpoints }) => ({
  settingsWrap: {
    display: "flex",
    flexWrap: "wrap",
 
    [breakpoints.down(425)]: {
      backgroundColor: "#fff",
      display: "block",
      padding: "20px 0 20px 20px",
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

  field: { fontSize: "14px" },

  fieldWrap: { 
    marginRight: "80px",

    [breakpoints.down(600)]: {
      marginTop: "20px",
    },
  },

  aboveField: {
    color: "rgba(25, 43, 127, 0.7)",
    fontSize: "14px"
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

  transform: { textTransform: "capitalize" },
  underline: { "&::before, &::after": {display: "none"} },
  disabled: { color: palette.primary.main },
  disabledLabel: { display: "none" },

  contentWrap: { 
    marginBottom: "20px", 
    transition: ".25s margin linear",
    position: "relative",
  }
})

class GeneralSettings extends Component {
  state = {
    show: false,
    name: "Jonathan Smith",
    email: "ed.fedorukk@gmail.com",
    phone: "+380992378587"
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
            General settings
          </Typography>
          <IconButton onClick={this.toggleFrom}>
            <Create/>
          </IconButton>
        </div>
        <ValidatorForm onSubmit={this.onSubmit} instantValidate={false}>
          <div className={classes.settingsWrap}>
            <div className={classes.fieldWrap}>
              <TextValidator 
                label="Name"
                name="name"
                ref="name"
                placeholder="e.g., carl@cloud.ci"
                disabled={!show}
                onBlur={this.handleBlur}
                onChange={this.onChange("name")}
                value={this.state.name}  
                InputProps={showInput}
              />
            </div>

            <div className={classes.fieldWrap}>
              <TextValidator 
                label="Email"
                name="email"
                ref="email"
                placeholder="e.g., carl@cloud.ci"
                disabled={!show}
                InputProps={showInput}
                value={this.state.email} 
                onChange={this.onChange("email")}
                validators={["required", "isEmail"]}
                errorMessages={["this field is required", "email is not valid"]}
              />
            </div>

            <div className={classes.fieldWrap}>
              <TextValidator 
                label="Phone number"
                name="phone"
                ref="phone"
                placeholder="e.g., carl@cloud.ci"
                disabled={!show}
                InputProps={showInput}
                value={this.state.phone}
                onChange={this.onChange("phone")}
                InputLabelProps
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
            </div>
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
                Update General Settings
              </Button>
            </Grow>
          </div>
        </ValidatorForm>
      </div>
    )
  }
}

GeneralSettings.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(GeneralSettings)
