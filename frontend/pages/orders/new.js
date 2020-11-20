import React, { useState, useEffect } from 'react'
import Head from 'next/head'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Autocomplete from '@material-ui/lab/Autocomplete'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'

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
  }
});

export default function NewOrder() {
  const [userType, setUserType] = useState('existing')
  const [selectedUser, setSelectedUser] = useState(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const classes = useStyles();

  useEffect(() => {
    setName(selectedUser ? selectedUser.name : '')
    setPhone(selectedUser ? selectedUser.phone : '')
  }, [selectedUser])

  useEffect(() => {
    if (userType === 'existing' && selectedUser) {
      setName(selectedUser.name)
      setPhone(selectedUser.phone)
    } else {
      setName('')
      setPhone('')
    }
  }, [userType])

  const people = [
    { name: 'Leslie Knope', phone: '541-000-000' },
    { name: 'Ron Swanson', phone: '541-111-1111' },
    { name: 'Ann Perkins', phone: '541-222-2222' },
    { name: 'Tom Haverford', phone: '541-333-3333' },
    { name: 'Mark Brendanawicz', phone: '541-444-4444' },
    { name: 'April Ludgate', phone: '541-555-5555' },
    { name: 'Ben Wyatt', phone: '541-666-6666' },
    { name: 'Jerry Gergich', phone: '541-777-7777' },
    { name: 'Chris Traeger', phone: '541-888-8888' },
    { name: 'Andy Dwyer', phone: '541-999-9999' },
  ].sort((a, b) => a.name > b.name ? 1 : -1)

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

        <TextField
          className={classes.input}
          label="Meeting Location"
          variant="outlined"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />

        <TextField
          className={classes.input}
          label="Meeting Location"
          variant="outlined"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />

        <TextField
          className={classes.input}
          label="Meeting Location"
          variant="outlined"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />

        <Divider className={classes.divider} />

        <TextField
          className={classes.input}
          label="Meeting Location"
          variant="outlined"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
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
