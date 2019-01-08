import React from 'react'
import GitHubLogin from 'react-github-login'
import GoogleLogin from 'react-google-login'
import { ReactComponent as GitHub} from "../../assets/GitHub.svg"
import { ReactComponent as Google} from "../../assets/Google.svg"
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const flexCenter = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const externalLogBtn = {
  ...flexCenter,
  width: "100%",
  borderRadius: "6px",
  boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.15)",
  color: "#fff",
  cursor: "pointer",
  height: "45px",
  fontFamily: "Roboto",
  fontSize: "16px",
  textTransform: "uppercase",
  fontWeight: "500"
}

const styles = () => ({
  gitHubBtn: {
    ...externalLogBtn,
    background: "linear-gradient(180deg, #303030 0%, #171717 100%)",
    marginBottom: "15px",
    border: "none",

    "&:focus": {
      border: "none",
      outline: "none"
    } 
  },

  googleBtn: {
    ...externalLogBtn,
    borderRadius: "6px !important",
    boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.15) !important",
    color: "#fff !important",
    fontSize: "16px !important",
    background: "linear-gradient(180deg, #00A1F1 0%, #4285F4 100%)",
    marginBottom: "40px"
  },

  buttonsIcon: {
    marginRight: "10px"
  },
})

const SocialAuthentication = ({ classes, onSuccess, onFailure, text }) => (
  <React.Fragment>
    <GitHubLogin 
      className={classes.gitHubBtn}
      onSuccess={onSuccess}
      onFailure={onFailure}
      clientId="ece43ff6f0052f0666c4"
    >
      <GitHub className={classes.buttonsIcon}/>
      { text } with github
    </GitHubLogin>

    <GoogleLogin 
      className={classes.googleBtn}
      icon={false}
      disabledStyle={{}}
      onSuccess={onSuccess}
      onFailure={onFailure}
      style={{}}
      clientId="618395372364-bfhsfau7jtp6tocvjim89je1o98r6ve0.apps.googleusercontent.com"
    >
      <div className={classes.flexCenter}>
        <Google className={classes.buttonsIcon}/>
        { text } with Google
      </div>
    </GoogleLogin>
  </React.Fragment>
)

SocialAuthentication.propTypes = {
  onSuccess: PropTypes.func.isRequired, 
  onFailure: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

export default withStyles(styles)(SocialAuthentication)
