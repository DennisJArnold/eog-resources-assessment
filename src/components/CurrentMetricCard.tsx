import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from './CardHeader';

type Props = {
  metric: string,
  value: number,
  unit: string,
};

const useStyles = makeStyles({
  card: {
    width: '200px',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
  },
  values: {
    display: 'block',
  },
});

const CurrentMetricCard = ({ metric, value, unit }: Props) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader title={metric} className={classes.card} />
      <CardContent className={classes.content}>
        <Typography className={classes.values}>{value} </Typography>
        <Typography variant='caption'>{unit} </Typography>
      </CardContent>
    </Card>
  );
};
export default CurrentMetricCard;
