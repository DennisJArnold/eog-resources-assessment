import React from 'react';
import { useDispatch } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { actions } from '../Features/MetricSlice';

type Props = {
  metric: string,
};

const MetricToggleButton = ({ metric }: Props) => {
  const dispatch = useDispatch();
  const toggleSelection = (selection: string) => {
    console.log('ATTEMPTING TO TOGGLE!');
    console.log(selection);
    dispatch(actions.toggleSelectedMetric(selection));
  };

  return <Button variant="outlined" color="secondary" onClick={() => toggleSelection(metric)}>{metric}</Button>;
};

export default MetricToggleButton;
