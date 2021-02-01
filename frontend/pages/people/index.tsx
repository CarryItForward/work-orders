import { Link } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import NextLink from 'next/link'
import React from 'react'
import { useCollectionSubscribe } from '../../hooks/useCollectionSubscribe'
import { Person } from '../../types/types'
import { db } from '../../utils/firebase'

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

const columns: (keyof Person)[] = ['name', 'phoneNumber', 'id']

export default function AllPeople() {
  const classes = useStyles()

  const people = useCollectionSubscribe(db.peopleCollection())
  console.log('chicken')
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
            {people.map((person) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={person.name}>
                  {columns.map((column) => {
                    const value = person[column]
                    console.log(column)
                    return (
                      <TableCell key={column}>
                        {column === 'name' ? (
                          <Link component={NextLink} href={`/people/${person.id}`}>
                            {value}
                          </Link>
                        ) : (
                          value
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
