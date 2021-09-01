/* eslint-disable */
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';
import { selectMetrics } from '../Features/MetricSlice';
import { Measurement } from '../Features/MetricSlice';
import moment from 'moment';

const colors = ['black', 'blue', 'orange', 'yellow', 'red', 'forestgreen'];

const Graph = () => {
  const data = useSelector(selectMetrics);
  const currentTime = new Date().getTime();
  const pastLimit = currentTime - 30 * 60000;

  return (
    <ResponsiveContainer width={"100%"} height={800}>
      <LineChart width={900} height={700}>
          <XAxis dataKey="at" name="time" domain={[pastLimit, currentTime]} tickFormatter={(timeStamp) => moment(timeStamp).format('HH:mm')} type="number" tickCount={30} />
          <Tooltip labelFormatter={(timeStamp) => moment(timeStamp).format('HH:mm:ss')}/>
          <Legend verticalAlign="top" />
          {data.map((metric: Measurement[]) => {
            if(metric.length < 1) return null;
            else return <YAxis 
              dataKey="value" 
              key={metric[0].metric} 
              yAxisId={metric[0].metric} 
              width={0} 
              label={{value: metric[0].unit, position: 'left'}} 
              type="number" 
            />
          }
          )}
          <YAxis hide={false} type="number" domain={[0, 'dataMax']} tickLine={true} tickCount={10}/>
          {data.map((metric: Measurement[], i) => {
            if(metric.length < 1) return null;
            return <Line dataKey="value" data={metric} name={metric[0].metric} key={metric[0].metric} stroke={colors[i]}/>
          }
          )}
      </LineChart>
    </ResponsiveContainer>
);

}

export default Graph;