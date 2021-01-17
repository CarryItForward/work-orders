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
            id: snapshot.id,
          }
        },
        toFirestore: (person: Person) => ({
          name: person.name,
          phone_number: person.phoneNumber,
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
          return new WorkOrder(snapshot.id, data);
        },
        // @ts-ignore
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
          return new Item(snapshot.id, data);
        },
        toFirestore: (item: Item) => ({
          cost: item.cost,
          name: item.name,
          image: item.image,
        }),
      })
  },
}
