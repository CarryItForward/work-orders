import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'
import { useCollectionSubscribe } from '../hooks/useCollectionSubscribe'
import { WorkOrder, WorkOrderItem } from '../types/types'
import { db } from '../utils/firebase'

const columns: (keyof WorkOrder)[] = ['created', 'person', 'status', 'notes', 'location', 'items']

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: '100%',
    height: 'calc(100vh - 64px)',
  },
  container: {
    maxHeight: '100%',
  },
})

interface WorkOrdersProps {
  personId?: string
}

export const WorkOrders: React.FC<WorkOrdersProps> = ({ personId }) => {
  const classes = useStyles()
  const workOrders = useCollectionSubscribe(db.workOrdersCollection())
  const people = useCollectionSubscribe(db.peopleCollection())
  const items = useCollectionSubscribe(db.itemsCollection())

  const makeItem = (workOrderItem: WorkOrderItem, key: string) => {
    const item = items.find((i) => i.id === workOrderItem.itemRef.id)
    if (!item) return null
    return (
      <li key={item?.id + key}>
        {item.name}: {workOrderItem.quantity}
      </li>
    )
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {workOrders
              .filter((order) => (personId ? personId === order.person.id : true)) // filter out the one person if a personId is passed in
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>{row.created.toDate().toLocaleDateString()}</TableCell>
                    <TableCell>{people.find((p) => p.id === row.person.id)?.name}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.notes}</TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell>
                      <ul>{row.items.map((item) => makeItem(item, row.id))}</ul>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
