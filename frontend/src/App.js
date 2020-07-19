import React, { useState, useEffect } from 'react'

import * as firebase from 'firebase/app';

import LoadingOverlay from './components/LoadingOverlay'
import Router from './components/Router'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(authUser => {
      console.log(authUser)
      setLoading(false)
    })
  }, [])

  return (
    <>
      <LoadingOverlay loading={loading} />
      <Router />
    </>
  )
}
