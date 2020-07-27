import React from 'react'
import PropTypes from 'prop-types'

import CircularProgress from '@material-ui/core/CircularProgress'
import { grey } from '@material-ui/core/colors'

import Transition from 'react-transition-group/Transition'

const defaultStyle = ({ duration }) => ({
  height: '100vh',
  width: '100vw',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  background: grey[900],
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
})

const transitionStyles = {
  entering: { opacity: 0, display: 'none' },
  entered: { opacity: 1, display: 'flex' },
  exited: { opacity: 0, display: 'none' },
}

export default function Loading({ loading, duration }) {
  return (
    <Transition in={loading} timeout={duration}>
      {(state) => (
        <div
          style={{
            ...defaultStyle({ duration }),
            ...transitionStyles[state],
          }}
        >
          <CircularProgress />
        </div>
      )}
    </Transition>
  )
}

Loading.defaultProps = {
  duration: 300,
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
  duration: PropTypes.number,
}
