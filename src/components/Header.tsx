import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import MetricToggleButton from './MetricToggleButton';
// import Weather from '../Features/Weather/Weather';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
});

export default () => {
  const classes = useStyles();

  const name = "dennisarnold's";
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          {name} EOG React Visualization Assessment
        </Typography>
        {/* <Weather /> */}
        <MetricToggleButton metric="oilTemp" />
        <MetricToggleButton metric="tubingPressure" />
        <MetricToggleButton metric="waterTemp" />
        <MetricToggleButton metric="casingPressure" />
        <MetricToggleButton metric="injValveOpen" />
        <MetricToggleButton metric="flareTemp" />
      </Toolbar>
    </AppBar>
  );
};
