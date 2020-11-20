import { useMemo } from 'react'
import { useTheme } from '@material-ui/core/styles'
import useWindowSize from '~/hooks/useWindowSize'

const isObject = a => a && (a.constructor === Object)

const evaluateLayer = layer => {
  if (typeof window === 'undefined') return layer

  let evaluatedLayer = {}
  Object.entries(layer).forEach(([key, entry]) => {
    if (isObject(entry)) {
      if (key.startsWith('@media')) {
        const matches = window.matchMedia(key.replace('@media', '')).matches

        if (matches) {
          evaluatedLayer = {
            ...evaluatedLayer,
            ...entry,
          }
        }
      } else {
        evaluatedLayer[key] = evaluateLayer(entry)
      }
    } else if (!evaluatedLayer[key]) {
      evaluatedLayer[key] = entry
    }
  })

  return evaluatedLayer
}

/**
 * Evaluates the theme at the given window size
 */
export default function useEvaluatedTheme() {
  const theme = useTheme()
  const { width, height } = useWindowSize()

  const evaluatedTheme = useMemo(() => evaluateLayer(theme), [theme, width, height])

  console.log(theme)

  return evaluatedTheme
}
