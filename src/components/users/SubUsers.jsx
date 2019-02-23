import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { compose } from "redux"
import { withStyles } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import UsersTable from "./UsersTable"
import withNavigation from "../withNavigation"
import TopBar from "../utils/TopBar"
import { fetchUsers } from "../../actions/subUsers"
import AddUser from "./AddUser"
import Preloader from "../Preloader"
import { createLoadingSelector } from "../../actions/utils"
import { createErrorMessageSelector } from "../../actions/utils"
import ErrorSnackbar from "../utils/ErrorSnackbar"
import SuccessSnackbar from "../utils/SuccessSnackbar"

const styles = ({ breakpoints }) => ({
  contentWrap: {
    padding: "20px 26px 20px 13px",

    [breakpoints.down(768)]: {
      padding: "20px 15px 5px 15px",
    },
    [breakpoints.down(600)]: {
      padding: "10px 0px 5px 0px",
    },
  },

  hint: {
    fontWeight: "300",
    fontSize: "14px",
  },
})

export class SubUsers extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string,
  }

  static defaultProps = {
    errorMessage: "Something went wrong.",
    successMessage: "Action was successful", 
  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    const {
      classes, users, isLoading, errorMessage, successMessage
    } = this.props
    return isLoading ? <Preloader /> : (
      <Fragment>
        <TopBar title="Sub-Users" />
        <div className={classes.contentWrap}>
          <ErrorSnackbar message={errorMessage} />
          <SuccessSnackbar message={successMessage} />
          <Typography gutterBottom className={classes.hint}>Sub-users can view an app’s stats, debug console, app settings and app keys.</Typography>
          <UsersTable data={users} />
          <AddUser />
        </div>
      </Fragment>
    )
  }
}

const loadingSelector = createLoadingSelector(["SET_USERS"])
const errorSelector = createErrorMessageSelector(["USER_ERROR"])

const mapStateToProps = ({
  users, preloader, errorHandler, view,
}) => ({
  users: users.users,
  isLoading: loadingSelector(preloader),
  errorMessage: errorSelector(errorHandler),
  successMessage: view.successMessage,
})

const mapDispatchToProps = {
  fetchUsers,
}

export default compose(
  withNavigation,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(SubUsers)
