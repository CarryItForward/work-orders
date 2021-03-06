import AppBar from '@material-ui/core/AppBar'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import HomeIcon from '@material-ui/icons/Home'
import InfoIcon from '@material-ui/icons/Info'
import MenuIcon from '@material-ui/icons/Menu'
import PeopleIcon from '@material-ui/icons/People'
import WorkOrdersIcon from '@material-ui/icons/Work'
import firebase from 'firebase/app'
import 'firebase/auth'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LogoutIcon from '~/assets/logout.svg'

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

  const toggleDrawer = () => {
    dispatch({
      type: '@drawer/SET_OPEN',
      payload: !open,
    })
  }

  const sections = [
    [
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
      {
        title: 'People',
        icon: <PeopleIcon />,
        onClick: () => router.push('/people'),
      },
      {
        title: 'Work Orders',
        icon: <WorkOrdersIcon />,
        onClick: () => router.push('/orders'),
      },
    ],
    [
      {
        title: 'Logout',
        icon: <LogoutIcon />,
        onClick: () => firebase.auth().signOut(),
      },
    ],
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
          {sections.map((paths, index) => (
            <React.Fragment key={index}>
              <Divider />
              <List>
                {paths.map((item) => (
                  <ListItem
                    button
                    key={item.title}
                    onClick={() => item.onClick() && raisedDrawer && toggleDrawer()}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItem>
                ))}
              </List>
            </React.Fragment>
          ))}
        </div>
      </Drawer>
    </div>
  )
}
