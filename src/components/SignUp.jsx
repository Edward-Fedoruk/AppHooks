import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  background: 'linear-gradient(180deg, #192B81 0%, #344DBC 100%)',
})

class SignUp extends Component {

  render() {
    const { styles } = this.props
    return (
      <div className={classes.}>
        
      </div>
    )
  }
}

export default withStyles(styles)(SignUp)