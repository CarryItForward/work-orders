import createBreakpoints from '@material-ui/core/styles/createBreakpoints'
import { blue, pink } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

const breakpoints = createBreakpoints({})

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: blue[500],
    },
    secondary: {
      main: pink[500],
    },
  },
  drawer: {
    width: 256,
    [breakpoints.down('xs')]: {
      width: '75vw',
    },
  },
})

export default theme
