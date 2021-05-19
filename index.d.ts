/**
 * Requires node types
 */

/// <reference types="node" />

/**
 * Dominos
 */

declare module 'dominos' {
  /**
   * Item
   */

  type IDType = number
  type CodeType = string
  type QtyType = number
  type OptionsType = {}
  type IsNewType = boolean

  interface ItemType {
    iD?: IDType
    code: CodeType
    qty?: QtyType
    options?: OptionsType
    isNew?: IsNewType
  }

  class Item {
    public iD: IDType
    public code: CodeType
    public qty: QtyType
    // todo: check if this should be typed
    public options: OptionsType
    public isNew: IsNewType

    constructor({ iD, code, qty, options, isNew }: ItemType)
  }

  /**
   * Customer
   */

  type AddressType = Address | AddressObject | AddressStringType
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

  /**
   * NearbyStores
   */

  type PickUpType = 'Delivery' | 'Carryout' | 'all'
  type DominosAPIResponseType = Record<string, any>

  class NearbyStores {
    public address: Address
    public stores: BasicStoreInfoType[]
    public dominosAPIResponse: DominosAPIResponseType

    constructor(address: AddressType, type?: PickUpType)
  }

  /**
   * AmountsBreakdown
   */

  type FoodAndBeverageType = string
  type AdjustmentType = string
  type SurchargeType = string
  type DeliveryFeeTypr = string
  type TaxType = number
  type Tax1Type = number
  type Tax2Type = number
  type Tax3Type = number
  type Tax4Type = number
  type Tax5Type = number
  type BottleType = number
  type CustomerType = number
  type RoundingAdjustmentType = number
  type CashType = number
  type SavingsType = string

  interface AmountsBreakdownOptions {
    foodAndBeverage?: FoodAndBeverageType
    adjustment?: AdjustmentType
    surcharge?: SurchargeType
    deliveryFee?: DeliveryFeeTypr
    tax?: TaxType
    tax1?: Tax1Type
    tax2?: Tax2Type
    tax3?: Tax3Type
    tax4?: Tax4Type
    tax5?: Tax5Type
    bottle?: BottleType
    customer?: CustomerType
    roundingAdjustment?: RoundingAdjustmentType
    cash?: CashType
    savings?: SavingsType
  }

  class AmountsBreakdown {
    foodAndBeverage: FoodAndBeverageType
    adjustment: AdjustmentType
    surcharge: SurchargeType
    deliveryFee: DeliveryFeeTypr
    tax: TaxType
    tax1: Tax1Type
    tax2: Tax2Type
    tax3: Tax3Type
    tax4: Tax4Type
    tax5: Tax5Type
    bottle: BottleType
    customer: CustomerType
    roundingAdjustment: RoundingAdjustmentType
    cash: CashType
    savings: SavingsType

    constructor({
      foodAndBeverage,
      adjustment,
      surcharge,
      deliveryFee,
      tax,
      tax1,
      tax2,
      tax3,
      tax4,
      tax5,
      bottle,
      customer,
      roundingAdjustment,
      cash,
      savings,
    }: AmountsBreakdownOptions)
  }

  /**
   * Order
   */

  class Order {
    public address: Address
    public amounts: any
    public amountsBreakdown: AmountsBreakdown
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
    public metaData: any
    public newUser: boolean
    public noCombine: boolean
    public orderChannel: string
    public orderID: string
    public orderInfoCollection: []
    public orderMethod: string
    public orderTaker: string
    public partners: {}
    public payments: Payment[]
    public phone: string
    public phonePrefix: string
    public priceOrderMs: number
    public priceOrderTime: string
    public products: Item[]
    public promotions: []
    public pulseOrderGuid: string
    public serviceMethod: string
    public sourceOrganizationURI: string
    public storeID: string | number
    public tags: {}
    public userAgent: string
    public version: string

