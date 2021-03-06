import React from 'react'
import Head from 'next/head'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
}))

export default function Home() {
  const classes = useStyles()

  return (
    <>
      <Head>
        <title>Home | Lifeline</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid container component="main" className={classes.root}>
        <Grid item sm={12} md={4} className={classes.text}>
          <Typography component="h1" variant="h1">
            Hello
          </Typography>
        </Grid>
        <Grid item sm={12} md={4} className={classes.text}>
          <Typography component="h1" variant="h1">
            Bonjour
          </Typography>
        </Grid>
        <Grid item sm={12} md={4} className={classes.text}>
          <Typography component="h1" variant="h1">
            Hola
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}
