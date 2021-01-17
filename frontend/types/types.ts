import firebase from 'firebase/app'
import { db } from '../utils/firebase'

export interface Person {
  name: string
  phoneNumber: string
  id: string
}

export class WorkOrder {
  id: string
  location: string
  personRef?: firebase.firestore.DocumentReference<Person>
  person: Person
  status: number
  created: firebase.firestore.Timestamp
  items: WorkOrderItem[]
  notes: string

  constructor(id: string, data: any) {
    this.id = id;
    this.location = data.location;
    this.personRef = data.person;
    this.status = data.status;
    this.created = data.created;
    this.items = data.items;
    this.notes = data.notes;
  }

  async populate() {
    this.person = (await this.personRef.get()).data()
    this.items = await Promise.all(
      this.items.map(
        async workOrderItem => ({
          ...workOrderItem,
          item: (await workOrderItem.itemRef.get()).data()
        })
      )
    )

    return this
  }
}

export interface WorkOrderItem {
  itemRef: firebase.firestore.DocumentReference<Item>
  item?: Item
  quantity: number
}

export class Item {
  id: string
  cost: number
  image: string
  name: string
  filterName?: string

  constructor(id: string, data: any) {
    this.id = id;
    this.cost = data.cost;
    this.image = data.image;
    this.name = data.name;
    this.filterName = data.filterName;
  }

  toWorkOrderItem(quantity = 0) {
    return {
      itemRef: db.itemsCollection().doc(this.id),
      item: this,
      quantity,
    } as WorkOrderItem
  }
}
