/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ApiErrorAction = {
  error: string;
};
export interface Measurement {
  metric: string,
  value: number,
  at: number,
  unit: string,
}

interface MetricState {
  oilTemp: Measurement[],
  tubingPressure: Measurement[],
  waterTemp: Measurement[],
  casingPressure: Measurement[],
  injValveOpen: Measurement[],
  flareTemp: Measurement[],
  selected: string[],
}

const initialState: MetricState = {
  oilTemp: [],
  tubingPressure: [],
  waterTemp: [],
  casingPressure: [],
  injValveOpen: [],
  flareTemp: [],
  selected: ['oilTemp', 'tubingPressure', 'waterTemp', 'casingPressure', 'injValveOpen', 'flareTemp'],
};

export const MetricSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    updateCurrentMetrics: (state: MetricState, action: PayloadAction<Measurement>) => {
      switch (action.payload.metric) {
        case 'oilTemp':
          state.oilTemp = [...state.oilTemp, action.payload];
          if (state.oilTemp.length > 1800) state.oilTemp.shift();
          break;
        case 'tubingPressure':
          state.tubingPressure = [...state.tubingPressure, action.payload];
          if (state.tubingPressure.length > 1800) state.tubingPressure.shift();
          break;
        case 'waterTemp':
          state.waterTemp = [...state.waterTemp, action.payload];
          if (state.waterTemp.length > 1800) state.waterTemp.shift();
          break;
        case 'casingPressure':
          state.casingPressure = [...state.casingPressure, action.payload];
          if (state.casingPressure.length > 1800) state.casingPressure.shift();
          break;
        case 'injValveOpen':
          state.injValveOpen = [...state.injValveOpen, action.payload];
          if (state.injValveOpen.length > 1800) state.injValveOpen.shift();
          break;
        case 'flareTemp':
          state.flareTemp = [...state.flareTemp, action.payload];
          if (state.flareTemp.length > 1800) state.flareTemp.shift();
          break;
        default:
          console.log(action.payload.metric);
      }
    },
    getMetrics: (state:MetricState) => state,
    toggleSelectedMetric: (state: MetricState, action: PayloadAction<string>) => {
      if (!state.selected.includes(action.payload)) {
        state.selected = [...state.selected, action.payload];
      } else state.selected.splice(state.selected.indexOf(action.payload), 1);
    },
    apiErrorRecieved: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const selectMetrics = (state: any) => {
  const metrics = [];
  let key:keyof typeof state.metrics;
  for (key in state.metrics) {
    if (key !== 'selected' && state.metrics.selected.includes(key)) metrics.push(state.metrics[key]);
  }
  return metrics;
};

export const { reducer, actions } = MetricSlice;
