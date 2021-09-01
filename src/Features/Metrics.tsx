/* eslint-disable */
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
import { actions, reducer, selectMetrics } from './MetricSlice';

// interface Measurement {
//   metric: string,
//   value: number,
//   at: number,
//   unit: string,
// }

// interface MeasurementQuery {
//   metricName: string,
//   after?: number,
//   before?: number,
// }

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
    },
  });

  const classes = useStyles();


  if (loading) return (
    <LinearProgress />
  )
  console.log(currentMetrics);
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-around"
      alignItems="flex-start"
      className={classes.grid}
    >
      {
        currentMetrics.map(metric => {
          let recentMetric = metric[metric.length - 1];
          console.log(recentMetric);
          return (
            <CurrentMetricCard metric={recentMetric.metric} value={recentMetric.value} unit={recentMetric.unit} />
          )
        })
      }
      {/* {currentMetrics.oilTemp ? <CurrentMetricCard metric='Oil Temp' value={currentMetrics['Oil Temp'].value} unit={currentMetrics['Oil Temp'].unit} /> : null}
      {currentMetrics.tubingPressure ? <CurrentMetricCard metric='Tubing Pressure' value={currentMetrics['Tubing Pressure'].value} unit={currentMetrics['Tubing Pressure'].unit} /> : null}
      {currentMetrics.waterTemp ? <CurrentMetricCard metric='Water Temp' value={currentMetrics['Water Temp'].value} unit={currentMetrics['Water Temp'].unit} /> : null}
      {currentMetrics.casingPressure ? <CurrentMetricCard metric='Casing Pressure' value={currentMetrics['Casing Pressure'].value} unit={currentMetrics['Casing Pressure'].unit} /> : null}
      {currentMetrics.injValveOpen ? <CurrentMetricCard metric='Inj Valve Open' value={currentMetrics['Inj Valve Open'].value} unit={currentMetrics['Inj Valve Open'].unit} /> : null}
      {currentMetrics.flareTemp ? <CurrentMetricCard metric='Flare Temp' value={currentMetrics['Flare Temp'].value} unit={currentMetrics['Flare Temp'].unit} /> : null} */}
    </Grid>
  );
};

export default Metrics;
