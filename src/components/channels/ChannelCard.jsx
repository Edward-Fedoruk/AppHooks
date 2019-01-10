import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import SettingsOutlined from '@material-ui/icons/SettingsOutlined'

const styles = () => ({
  card: {
    width: "270px",
    minHeight: "197px",
  },

  CardName: {
    fontFamily: "Lato",
    marginBottom: "40px",
    color: "#192B7F",
    fontWeight: "bold",
    fontSize: "14px"
  },

  stats: {
    fontFamily: "Lato",
    color: "#192B7F",
    marginBottom: "27px"
  },

  collaboration: {
    paddingLeft: "16px",
    paddingRight: "16px",
    color: "rgba(25, 43, 127, 0.2)",
    justifyContent: "space-between"
  },

  collaborators: {
    color: "rgba(25, 43, 127, 0.2)",
  }
})

const ChannelCard = ({ classes }) => {
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography 
            gutterBottom 
            variant="h5" 
            component="h5"
            className={classes.CardName}
          >
            My App #1
          </Typography>
          <Grid container>

            <Grid xs item>
              <Typography className={classes.stats} component="p">
                Total requests: <br />
                12312
              </Typography>
            </Grid>

            <Grid xs item>
              <Typography className={classes.stats} component="p">
                Peak connections: <br />
                3123321
              </Typography>
            </Grid>

          </Grid>
        </CardContent>
      </CardActionArea>
      
      <Divider variant="middle" />

      <CardActions className={classes.collaboration}>
        <Typography className={classes.collaborators}>
          No collaborators
        </Typography>
        <SettingsOutlined />
      </CardActions>
    </Card>
  )
}

ChannelCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChannelCard)
