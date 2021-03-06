/* eslint-disable react/jsx-one-expression-per-line */
import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Divider from "@material-ui/core/Divider"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { compose } from "redux"
import Collaborators from "./Collaborators"
import AddSubuser from "./AddSubuser"

const styles = ({ breakpoints }) => ({
  card: {
    width: "290px",
    minHeight: "197px",
    display: "inline-block",
    marginRight: "3%",
    marginBottom: "3%",
  },

  CardName: {
    marginBottom: "9px",
    color: "#192B7F",
    fontWeight: "500",
    fontSize: "14px",

    [breakpoints.down(425)]: {
      padding: "25px 17px",
    },
  },

  stats: {
    color: "#192B7F",
    marginBottom: "27px",
  },

  cardContent: { paddingBottom: "0 !important" },
  statsTitle: { opacity: ".7" },

  collaboration: {
    paddingLeft: "20px",
    paddingRight: "16px",
    color: "rgba(25, 43, 127, 0.2)",
    justifyContent: "space-between",
  },

  collaborators: {
    color: "rgba(25, 43, 127, 0.2)",
    lineHeight: "34px",
    paddingLeft: "0px",
  },

  linkWrap: {
    textDecoration: "none",
  },
})

const ChannelCard = ({
  classes, appName,
  channelId, collaborators,
  statistics, firstStageId,
}) => (
  <Card className={classes.card}>
    <CardActionArea>
      <Link
        to={{ pathname: `channels/${channelId}/${firstStageId}` }}
        className={classes.linkWrap}
      >
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h5" className={classes.CardName}>
            { appName }
          </Typography>
          <Grid container>

            <Grid xs={6} item>
              <Typography className={classes.stats} component="p">
                <span className={classes.statsTitle}>Total requests:</span><br />{` ${statistics.total_requests} `}
              </Typography>
            </Grid>

            <Grid xs={6} item>
              <Typography className={classes.stats} component="p">
                <span className={classes.statsTitle}>Peak connections:</span><br />{` ${statistics.peak_connections} `}
              </Typography>
            </Grid>

            <Grid xs={6} item>
              <Typography className={classes.stats} component="p">
                <span className={classes.statsTitle}>Success requests:</span><br />{` ${statistics.success_requests} `}
              </Typography>
            </Grid>

            <Grid xs={6} item>
              <Typography className={classes.stats} component="p">
                <span className={classes.statsTitle}>Failed connections:</span><br />{` ${statistics.failed_requests} `}
              </Typography>
            </Grid>

          </Grid>
        </CardContent>
      </Link>
    </CardActionArea>

    <Divider variant="fullWidth" />

    <CardActions className={classes.collaboration}>
      {!collaborators.length
        ? <Typography className={classes.collaborators}>No collaborators</Typography>
        : <Collaborators channelId={channelId} collaborators={collaborators} />}
      <AddSubuser channelId={channelId} />
    </CardActions>
  </Card>
)

ChannelCard.propTypes = {
  classes: PropTypes.object.isRequired,
  channelId: PropTypes.number.isRequired,
  appName: PropTypes.string,
  firstStageId: PropTypes.number.isRequired,
  collaborators: PropTypes.arrayOf(PropTypes.object),
  statistics: PropTypes.shape({
    total_requests: PropTypes.number,
    success_requests: PropTypes.number,
    failed_requests: PropTypes.number,
    peak_connections: PropTypes.number,
  }),
}

ChannelCard.defaultProps = {
  appName: "",
  collaborators: [],
  statistics: {
    total_requests: 0,
    success_requests: 0,
    failed_requests: 0,
    peak_connections: 0,
  },
}

const mapStateToProps = ({ channelsEntities }, { channelId }) => {
  const {
    name, collaborators, statistics, stages,
  } = channelsEntities.entities.channels[channelId]

  const firstStageId = stages[0]
  return {
    appName: name, collaborators, statistics, channelId, firstStageId,
  }
}

const mapDispatchToProps = {

}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(ChannelCard)
