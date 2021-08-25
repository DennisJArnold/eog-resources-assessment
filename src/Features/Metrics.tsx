import React, { useEffect } from 'react';
import {
  useSubscription,
  gql,
} from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CurrentMetricCard from '../components/CurrentMetricCard';

interface Measurement {
  metric: string,
  value: number,
  at: number,
  unit: string,
}

const METRIC_SUBSCRIPTION = gql`
subscription OnNewMeasurement {
  newMeasurement {
    metric
    at
    value
    unit
  }
}`;

const oilTemp: Measurement[] = [];
const tubingPressure: Measurement[] = [];
const waterTemp: Measurement[] = [];
const casingPressure: Measurement[] = [];
const injValveOpen: Measurement[] = [];
const flareTemp: Measurement[] = [];
// const selected: string[] = ['Oil Temp', 'Tubing Pressure', 'Water Temp',
// 'Casing Pressure', 'Inj Valve Open', 'Flare Temp'];

const currentMetrics = {
  'Oil Temp': oilTemp[0],
  'Tubing Pressure': tubingPressure[0],
  'Water Temp': waterTemp[0],
  'Casing Pressure': casingPressure[0],
  'Inj Valve Open': injValveOpen[0],
  'Flare Temp': flareTemp[0],
};

const Metrics = () => {
  const result = useSubscription(METRIC_SUBSCRIPTION);
  const { data, error } = result;

  const updateCurrentMetrics = (newMeasurement: Measurement) => {
    switch (newMeasurement.metric) {
      case 'oilTemp':
        oilTemp.push(newMeasurement);
        currentMetrics['Oil Temp'] = newMeasurement;
        break;
      case 'tubingPressure':
        tubingPressure.push(newMeasurement);
        currentMetrics['Tubing Pressure'] = newMeasurement;
        break;
      case 'waterTemp':
        waterTemp.push(newMeasurement);
        currentMetrics['Water Temp'] = newMeasurement;
        break;
      case 'casingPressure':
        casingPressure.push(newMeasurement);
        currentMetrics['Casing Pressure'] = newMeasurement;
        break;
      case 'injValveOpen':
        injValveOpen.push(newMeasurement);
        currentMetrics['Inj Valve Open'] = newMeasurement;
        break;
      case 'flareTemp':
        flareTemp.push(newMeasurement);
        currentMetrics['Flare Temp'] = newMeasurement;
        break;
      default:
        console.log(newMeasurement.metric);
    }
    console.log(currentMetrics);
  };

  useEffect(() => {
    if (error) console.log(error);
    if (data) {
      updateCurrentMetrics(data.newMeasurement);
    }
  }, [data, error]);

  const useStyles = makeStyles({
    grid: {
      padding: '15px',
    },
  });

  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-around"
      alignItems="flex-start"
      className={classes.grid}
    >
      {currentMetrics['Oil Temp'] ? <CurrentMetricCard metric='Oil Temp' value={currentMetrics['Oil Temp'].value} unit={currentMetrics['Oil Temp'].unit} /> : null}
      {currentMetrics['Tubing Pressure'] ? <CurrentMetricCard metric='Tubing Pressure' value={currentMetrics['Tubing Pressure'].value} unit={currentMetrics['Tubing Pressure'].unit} /> : null}
      {currentMetrics['Water Temp'] ? <CurrentMetricCard metric='Water Temp' value={currentMetrics['Water Temp'].value} unit={currentMetrics['Water Temp'].unit} /> : null}
      {currentMetrics['Casing Pressure'] ? <CurrentMetricCard metric='Casing Pressure' value={currentMetrics['Casing Pressure'].value} unit={currentMetrics['Casing Pressure'].unit} /> : null}
      {currentMetrics['Inj Valve Open'] ? <CurrentMetricCard metric='Inj Valve Open' value={currentMetrics['Inj Valve Open'].value} unit={currentMetrics['Inj Valve Open'].unit} /> : null}
      {currentMetrics['Flare Temp'] ? <CurrentMetricCard metric='Flare Temp' value={currentMetrics['Flare Temp'].value} unit={currentMetrics['Flare Temp'].unit} /> : null}
    </Grid>
  );
};

export default Metrics;
