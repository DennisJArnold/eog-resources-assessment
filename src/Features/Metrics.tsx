import React, { useEffect } from 'react';
import {
  useSubscription,
  gql,
} from '@apollo/client';
import Card from '@material-ui/core/Card';
import CardHeader from '../components/CardHeader';

interface NewMeasurement {
  metric: string,
  value: number,
  unit: string
}

const METRIC_SUBSCRIPTION = gql`
subscription OnNewMeasurement{
  newMeasurement {
    metric
    at
    value
    unit
  }
}`;

const Metrics = () => {
  const result = useSubscription<NewMeasurement>(METRIC_SUBSCRIPTION);
  const { data, error } = result;

  useEffect(() => {
    if (error) console.log(error);
    if (data) console.log(data);
  }, [data, error]);

  return (
    <Card>
      <CardHeader title={JSON.stringify(data || error)} />
    </Card>
  );
};

export default Metrics;
