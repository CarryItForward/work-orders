import React from 'react'
import { useSelector } from 'react-redux'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import AppBar from './AppBar'
import LoadingOverlay from './LoadingOverlay'
import Login from './Login'

export default function RequireAuth({ component }) {
  const user = useSelector((state) => state.user)
  const loading = useSelector((state) => state.loading)
  const drawerOpen = useSelector((state) => state.drawerOpen)

  const theme = useTheme()
  const raisedDrawer = useMediaQuery(theme.breakpoints.down('md'))

  const contentStyle = {
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1)',
    marginLeft: drawerOpen && !raisedDrawer ? theme.drawer.width : 0,
    opacity: drawerOpen && raisedDrawer ? 0.4 : 1,
  }

  let _component
  if (user) {
    _component = (
      <>
        <AppBar />

        <div style={contentStyle}>{component}</div>
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
