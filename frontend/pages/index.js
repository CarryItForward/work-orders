import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

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

export default function Home() {
  const classes = useStyles()
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Home | Lifeline</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid container component="main" className={classes.root}>
        <Typography component="h1" variant="h1">
          Welcome
        </Typography>
      </Grid>
    </>
  )
}
