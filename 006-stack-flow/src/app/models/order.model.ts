export interface BaseOrder {
  name: string;
  quantity: string;
  date: string;
}

export interface Order extends BaseOrder {
  _id: string
}

export type NewOrder = BaseOrder;