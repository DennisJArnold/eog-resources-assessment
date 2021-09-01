import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MetricToggleButton from './MetricToggleButton';
// import Weather from '../Features/Weather/Weather';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
  buttonGrid: {
    padding: '15px',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
  },
});

export default () => {
  const classes = useStyles();

  const name = "Dennis Arnold's";
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          {name} EOG React Visualization Assessment
        </Typography>
        {/* <Weather /> */}
        <Grid container className={classes.buttonGrid}>
          <MetricToggleButton metric="oilTemp" />
          <MetricToggleButton metric="tubingPressure" />
          <MetricToggleButton metric="waterTemp" />
          <MetricToggleButton metric="casingPressure" />
          <MetricToggleButton metric="injValveOpen" />
          <MetricToggleButton metric="flareTemp" />
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
