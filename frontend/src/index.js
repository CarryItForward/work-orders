import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';

import {
  BrowserRouter as Router,
} from "react-router-dom";

import * as firebase from 'firebase/app';
import 'firebase/auth';
import { FirebaseAuthProvider, } from '@react-firebase/auth';
import { config } from './config/firebase';

ReactDOM.render(
  <Router>
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </FirebaseAuthProvider>
  </Router>,
  document.querySelector('#root'),
);
