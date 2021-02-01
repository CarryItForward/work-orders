import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { WorkOrders } from '../../components/WorkOrders'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: '100%',
    height: 'calc(100vh - 64px)',
  },
})

export default function WorkOrdersPage() {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <WorkOrders />
    </Paper>
  )
}
