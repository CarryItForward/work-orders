import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  app: 'init',
  page: 'init',

  loading: true,
  user: null,

  drawerOpen: false,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      if (action.payload.app === 'init') delete action.payload.app
      if (action.payload.page === 'init') delete action.payload.page
      return { ...state, ...action.payload }
    case 'APP':
      return { ...state, app: action.payload }
    case 'PAGE':
      return { ...state, page: action.payload }
    case '@user/SET_USER':
      return { ...state, loading: false, user: action.payload }
    case '@drawer/SET_OPEN':
      return { ...state, drawerOpen: action.payload }
    default:
      return state
  }
}
