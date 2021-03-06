import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSubscription,
  gql,
} from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import CurrentMetricCard from '../components/CurrentMetricCard';
import Graph from '../components/Graph';
import { actions, selectMetrics } from './MetricSlice';

const METRIC_SUBSCRIPTION = gql`
subscription OnNewMeasurement {
  newMeasurement {
    metric
    at
    value
    unit
  }
}`;

const Metrics = () => {
  const dispatch = useDispatch();
  const result = useSubscription(METRIC_SUBSCRIPTION);
  const { data, error, loading } = result;
  const currentMetrics = useSelector(selectMetrics);
  useEffect(() => {
    if (error) {
      dispatch(actions.apiErrorRecieved({ error: error.message }));
      return;
    }
    if (data) {
      dispatch(actions.updateCurrentMetrics(data.newMeasurement));
    }
  }, [dispatch, data, error]);

  const useStyles = makeStyles({
    grid: {
      padding: '15px',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'flex-start',
    },
  });

  const classes = useStyles();

  if (loading) {
    return (
      <LinearProgress />
    );
  }
  return (
    <Grid>
      <Grid
        container
        className={classes.grid}
      >
        {
          currentMetrics.map(metric => {
            if (!metric.length) return null;
            const recentMetric = metric[metric.length - 1];
            return (
              <CurrentMetricCard
                metric={recentMetric.metric}
                key={recentMetric.metric}
                value={recentMetric.value}
                unit={recentMetric.unit}
              />
            );
          })
        }
      </Grid>
      <Graph />
    </Grid>
  );
};

export default Metrics;
