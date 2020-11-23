import firebase from 'firebase/app'
import 'firebase/firestore'
import { Person, Item } from '../types/types'

export const db = {
  /** People */
  peopleCollection: () => {
    return firebase
      .firestore()
      .collection('people')
      .withConverter({
        fromFirestore: (snapshot, options): Person => {
          const data = snapshot.data(options)
          const person: Person = {
            name: data.name,
            phoneNumber: data['phone_number'],
            id: snapshot.id,
          }
          return person
        },
        toFirestore: (person: Person) => ({
          name: person.name,
          phone_number: person.phoneNumber,
        }),
      })
  },
  itemsCollection: () => {
    return firebase
      .firestore()
      .collection('items')
      .withConverter({
        fromFirestore: (snapshot, options): Item => {
          const data = snapshot.data(options)
          const item: Item = {
            name: data.name,
            id: snapshot.id
          }
          return item
        },
        toFirestore: (item: Item) => ({
          name: item.name,
        })
      })
  },
}