    // hidden methods
    addCustomer: (Customer) => this
    addCoupon: (couponCode: string) => this
    removeCoupon: (couponCode: string) => this
    addItem: (Item) => this
    removeItem: (Item) => this
    orderInFuture: (date: Date) => void
    orderNow: () => void
    validate: () => Promise<this>
    price: () => Promise<this>
    place: () => Promise<this>

    // hidden fields
    payload: string
    formatted: {}
    validationResponse: {}
    priceResponse: {}
    placeResponse: {}

    constructor(customer: CustomerType)
  }

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
    number: NumberType
    expiration: ExpirationType
    securityCode: SecurityCodeType
    postalCode: PostalCodeType
  }

  class Payment {
    public type: PaymentType
    public amount: AmountType
    public tipAmount: TipAmountType
    public number: NumberType
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

  /**
   * Tracking
   */

  type PhoneType = string
  type StoreIDType = string | number
  type OrderKeyType = string

  class Tracking {
    public byPhone: (phone: PhoneType) => Promise<this>
    public byPhoneClassic: (phone: PhoneType) => Promise<this>
    public byId: (storeID: StoreIDType, orderKey: OrderKeyType) => Promise<this>
    public byUrl: (url: URL) => Promise<this>

    public version: number
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

  class Menu {
    public menu: MenuType

    constructor(storeID: StoreIDType, lang?: LanguageType)
  }

  /**
   * Store
   */

  type BasicStoreInfoType = {
    StoreID: StoreIDType
    IsDeliveryStore: boolean
    MinDistance: number
    MaxDistance: number
    Phone: PhoneType
    AddressDescription: string
    HolidaysDescription: string
    HoursDescription: string
    ServiceHoursDescription: {
      Carryout: string
      Delivery: string
      DriveUpCarryout: string
    }
    IsOnlineCapable: boolean
    IsOnlineNow: boolean
    IsNEONow: boolean
    IsSpanish: boolean
    LocationInfo: string
    LanguageLocationInfo: { en: string; es: string }
    AllowDeliveryOrders: boolean
    AllowCarryoutOrders: boolean
    AllowDuc: boolean
    ServiceMethodEstimatedWaitMinutes: {
      Delivery: { Min: number; Max: number }
      Carryout: { Min: number; Max: number }
    }
    StoreCoordinates: { StoreLatitude: string; StoreLongitude: string }
    AllowPickupWindowOrders: boolean
    ContactlessDelivery: string
    ContactlessCarryout: string
    IsOpen: boolean
    ServiceIsOpen: {
      Carryout: boolean
      Delivery: boolean
      DriveUpCarryout: boolean
    }
  }

  class Store {
    public menu: MenuType
    public info: BasicStoreInfoType

    constructor(storeID: StoreIDType, lang?: LanguageType)
  }

  /**
   * Image
   */

  type ProductCodeType = string
  type Base64ImageType = string

  class Image extends Base64File {
    public base64Image: Base64ImageType

    constructor(productCode: ProductCodeType)
  }
}

/**
 * Base64File
 */

type NodeFetchOptions = {
  method?: string
  headers?: {}
  body?: null | string | BufferSource | Blob | ReadableStream
  redirect?: 'error' | 'follow' | 'manual'
  signal?: AbortSignal | null
  follow?: number
  compress?: boolean
  size?: number
  // todo: add type
  agent?: Agent | ((parsedUrl: URL) => Agent)
  highWaterMark?: number
  insecureHTTPParser?: boolean
}

class Base64File {
  load: (
    path: string,
    fileName: string,
    callback: (err: Error, data: string) => void
  ) => void
  loadSync: (path: string, fileName: string) => void
  loadRemote: (url: string, fileName: string, options: NodeFetchOptions) => void
  save: (
    data: string,
    path: string,
    fileName: string,
    callback: (err: Error, data: string) => void
  ) => void
  saveSync: (data: string, path: string, fileName: string) => void
}
