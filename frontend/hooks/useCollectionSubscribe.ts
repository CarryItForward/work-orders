import firebase from 'firebase/app'
import 'firebase/firestore'
import React from 'react'

/** Set up firebase subscription */
export const useCollectionSubscribe = <T>(collection: firebase.firestore.Query<T>) => {
  const [current, setCurrent] = React.useState<T[]>([])

  React.useEffect(() => {
    let active = true
    console.log(`new collection subscription`)
    const unsub = collection.onSnapshot((snapshot) => {
      if (active) {
        setCurrent(snapshot.docs.map((doc) => doc.data()))
      }
    })

    return () => {
      unsub()
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return current
}

export const useDocSubscribe = <T>(doc: firebase.firestore.DocumentReference<T>) => {
  const [current, setCurrent] = React.useState<T>()

  React.useEffect(() => {
    let active = true
    console.log(`new doc subscription`)
    const unsub = doc.onSnapshot((snapshot) => {
      if (active) {
        setCurrent(snapshot.data())
      }
    })

    return () => {
      unsub()
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return current
}
