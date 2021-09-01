/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Measurement {
  metric: string,
  value: number,
  at: number,
  unit: string,
}

// Define a type for the slice state
interface MetricState {
  oilTemp: Measurement[],
  tubingPressure: Measurement[],
  waterTemp: Measurement[],
  casingPressure: Measurement[],
  injValveOpen: Measurement[],
  flareTemp: Measurement[],
  selected: string[],
}

// Define the initial state using that type
const initialState: MetricState = {
  oilTemp: [],
  tubingPressure: [],
  waterTemp: [],
  casingPressure: [],
  injValveOpen: [],
  flareTemp: [],
  selected: ['oilTemp', 'tubingPressure', 'waterTemp', 'casingPressure', 'injValveOpen', 'flareTemp'],
};

export type ApiErrorAction = {
  error: string;
};

export const MetricSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    updateCurrentMetrics: (state: MetricState, action: PayloadAction<Measurement>) => {
      switch (action.payload.metric) {
        case 'oilTemp':
          state.oilTemp = [...state.oilTemp, action.payload];
          break;
        case 'tubingPressure':
          state.tubingPressure = [...state.tubingPressure, action.payload];
          break;
        case 'waterTemp':
          state.waterTemp = [...state.waterTemp, action.payload];
          break;
        case 'casingPressure':
          state.casingPressure = [...state.casingPressure, action.payload];
          break;
        case 'injValveOpen':
          state.injValveOpen = [...state.injValveOpen, action.payload];
          break;
        case 'flareTemp':
          state.flareTemp = [...state.flareTemp, action.payload];
          break;
        default:
          console.log(action.payload.metric);
      }
    },
    getMetrics: (state:MetricState) => state,
    toggleSelectedMetric: (state: MetricState, action: PayloadAction<string>) => {
      if (!state.selected.includes(action.payload)) state.selected = [...state.selected, action.payload];
      else state.selected.splice(state.selected.indexOf(action.payload), 1);
    }, 
    metricsApiErrorRecieved: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const selectMetrics = (state: any) => {
  let metrics = [];
  let key:keyof typeof state.metrics;
  for (key in state.metrics) {
    if (key !== 'selected' && state.metrics.selected.includes(key)) metrics.push(state.metrics[key]);
  }
  return metrics;
};

export const actions = MetricSlice.actions;

export const { reducer } = MetricSlice;
