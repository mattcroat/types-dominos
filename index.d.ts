type ItemParameters = {
  /**
   * This number will auto increment with each item created, you do not need to do anything unless you want specific ids on your items.
   */
  ID?: number
  /**
   * The product code, like 14SCREEN for a 14' cheese pizza
   */
  code: '14SCREEN'
  /**
   * The quantity of the item to order, defaults to 1 if not specified
   */
  qty?: number
  /**
   * The special options for these items, options supported for various products can be found in the menu entries for the item
   */
  options?: {
    [key: string]: {
      [key: string]: string
    }
  }
  /**
   * Suggested you do not modify this. Tells the dominos api if this is a new item. If set to false, dominos will not return duplicate information for this item
   */
  isNew?: boolean
}

declare module 'dominos' {
  export class Order {}

  export class Customer {}

  /**
   * Items are used to track what products, quantities, and options a customer would like to Order.
   */
  export class Item {
    constructor(parameters: ItemParameters)
  }

  export class Payment {}

  export class NearbyStores {}

  export class Tracking {}

  export class Address {}

  export class Store {}

  export class Menu {}

  export class Image {}
}
