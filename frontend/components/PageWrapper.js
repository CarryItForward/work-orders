import React from 'react'
import { useSelector } from 'react-redux'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles } from '@material-ui/core/styles'

import AppBar from '~/components/AppBar'
import LoadingOverlay from '~/components/LoadingOverlay'
import Login from '~/components/Login'

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  page: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1)',
  }
}))

export default function PageWrapper({ component }) {
  const classes = useStyles()

  const user = useSelector((state) => state.user)
  const loading = useSelector((state) => state.loading)
  const drawerOpen = useSelector((state) => state.drawerOpen)

  const theme = useTheme()
  const raisedDrawer = useMediaQuery(theme.breakpoints.down('md'))

  const pageStyle = {
    marginLeft: drawerOpen && !raisedDrawer ? theme.drawer.width : 0,
  }

  let _component
  if (user) {
    _component = (
      <>
        <AppBar raisedDrawer={raisedDrawer} />
        <div className={classes.page} style={pageStyle}>
          <div className={classes.toolbar} />
          {component}
        </div>
      </>
    )
  } else {
    _component = <Login />
  }

  return (
    <>
      <LoadingOverlay loading={loading} />
      {_component}
    </>
  )
}
