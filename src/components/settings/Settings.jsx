/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { compose } from "redux"
import { withStyles } from "@material-ui/core"
import withNavigation from "../withNavigation"
import TopBar from "../utils/TopBar"
import GeneralSettings from "./GeneralSettings"
import ChangePassword from "./ChangePassword"
import ConnectedAccounts from "./ConnectedAccounts"
import DeleteAccount from "./DeleteAccount"
import { deleteAccount } from "../../actions/user"
import ErrorSnackbar from "../utils/ErrorSnackbar"
import ConfirmDialog from "../ConfirmDialog"

const styles = ({ breakpoints }) => ({
  contentWrap: {
    padding: "27px 26px 20px 48px",

    [breakpoints.down(425)]: {
      padding: "27px 0 0 0",
    },
  },

})

export class Settings extends Component {
  state = {
    open: false,
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    error: PropTypes.object,
  }

  static defaultProps = {
    error: { message: "" },
  }

  handleCloseWithAction = () => {
    this.props.deleteAccount()
    this.toggleDialog()
  }

  toggleDialog = () => this.setState(({ open }) => ({ open: !open }))

  render() {
    const { classes, settings, error } = this.props
    return (
      <Fragment>
        <ErrorSnackbar message={error.message} />

        <ConfirmDialog
          open={this.state.open}
          handleCloseWithAction={this.handleCloseWithAction}
          handleClose={this.toggleDialog}
          title="Delete your account"
        >
          Are you sure you want to delete your account? It can`t be undone
        </ConfirmDialog>

        <TopBar title="Account Settings" />
        <div className={classes.contentWrap}>
          <GeneralSettings
            company={settings.company}
            name={settings.name}
            phone={settings.phone}
          />
          <ChangePassword />
          <ConnectedAccounts />
          <DeleteAccount openDialog={this.toggleDialog} />
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ userSettings }) => ({
  settings: userSettings.settings,
  error: userSettings.error,
})

const mapDispatchToProps = {
  deleteAccount,
}

export default compose(
  withNavigation,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Settings)
