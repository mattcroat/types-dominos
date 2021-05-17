/**
 * Item
 */

type IDType = number
type CodeType = string
type QtyType = number
type OptionsType = {
  [key: string]: Record<string, string>
}
type IsNewType = boolean

interface ItemType {
  iD?: IDType
  code: CodeType
  qty?: QtyType
  options?: OptionsType
  isNew?: IsNewType
}

/**
 * Customer
 */

// todo: this can be a string or Address instance
type AddressType = AddressObject | AddressStringType
type FirstNameType = string
type LastNameType = string
type EmailType = string
type PhoneType = string
type PhonePrefixType = string

interface CustomerType {
  address: AddressType
  firstName: FirstNameType
  lastName: LastNameType
  email: EmailType
  phone: PhoneType
  phonePrefix?: PhonePrefixType
}

/**
 * Address
 */

type StreetType = string
type StreetNameType = string
type StreetNumberType = string
type UnitTypeType = string
type UnitNumberType = string
type CityType = string
type RegionType = string
type PostalCodeType = string
type DeliveryInstructionsType = string

interface AddressObject {
  street?: StreetType
  streetName?: StreetNameType
  streetNumber?: StreetNumberType
  unitType?: UnitTypeType
  unitNumber?: UnitNumberType
  city?: CityType
  region?: RegionType
  postalCode?: PostalCodeType
  deliveryInstructions?: DeliveryInstructionsType
}

type AddressStringType = string

/**
 * NearbyStores
 */

type PickUpTypeType = 'Delivery' | 'Carryout' | 'all'

/**
 * Payment
 */

type AmountType = number
type TipAmountType = number
type NumberType = string
type ExpirationType = string
type SecurityCodeType = string
type PostalCodeType = string

type PaymentType = 'CreditCard'
type CardType =
  | 'VISA'
  | 'MASTERCARD'
  | 'AMEX'
  | 'DINERS'
  | 'DISCOVER'
  | 'JCB'
  | 'ENROUTE'

interface PaymentOptions {
  amount?: AmountType
  tipAmount?: TipAmountType
  number: Number
  expiration: ExpirationType
  securityCode: SecurityCodeType
  postalCode: PostalCodeType
}

/**
 * Menu
 */

type StoreIDType = number | string
// todo: add language suggestions? might not be future proof
type LanguageType = string
// todo: add description from docs to each field
interface MenuType {
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

type ProductCodeType = string
type Base64ImageType = string

/**
 * Dominos
 */

declare module 'dominos' {
  class Item {
    public iD: IDType
    public code: CodeType
    public qty: QtyType
    public options: OptionsType
    public isNew: IsNewType

    constructor({ iD, code, qty, options, isNew }: ItemType)
  }

  class Customer {
    public address: AddressType
    public firstName: FirstNameType
    public lastName: LastNameType
    public email: EmailType
    public phone: PhoneType
    public phonePrefix: PhonePrefixType

    constructor({
      address,
      firstName,
      lastName,
      email,
      phone,
      phonePrefix,
    }: CustomerType)
  }

  class NearbyStores {
    public address: AddressType
    // todo: Array of basic store objects
    public stores: []
    // todo dominosAPIResponse Object
    public dominosAPIResponse: any

    constructor(address: AddressType, type?: PickUpTypeType)
  }

  class Order {
    // todo: check if this is the instance
    public address: AddressType
    // todo: ?
    public amounts: any
    // todo: AmountsBreakdown
    public amountsBreakdown: any
    public businessDate: string
    public coupons: []
    public currency: string
    public customerID: string
    public estimatedWaitMinutes: string
    public email: string
    public extension: string
    public firstName: string
    public hotspotsLite: boolean
    public iP: string
    public lastName: string
    public languageCode: string
    public market: string
    // todo: ?
    public metaData: any
    public newUser: boolean
    public noCombine: boolean
    public orderChannel: string
    public orderID: string
    public orderInfoCollection: []
    public orderMethod: string
    public orderTaker: string
    // todo: ?
    public partners: any
    // todo: Array of payment instances
    public payments: any
    public phone: string
    public phonePrefix: string
    public priceOrderMs: number
    public priceOrderTime: string
    // todo: array of item instances
    public products: []
    public promotions: []
    public pulseOrderGuid: string
    public serviceMethod: string
    public sourceOrganizationURI: string
    public storeID: string | number
    // todo: ?
    public tags: any
    public userAgent: string
    public version: string

    //  todo: do I include hidden fields?

    // todo: can you use another class as type?
    constructor(customer: CustomerType)
  }

  class Payment {
    // todo: ?
    public type: PaymentType
    public amount: AmountType
    public tipAmount: TipAmountType
    public number: Number
    public cardType: CardType
    public expiration: ExpirationType
    public securityCode: SecurityCodeType
    public postalCode: PostalCodeType

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
    // todo: actually returns promise
    public byPhone: (phone: string) => this
    public byPhoneClassic: (phone: string) => this
    // todo: it's easier finding waldo than these
    public byId: (storeID: string | number, orderKey: string) => this
    public byUrl: (url: string) => this

    // todo: do I add hidden methods?
  }

  class Address {
    public street: StreetType
    public streetNumber: StreetNameType
    public streetName: StreetNumberType
    public unitType: UnitTypeType
    public unitNumber: UnitNumberType
    public city: CityType
    public region: RegionType
    public postalCode: PostalCodeType
    public deliveryInstructions: DeliveryInstructionsType

    constructor(address: AddressType)
  }

  class Menu {
    public menu: MenuType

    constructor(storeID: StoreIDType, lang?: LanguageType)
  }

  class Store {
    public menu: MenuType
    public info: InfoType

    constructor(storeID: StoreIDType, lang?: LanguageType)
  }

  class Image {
    public base64Image: Base64ImageType

    constructor(productCode: ProductCodeType)
  }
}
