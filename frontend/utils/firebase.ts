import firebase from 'firebase/app'
import 'firebase/firestore'
import { Item, Person, WorkOrder } from '../types/types'
export const db = {
  /** People */
  peopleCollection: () => {
    return firebase
      .firestore()
      .collection('people')
      .withConverter({
        fromFirestore: (snapshot, options): Person => {
          const data = snapshot.data(options)
          return {
            name: data.name,
            phoneNumber: data['phone_number'],
            image: data.image,
            id: snapshot.id,
          }
        },
        toFirestore: (person: Person) => ({
          name: person.name,
          phone_number: person.phoneNumber,
          image: person.image,
        }),
      })
  },
  /** Work Orders */
  workOrdersCollection: () => {
    return firebase
      .firestore()
      .collection('work_orders')
      .withConverter({
        fromFirestore: (snapshot, options): WorkOrder => {
          const data = snapshot.data(options)
          console.log({ data })
          return {
            id: snapshot.id,
            created: data.created,
            location: data.location,
            status: data.status,
            notes: data.notes,
            person: data.person,
            items: data.items,
          }
        },
        toFirestore: (workOrder: WorkOrder) => ({
          created: workOrder.created,
          location: workOrder.location,
          status: workOrder.status,
          notes: workOrder.notes,
          person: workOrder.person,
          items: workOrder.items,
        }),
      })
  },
  /** Items */
  itemsCollection: () => {
    return firebase
      .firestore()
      .collection('items')
      .withConverter({
        fromFirestore: (snapshot, options): Item => {
          const data = snapshot.data(options)
          return {
            id: snapshot.id,
            cost: data.cost,
            name: data.name,
            image: data.image,
          }
        },
        toFirestore: (item: Item) => ({
          cost: item.cost,
          name: item.name,
          image: item.image,
        }),
      })
  },
}
