/* eslint-disable react/prefer-stateless-function */
import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Paper from "@material-ui/core/Paper"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core"
import ArrowBack from "@material-ui/icons/ArrowBack"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Drawer from "@material-ui/core/Drawer"
import { ReactComponent as LogoIcon } from "../../assets/BlueLogoIcon.svg"
import { toggleshortcutPanel } from "../../actions/ui"
import CreateRuleForm from "../webhooks/CreateRuleForm"
import FormDrawer from "../FormDrawer"
import AddUser from "../users/AddUser"
import Snackbar from "../utils/Snackbar"
import SnackbarContent from "../utils/SnackbarContent"
import { createErrorMessageSelector } from "../../actions/utils"
import { toggleSnackbar, toggleSuccessSnackbar } from "../../actions/ui"

const styles = ({ palette }) => ({
  panel: {
    width: "250px",
    display: "flex",
    height: "100%",
  },

  appName: {
    color: palette.primary.dark,
    fontSize: "28px",
    fontWeight: "300",

    paddingBottom: "30px",
    paddingLeft: "21px",
    paddingTop: "12px",
  },

  itemText: {
    color: palette.primary.dark,
    paddingLeft: "5px",
  },

  addUser: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "max-content",
    height: "80vh",
    margin: "auto",
  },

  leftPanel: {
    width: "20%",
    paddingLeft: "5px",
  },

  rightPanel: {
    width: "80%",
  },

  logoIcon: { width: "100%" },
  backArrow: { color: palette.primary.dark },
  backArrowWrap: { marginTop: "15px" },

})

export class ShortCutPanel extends Component {
  state = {
    createRule: false,
    addUser: false,
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    toggleshortcutPanel: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string,
    errorSnackbar: PropTypes.bool.isRequired,
    successSnackbar: PropTypes.bool.isRequired,
    toggleErrorSnackbar: PropTypes.func.isRequired,
    toggleSuccessSnackbar: PropTypes.func.isRequired,
  }

  static defaultProps = {
    errorMessage: "Something went wrong",
    successMessage: "Action was successful",
  }

  toggleForm = formName => () => this.setState(state => ({ [formName]: !state[formName] }))

  render() {
    const {
      classes, toggleshortcutPanel, open,
      errorMessage, successMessage, errorSnackbar,
      successSnackbar, toggleErrorSnackbar,
      toggleSuccessSnackbar,
    } = this.props
    return (
      <Fragment>
        <Snackbar open={errorSnackbar} onClose={toggleErrorSnackbar}>
          <SnackbarContent variant="error" message={errorMessage} />
        </Snackbar>

        <Snackbar open={successSnackbar} onClose={toggleSuccessSnackbar}>
          <SnackbarContent variant="success" message={successMessage} />
        </Snackbar>

        <FormDrawer open={this.state.createRule} toggleDialog={this.toggleForm("createRule")}>
          <CreateRuleForm />
        </FormDrawer>

        <FormDrawer open={this.state.addUser} toggleDialog={this.toggleForm("addUser")}>
          <AddUser className={classes.addUser} />
        </FormDrawer>

        <Drawer variant="temporary" open={open} onClose={toggleshortcutPanel}>
          <Paper className={classes.panel}>
            <div className={classes.leftPanel}>
              <LogoIcon className={classes.logoIcon} />
              <IconButton onClick={toggleshortcutPanel} className={classes.backArrowWrap}>
                <ArrowBack className={classes.backArrow} />
              </IconButton>
            </div>
            <div className={classes.rightPanel}>
              <Typography align="left" component="h1" className={classes.appName}>Apphooks</Typography>
              <List>
                <ListItem className={classes.item} button>
                  <ListItemText
                    classes={{ root: classes.itemText }}
                    primaryTypographyProps={{ className: classes.itemText }}
                    primary="Create Channel App"
                  />
                </ListItem>
                <ListItem onClick={this.toggleForm("createRule")} className={classes.item} button>
                  <ListItemText
                    classes={{ root: classes.itemText }}
                    primaryTypographyProps={{ className: classes.itemText }}
                    primary="Create Rule"
                  />
                </ListItem>
                <ListItem onClick={this.toggleForm("addUser")} className={classes.item} button>
                  <ListItemText
                    classes={{ root: classes.itemText }}
                    primaryTypographyProps={{ className: classes.itemText }}
                    primary="Add Sub-User"
                  />
                </ListItem>
              </List>
            </div>
          </Paper>
        </Drawer>
      </Fragment>
    )
  }
}

const errorSelector = createErrorMessageSelector(["SET_RULES", "USER_ERROR"])

const mapStateToProps = ({ view, errorHandler }) => ({
  open: view.shortcutPanel,
  errorMessage: errorSelector(errorHandler),
  successMessage: view.successMessage,
  errorSnackbar: view.shortcutPanel && view.snackbar,
  successSnackbar: view.shortcutPanel && view.successSnackbar,
})

const mapDispatchToProps = dispatch => ({
  toggleshortcutPanel: () => dispatch(toggleshortcutPanel()),
  toggleErrorSnackbar: () => dispatch(toggleSnackbar()),
  toggleSuccessSnackbar: () => dispatch(toggleSuccessSnackbar("")),
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ShortCutPanel))
