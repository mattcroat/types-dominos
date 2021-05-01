import { Address } from 'dominos'

type Item = {
  /**
   * This number will auto increment with each item created, you do not need to do anything unless you want specific ids on your items.
   */
  ID?: number
  /**
   * The product code, like 14SCREEN for a 14' cheese pizza
   */
  code: string
  /**
   * The quantity of the item to order, defaults to 1 if not specified
   */
  qty?: number
  /**
   * The special options for these items, options supported for various products can be found in the menu entries for the item
   */
  options?: {
    [key: string]: Record<string, string>
  }
  /**
   * Suggested you do not modify this. Tells the dominos api if this is a new item. If set to false, dominos will not return duplicate information for this item
   */
  isNew?: boolean
}

type AddressObject = {
  /**
   * Street address (most commonly used to combine street number, name and apartment number)
   */
  street?: string
  /**
   * Street name
   */
  streetName?: string
  /**
   * Street number
   */
  streetNumber?: string
  /**
   * Unit type: suite, apartment, etc.
   */
  unitType?: string
  /**
   * Apartment number
   */
  unitNumber?: string
  /**
   * Address city
   */
  city?: string
  /**
   * In the US this would be the state. In other countries it may be the province, or prefecture.
   */
  region?: string
  /**
   * Address postal, or zip code
   */
  postalCode?: string
  /**
   * This is for special instructions, like "ring the bell", or "please don't give the Pizza to the old lady out front, she is not my Grandma, and always steals my food deliveries".
   */
  deliveryInstructions?: string
}

/**
 * Address string
 */
type AddressString = string

// todo: inquire if phonePrefix is used

type Customer = {
  /**
   * Customers address
   */
  address: Address
  /**
   * First name
   */
  firstName: string
  /**
   * Last name
   */
  lastName: string
  /**
   * Email
   */
  email: string
  /**
   * Phone
   */
  phone: string
  /**
   * Phone prefix
   */
  phonePrefix?: string
}

/**
 * Pick up type
 */
type PickUpType = 'Delivery' | 'Carryout' | 'all'

type Payment = {
  /**
   * Amount ot pay with the card
   */
  amount?: number
  /**
   * Amount of the payment that is a tip
   */
  tipAmount?: number
  /**
   * Credit card number sanitized when instantiatied per Domino's rules (numbers only)
   */
  number: string
  /**
   * Credit card expiration sanitized when instantiatied per Domino's rules (numbers only)
   */
  expiration: string
  /**
   * Credit card security code
   */
  securityCode: string
  /**
   * Credit card billing postal/zip code
   */
  postalCode: string
}

/**
 * Store ID
 */
type StoreID = number | string

/**
 * Language (default is 'en')
 */
type Language = string

/**
 * Product code from the menu
 */
type ProductCode = string

declare module 'dominos' {
  /**
   * This is the primary Order Class used for ordering Domino's food
   */
  export class Order {
    constructor(customer: Customer)
  }

  /**
   * The customer class is used to create a customer instance for a Domino's Pizza Order.
   */
  export class Customer {
    constructor(parameters: Customer)
  }

  /**
   * Items are used to track what products, quantities, and options a customer would like to Order.
   */
  export class Item {
    constructor(parameters: Item)
  }

  /**
   * This Class will initialize a creditcard payment object for an order
   */
  export class Payment {
    constructor(paramaters: Payment)
  }

  /**
   * NearbyStores is constructed async, so when you instantiate it, you should await it, like this: `const nearbyStores = await new NearbyStores(...)`. This will work in your main Node code without wrapping it in an anonymous async function.
   */
  export class NearbyStores {
    // todo: requires clarification
    // todo: does addressInstance represent `new NearbyStores(new Address(...))`
    constructor(
      addressInstance?: unknown,
      addressObject?: AddressObject,
      addressString?: AddressString,
      pickUpType?: PickUpType
    )
  }

  /**
   * This is how to track an order/orders progress.
   *
   * There are a couple ways to do it, but the most common way is `.byPhone`.
   *
   * Rely on the `order.place` response as well. If the order fails, it will throw a `DominosPlaceOrderError`. Otherwise, your pizza is on the way.
   *
   * You can track its progress, who is working on it, who your delivery person is, and how many stops they have before you using this Class.
   *
   * If there are no orders for a given phone number, it will throw a `DominosTrackingError`.
   */
  export class Tracking {}

  /**
   * This is the primary Address Class used for all things Domino's.
   */
  export class Address {
    constructor(addressObject?: AddressObject, addressString?: AddressString)
  }

  /**
   * Store is constructed async, so when you instantiate it, you should await it, like this: `const store = await new Store(...)`. This will work in your main Node code without wrapping it in an anonymous async function.
   */
  export class Store {
    constructor(storeID: StoreID, lang?: Language)
  }

  /**
   * Menu is constructed `async`, so when you instantiate it, you should await it, like this: `const menu = await new Menu(...)`. This will work in your main Node code without wrapping it in an anonymous async function.
   */
  export class Menu {
    constructor(storeID: StoreID, lang: Language)
  }

  /**
   * The Image Class will grab the image for a product code and Base64 encode it.
   */
  export class Image {
    constructor(productCode: ProductCode)
  }
}
