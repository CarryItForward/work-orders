import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles'
import { useCollectionSubscribe } from '../../hooks/useCollectionSubscribe'
import { WorkOrderItem } from '../../types/types'
import { db } from '../../utils/firebase'

const filter = createFilterOptions()

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    margin: '10px auto',
    width: '50%',
    minWidth: 275,
    height: 'calc(100vh - 84px)',
  },
  pageHeader: {
    textAlign: 'center',
  },
  input: {
    marginTop: 8,
    marginBottom: 8,
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
  },
  selectedItem: {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    marginTop: 8,
    marginBottom: 8,
  },
  itemName: {
    marginLeft: 15,
  },
  itemQuantity: {
    marginLeft: 'auto',
    width: 120,
  },
  deleteIcon: {
    marginLeft: 15,
  },
})

function SelectedItem({ name, quantity, onQuantityChange, onDiscard }) {
  const classes = useStyles()

  return (
    <Paper className={classes.selectedItem}>
      <Typography className={classes.itemName}>{name}</Typography>
      <TextField
        className={classes.itemQuantity}
        label="Quantity"
        type="number"
        variant="outlined"
        value={quantity}
        InputProps={{
          inputProps: { min: 1, max: 100 },
        }}
      />
      <IconButton className={classes.deleteIcon} onClick={onDiscard}>
        <DeleteIcon />
      </IconButton>
    </Paper>
  )
}

export default function ViewOrder() {
  const router = useRouter()
  const { orderId } = router.query

  const [order, setOrder] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])
  const [location, setLocation] = useState('')
  const [notes, setNotes] = useState('')

  const classes = useStyles()

  useEffect(() => {
    async function getOrder(orderId: string) {
      const orderDoc = await db.workOrdersCollection().doc(orderId).get()
      const order = await orderDoc.data().populate()

      setOrder(order)

      setSelectedUser(order.person)
      setSelectedItems(order.items)
      setLocation(order.location)
      setNotes(order.notes)
    }

    getOrder(orderId as string)
  }, [orderId])

  const people = useCollectionSubscribe(db.peopleCollection())
  const items = useCollectionSubscribe(db.itemsCollection()).map((i) => i.toWorkOrderItem())

  // TODO: switch to a <Loading /> component
  if (!order) return 'Loading...'

  return (
    <>
      <Head>
        <title>New Order | Lifeline</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container component="main" className={classes.root}>
        <Typography component="h2" variant="h2" className={classes.pageHeader}>
          View Order {orderId}
        </Typography>

        <Autocomplete
          className={classes.input}
          options={people}
          value={selectedUser}
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.name}
          onChange={(event, value) => setSelectedUser(value)}
          renderInput={(params) => <TextField {...params} label="Person" variant="outlined" />}
        />

        {selectedUser && (
          <TextField
            className={classes.input}
            label="Phone Number"
            variant="outlined"
            value={selectedUser.phone_number}
            disabled
          />
        )}

        <Divider className={classes.divider} />

        <Autocomplete
          key={selectedItems.length}
          className={classes.input}
          options={items}
          getOptionSelected={(option, value) => option.item.name === value.item.name}
          getOptionLabel={(option) => option.item.filterName || option.item.name}
          onChange={(event, value) => setSelectedItems([value, ...selectedItems])}
          renderInput={(params) => <TextField {...params} label="Item" variant="outlined" />}
          filterOptions={(options, params) => {
            const filtered = filter(options, params)

            if (
              params.inputValue !== '' &&
              !filtered.find((i: WorkOrderItem) => i.item.name === params.inputValue)
            ) {
              filtered.push({
                filterName: `Add "${params.inputValue}"`,
                cost: 0,
                name: params.inputValue,
                id: `add ${params.inputValue}`,
              })
            }

            return filtered.filter(
              (i: WorkOrderItem) => !selectedItems.find((n) => i.item.name === n.item.name)
            ) as WorkOrderItem[]
          }}
        />

        {selectedItems.map((i, idx) => (
          <SelectedItem
            key={idx}
            name={i.item.name}
            quantity={i.quantity}
            onQuantityChange={() => {}}
            onDiscard={() => {
              selectedItems.splice(idx, 1)
              setSelectedItems([...selectedItems])
            }}
          />
        ))}

        <Divider className={classes.divider} />

        <TextField
          className={classes.input}
          label="Meeting Location"
          variant="outlined"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />

        <TextField
          className={classes.input}
          label="Notes"
          multiline
          rows={4}
          variant="outlined"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </Grid>
    </>
  )
}
