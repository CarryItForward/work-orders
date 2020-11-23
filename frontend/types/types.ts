import firebase from 'firebase/app'

export interface Person {
  image: string
  name: string
  phoneNumber: string
  id: string
}

export interface WorkOrder {
  id: string
  location: firebase.firestore.GeoPoint
  person: firebase.firestore.DocumentReference<Person>
  status: number
  created: firebase.firestore.Timestamp
  items: WorkOrderItem[]
  notes: string
}

export interface WorkOrderItem {
  itemRef: firebase.firestore.DocumentReference<Item>
  quantity: number
}

export interface Item {
  id: string
  cost: number
  image: string
  name: string
}
