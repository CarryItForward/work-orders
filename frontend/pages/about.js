import React from 'react'
import Head from 'next/head'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export default function About() {
  const classes = useStyles()

  return (
    <>
      <Head>
        <title>About | Lifeline</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container component="main" className={classes.root}>
        <Typography component="h1" variant="h1">
          Welcome to the About page
        </Typography>
      </Grid>
    </>
  )
}
