import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from './CardHeader';

type Props = {
  metric: string,
  value: number,
  unit: string,
};

const CurrentMetricCard = ({ metric, value, unit }: Props) => (
  <Card>
    <CardHeader title={metric} />
    <CardContent>
      <Typography>{value} </Typography>
      <Typography>{unit} </Typography>
    </CardContent>
  </Card>
);

export default CurrentMetricCard;
