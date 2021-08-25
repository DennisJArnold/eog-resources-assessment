import React from 'react';
import { ToastContainer } from 'react-toastify';
// import {
//   ApolloClient,
//   ApolloProvider,
//   useSubscription,
//   gql,
//   InMemoryCache,
// } from '@apollo/client';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
// import NowWhat from './components/NowWhat';
import Metrics from './Features/Metrics';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Wrapper>
      <Header />
      <Metrics />
      {/* <NowWhat /> */}
      <ToastContainer />
    </Wrapper>
  </MuiThemeProvider>
);

export default App;