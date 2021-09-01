/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSubscription,
  gql,
} from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import CurrentMetricCard from '../components/CurrentMetricCard';
import Graph from '../components/Graph';
import { actions, reducer, selectMetrics } from './MetricSlice';

const METRIC_SUBSCRIPTION = gql`
subscription OnNewMeasurement {
  newMeasurement {
    metric
    at
    value
    unit
  }
}`;

// const HISTORIC_METRICS = gql`
// query
// getHistoricMeasurements($historicQuery: MeasurementQuery!){
//   getMeasurements(input: $historicQuery)
//     {
//         metric
//         at
//         value
//         unit
//     }
// }
// `;

// const minutesToSubtract = 30;
// const currentDate = new Date();
// const initialTimestamp = currentDate.getTime() - minutesToSubtract * 60000;

const Metrics = () => {
  // const getHistoricMetrics = (name: string) => {
  //   const query: MeasurementQuery = {
  //     metricName: name,
  //     after: initialTimestamp,
  //   };
  //   const { data, loading, error } = useQuery(HISTORIC_METRICS, {
  //     variables: { historicQuery: query },
  //   });
  //   if (error) console.log(error);
  //   if (loading) return [];
  //   return data.getMeasurements;
  // };

  const dispatch = useDispatch();
  const result = useSubscription(METRIC_SUBSCRIPTION);
  const { data, error, loading } = result;
  const currentMetrics = useSelector(selectMetrics);
  useEffect(() => {
    if (error) console.log(error);
    if (data) {
      dispatch(actions.updateCurrentMetrics(data.newMeasurement));
    }
  }, [dispatch, data, error]);

  const useStyles = makeStyles({
    grid: {
      padding: '15px',
      flexDirection: 'row',
    },
  });

  const classes = useStyles();


  if (loading) return (
    <LinearProgress />
  )
  return (
    <Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-around"
        alignItems="flex-start"
        className={classes.grid}
      >
        {
          currentMetrics.map(metric => {
            if(!metric.length) return null;
            let recentMetric = metric[metric.length - 1];
            return (
              <CurrentMetricCard metric={recentMetric.metric} key={recentMetric.metric} value={recentMetric.value} unit={recentMetric.unit} />
            )
          })
        }
      </Grid>
      <Graph />
    </Grid>
  );
};

export default Metrics;
