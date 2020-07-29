import React from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import HomeIcon from '@material-ui/icons/Home'
import InfoIcon from '@material-ui/icons/Info'

import * as firebase from 'firebase'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    flexShrink: 0,
  },
  drawerPaper: {
    ...theme.drawer,
  },
  drawerContainer: {
    overflow: 'auto',
  },
}))

export default function ButtonAppBar({ raisedDrawer }) {
  const classes = useStyles()
  const router = useRouter()

  const open = useSelector((state) => state.drawerOpen)

  const dispatch = useDispatch()

  const signOut = () => {
    firebase.auth().signOut()
  }

  const toggleDrawer = () => {
    dispatch({
      type: '@drawer/SET_OPEN',
      payload: !open,
    })
  }

  const paths = [
    {
      title: 'Home',
      icon: <HomeIcon />,
      onClick: () => router.push('/'),
    },
    {
      title: 'About',
      icon: <InfoIcon />,
      onClick: () => router.push('/about'),
    },
  ]

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={toggleDrawer}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Lifeline
          </Typography>
          <Button color="inherit" onClick={signOut}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant={raisedDrawer ? 'temporary' : 'persistent'}
        open={open}
        onClose={toggleDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Lifeline
          </Typography>
        </Toolbar>
        <div className={classes.drawerContainer}>
          <List>
            {paths.map((item, index) => (
              <ListItem button key={item.title} onClick={() => item.onClick() && (raisedDrawer && toggleDrawer())}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  )
}
