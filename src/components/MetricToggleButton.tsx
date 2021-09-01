import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { actions } from '../Features/MetricSlice';

type Props = {
  metric: string,
};

const MetricToggleButton = ({ metric }: Props) => {
  const dispatch = useDispatch();
  const toggleSelection = (selection: string) => {
    dispatch(actions.toggleSelectedMetric(selection));
  };

  return <Button variant="contained" color="secondary" onClick={() => toggleSelection(metric)}>{metric}</Button>;
};

export default MetricToggleButton;
