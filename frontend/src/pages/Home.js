import React from 'react'

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Typography component="h1" variant="h1">
        Welcome
      </Typography>
    </Grid>
  )
}
