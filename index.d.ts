/**
 * Item
 */

type ID = number
type Code = string
type Qty = number
type Options = {
  [key: string]: Record<string, string>
}
type IsNew = boolean

type ItemOptions = {
  iD?: ID
  code: Code
  qty?: Qty
  options?: Options
  isNew?: IsNew
}

/**
 * Customer
 */

// todo: this can be a string or Address instance
type AddressType = AddressObject | AddressString
type FirstName = string
type LastName = string
type Email = string
type Phone = string
type PhonePrefix = string

type CustomerOptions = {
  address: AddressType
  firstName: FirstName
  lastName: LastName
  email: Email
  phone: Phone
  phonePrefix?: PhonePrefix
}

/**
 * Address
 */

type Street = string
type StreetName = string
type StreetNumber = string
type UnitType = string
type UnitNumber = string
type City = string
type Region = string
type PostalCode = string
type DeliveryInstructions = string

type AddressObject = {
  street?: Street
  streetName?: StreetName
  streetNumber?: StreetNumber
  unitType?: UnitType
  unitNumber?: UnitNumber
  city?: City
  region?: Region
  postalCode?: PostalCode
  deliveryInstructions?: DeliveryInstructions
}

type AddressString = string

/**
 * NearbyStores
 */

type PickUpType = 'Delivery' | 'Carryout' | 'all'

/**
 * Payment
 */

type Amount = number
type TipAmount = number
type Number = string
type Expiration = string
type SecurityCode = string
type PostalCode = string

type PaymentType = 'CreditCard'
type CardType =
  | 'VISA'
  | 'MASTERCARD'
  | 'AMEX'
  | 'DINERS'
  | 'DISCOVER'
  | 'JCB'
  | 'ENROUTE'

type PaymentOptions = {
  amount?: Amount
  tipAmount?: TipAmount
  number: Number
  expiration: Expiration
  securityCode: SecurityCode
  postalCode: PostalCode
}

/**
 * Menu
 */

type StoreID = number | string
// todo: add language suggestions? might not be future proof
type Language = string
// todo: add description from docs to each field
type MenuType = {
  categories: {}
  coupons: {
    products: {}
    shortCouponDescriptions: {}
    couponTiers: {}
  }
  flavors: {}
  products: {}
  sides: {}
  sizes: {}
  toppings: {}
  variants: {}
  preconfiguredProducts: {}
  shortProductDescriptions: {}
  unsupported: {
    products: {}
    options: {}
  }
  cooking: {
    instructions: {}
    instructionGroups: {}
  }
}

/**
 * Store
 */

// todo: should include massive object?
type InfoType = Record<string, string>

/**
 * Image
 */

type ProductCode = string
type Base64Image = string

/**
 * Dominos
 */

declare module 'dominos' {
  class Item {
    iD: ID
    code: Code
    qty: Qty
    options: Options
    isNew: IsNew

    constructor({ iD, code, qty, options, isNew }: ItemOptions)
  }

  class Customer {
    address: AddressType
    firstName: FirstName
    lastName: LastName
    email: Email
    phone: Phone
    phonePrefix: PhonePrefix

    constructor({
      address,
      firstName,
      lastName,
      email,
      phone,
      phonePrefix,
    }: CustomerOptions)
  }

  class NearbyStores {
    address: AddressType
    // todo: Array of basic store objects
    stores: []
    // todo dominosAPIResponse Object
    dominosAPIResponse: any

    constructor(address: AddressType, type?: PickUpType)
  }

  class Order {
    // todo: check if this is the instance
    address: AddressType
    // todo: ?
    amounts: any
    // todo: AmountsBreakdown
    amountsBreakdown: any
    businessDate: string
    coupons: []
    currency: string
    customerID: string
    estimatedWaitMinutes: string
    email: string
    extension: string
    firstName: string
    hotspotsLite: boolean
    iP: string
    lastName: string
    languageCode: string
    market: string
    // todo: ?
    metaData: any
    newUser: boolean
    noCombine: boolean
    orderChannel: string
    orderID: string
    orderInfoCollection: []
    orderMethod: string
    orderTaker: string
    // todo: ?
    partners: any
    // todo: Array of payment instances
    payments: any
    phone: string
    phonePrefix: string
    priceOrderMs: number
    priceOrderTime: string
    // todo: array of item instances
    products: []
    promotions: []
    pulseOrderGuid: string
    serviceMethod: string
    sourceOrganizationURI: string
    storeID: string | number
    // todo: ?
    tags: any
    userAgent: string
    version: string

    //  todo: do I include hidden fields?

    // todo: can you use another class as type?
    constructor(customer: CustomerOptions)
  }

  class Payment {
    // todo: ?
    type: PaymentType
    amount: Amount
    tipAmount: TipAmount
    number: Number
    cardType: CardType
    expiration: Expiration
    securityCode: SecurityCode
    postalCode: PostalCode

    constructor({
      amount,
      tipAmount,
      number,
      expiration,
      securityCode,
      postalCode,
    }: PaymentOptions)
  }

  class Tracking {
    // todo: actually returns itself, figure out if this works
    byPhone: (phone: string) => this
    byPhoneClassic: (phone: string) => this
    // todo: it's easier finding waldo than these
    byId: (storeID: string | number, orderKey: string) => this
    byUrl: (url: string) => this

    // todo: do I add hidden methods?
  }

  class Address {
    street: Street
    streetNumber: StreetName
    streetName: StreetNumber
    unitType: UnitType
    unitNumber: UnitNumber
    city: City
    region: Region
    postalCode: PostalCode
    deliveryInstructions: DeliveryInstructions

    constructor(address: AddressType)
  }

  class Menu {
    menu: MenuType

    constructor(storeID: StoreID, lang?: Language)
  }

  class Store {
    menu: MenuType
    info: InfoType

    constructor(storeID: StoreID, lang?: Language)
  }

  class Image {
    base64Image: Base64Image

    constructor(productCode: ProductCode)
  }
}
