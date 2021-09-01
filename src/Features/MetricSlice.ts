/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Measurement {
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
}

// Define the initial state using that type
const initialState: MetricState = {
  oilTemp: [],
  tubingPressure: [],
  waterTemp: [],
  casingPressure: [],
  injValveOpen: [],
  flareTemp: [],
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
    // getRecentMetrics: (state: MetricState) => (
    //   {
    //     oilTemp: state.oilTemp.slice(-1),
    //     tubingPressure: state.tubingPressure.slice(-1),
    //     waterTemp: state.waterTemp.slice(-1),
    //     casingPressure: state.casingPressure.slice(-1),
    //     injValveOpen: state.injValveOpen.slice(-1),
    //     flareTemp: state.flareTemp.slice(-1),
    //   }
    // ),
    metricsApiErrorRecieved: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});
export const actions = MetricSlice.actions;

export const { reducer } = MetricSlice;
