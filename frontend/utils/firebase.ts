import firebase from 'firebase/app'
import 'firebase/firestore'
import { Person } from '../types/types'
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
            image: data.image,
            id: snapshot.id,
          }
          return person
        },
        toFirestore: (person: Person) => ({
          name: person.name,
          phone_number: person.phoneNumber,
          image: person.image,
        }),
      })
  },
}
