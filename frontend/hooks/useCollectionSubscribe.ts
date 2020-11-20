import firebase from 'firebase/app'
import 'firebase/firestore'
import React from 'react'

/** Set up firebase subscription */
export const useCollectionSubscribe = <T>(collection: firebase.firestore.Query<T>) => {
  const [current, setCurrent] = React.useState<T[]>([])

  React.useEffect(() => {
    let active = true
    console.log(`new subscription`)
    const unsub = collection.onSnapshot((snapshot) => {
      if (active) {
        setCurrent(snapshot.docs.map((doc) => doc.data()))
      }
    })

    return () => {
      unsub()
      active = false
    }
  }, [])

  return current
}
