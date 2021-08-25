import React, { useEffect } from 'react';
import {
  useSubscription,
  gql,
} from '@apollo/client';
import Card from '@material-ui/core/Card';
import CardHeader from '../components/CardHeader';

interface Measurement {
  metric: string,
  value: number,
  at: number,
  unit: string
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
const selected: string[] = [];

const currentMetrics = {
  oilTemp,
  tubingPressure,
  waterTemp,
  casingPressure,
  injValveOpen,
  flareTemp,
  selected,
};

const Metrics = () => {
  const result = useSubscription(METRIC_SUBSCRIPTION);
  const { data, error } = result;

  const updateCurrentMetrics = (newMeasurement: Measurement) => {
    console.log(newMeasurement);
    console.log(newMeasurement.metric);
    switch (newMeasurement.metric) {
      case 'oilTemp':
        oilTemp.push(newMeasurement);
        break;
      case 'tubingPressure':
        tubingPressure.push(newMeasurement);
        break;
      case 'waterTemp':
        waterTemp.push(newMeasurement);
        break;
      case 'casingPressure':
        casingPressure.push(newMeasurement);
        break;
      case 'injValveOpen':
        injValveOpen.push(newMeasurement);
        break;
      case 'flareTemp':
        flareTemp.push(newMeasurement);
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

  return (
    <Card>
      <CardHeader title='Oil Temp' />
      <ul>
        {oilTemp.map((measurement) => <li>{measurement.value}</li>)}
      </ul>

    </Card>
  );
};

export default Metrics;
