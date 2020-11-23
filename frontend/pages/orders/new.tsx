import React, { useState, useEffect } from 'react'
import Head from 'next/head'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles'
import { useCollectionSubscribe } from '../../hooks/useCollectionSubscribe'
import { Item } from '../../types/types'
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
    height: 'calc(100vh - 84px)'
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
});

function SelectedItem({ name, quantity, onQuantityChange, onDiscard }) {
  const classes = useStyles();

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

export default function NewOrder() {
  const [userType, setUserType] = useState('existing')
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const classes = useStyles();

  useEffect(() => {
    setName(selectedUser ? selectedUser.name : '')
    setPhone(selectedUser ? selectedUser.phoneNumber : '')
  }, [selectedUser])

  useEffect(() => {
    if (userType === 'existing' && selectedUser) {
      setName(selectedUser.name)
      setPhone(selectedUser.phoneNumber)
    } else {
      setName('')
      setPhone('')
    }
  }, [userType])

  const people = useCollectionSubscribe(db.peopleCollection())
  const items = useCollectionSubscribe(db.itemsCollection())

  return (
    <>
      <Head>
        <title>New Order | Lifeline</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container component="main" className={classes.root}>
        <Typography component="h2" variant="h2" className={classes.pageHeader}>
          New Order
        </Typography>

        <RadioGroup row defaultValue="existing" value={userType} onChange={(event, value) => setUserType(value)}>
          <FormControlLabel value="existing" control={<Radio color="primary" />} label="Select Existing User" />
          <FormControlLabel value="new" control={<Radio color="primary" />} label="Create New User" />
        </RadioGroup>

        {userType === 'existing' ? (
          <>
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
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            )}
          </>
        ) : (
          <>
            <TextField
              className={classes.input}
              required
              label="Name"
              variant="outlined"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              className={classes.input}
              label="Phone Number"
              variant="outlined"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </>
        )}

        <Divider className={classes.divider} />

        <Autocomplete
          key={selectedItems.length}
          className={classes.input}
          options={items}
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.filterName || option.name}
          onChange={(event, value) => setSelectedItems([value, ...selectedItems])}
          renderInput={(params) => <TextField {...params} label="Item" variant="outlined" />}
          filterOptions={(options, params) => {
            const filtered = filter(options, params)

            if (params.inputValue !== '' && !filtered.find((i: Item) => i.name === params.inputValue)) {
              filtered.push({
                filterName: `Add "${params.inputValue}"`,
                cost: 0,
                name: params.inputValue,
                id: `add ${params.inputValue}`,
              })
            }

            return filtered.filter((i: Item) => !selectedItems.find(n => i.name === n.name)) as Item[]
          }}
        />

        {selectedItems.map((i, idx) =>
          <SelectedItem
            key={idx}
            name={i.name}
            quantity={4}
            onQuantityChange={() => {}}
            onDiscard={() => {
              selectedItems.splice(idx, 1)
              setSelectedItems([...selectedItems])
            }}
          />
        )}

        <Divider className={classes.divider} />

        <TextField
          className={classes.input}
          label="Meeting Location"
          variant="outlined"
        />

        <TextField
          className={classes.input}
          label="Comments"
          multiline
          rows={4}
          variant="outlined"
        />
      </Grid>
    </>
  );
}
