import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { useDispatch } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../config/theme'

import * as firebase from 'firebase/app'
import 'firebase/auth'
import { FirebaseAuthProvider } from '@react-firebase/auth'
import { config } from '../config/firebase'
import RequireAuth from '../components/RequireAuth'

import { wrapper } from '../store'

function App({ Component, pageProps }) {
  const dispatch = useDispatch()

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authUser) => {
      dispatch({
        type: '@user/SET_USER',
        payload: authUser,
      })
    })
  }, [])

  return (
    <>
      <Head>
        <title>Lifeline</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <FirebaseAuthProvider {...config} firebase={firebase}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RequireAuth component={<Component {...pageProps} />} />
        </ThemeProvider>
      </FirebaseAuthProvider>
    </>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default wrapper.withRedux(App)
