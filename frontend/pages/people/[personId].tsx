import { Grid, makeStyles, Typography } from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import React from 'react'
import { WorkOrders } from '../../components/WorkOrders'
import { useDocSubscribe } from '../../hooks/useCollectionSubscribe'
import { db } from '../../utils/firebase'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: '100%',
    height: 'calc(100vh - 64px)',
  },
  pageHeader: {
    textAlign: 'center',
  },
  container: {
    maxHeight: '100%',
  },
})

const PersonPage: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const { personId } = router.query

  const person = useDocSubscribe(db.peopleCollection().doc(personId as string))

  return (
    <>
      <Head>
        <title>{person.name} | Lifeline</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container component="main" className={classes.root}>
        <Typography component="h1" variant="h2" className={classes.pageHeader}>
          {person.name}
        </Typography>
      </Grid>
      <Typography variant="h2">Work Orders</Typography>
      <WorkOrders personId={person.id} />
    </>
  )
}

export default PersonPage
