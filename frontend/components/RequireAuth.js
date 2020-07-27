import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import AppBar from './AppBar'
import LoadingOverlay from './LoadingOverlay'
import Login from './Login'

export default function RequireAuth({ component }) {
  const user = useSelector(state => state.user)
  const loading = useSelector(state => state.loading)

  const drawerOpen = useSelector(state => state.drawerOpen)

  const contentStyle = {
    transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)',
    marginLeft: drawerOpen ? 256 : 0,
  };

  let _component
  if (user) {
    _component = (
      <>
        <AppBar />

        <div style={contentStyle}>
          {component}
        </div>
      </>
    )
  }
  if (!user) {
    _component = <Login />
  }

  return (
    <>
      <LoadingOverlay loading={loading} />
      {_component}
    </>
  )
}
