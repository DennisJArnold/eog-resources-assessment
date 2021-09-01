import { takeEvery, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { PayloadAction } from '@reduxjs/toolkit';
import { actions as MetricsActions, ApiErrorAction } from './MetricSlice';

function* apiErrorReceived(action: PayloadAction<ApiErrorAction>) {
  yield call(toast.error, `Error Received: ${action.payload.error}`);
}

export default function* watchApiError() {
  yield takeEvery(MetricsActions.metricsApiErrorRecieved.type, apiErrorReceived);
}
