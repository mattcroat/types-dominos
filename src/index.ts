import {
  Address,
  Customer,
  Image,
  Item,
  Menu,
  NearbyStores,
  Order,
  Payment,
  Tracking,
  urls,
} from 'dominos'
import { useInternational, canada } from 'dominos/utils/urls.js'

const pizza = new Item({
  code: '16SCREEN',
  options: {
    X: { '1/1': '1' },
    C: { '1/1': '2' },
    P: { '1/2': '2' },
  },
})

const customer = new Customer({
  // todo: check if you can pass new Address instance
  address: '2 Portola Plaza, Monterey, Ca, 93940',
  firstName: 'Brandon',
  lastName: 'Miller',
  phone: '941-555-2368',
  email: 'brandon@diginow.it',
})

let storeID = 0
let distance = 100

const nearbyStores = await new NearbyStores(customer.address)

for (const store of nearbyStores.stores) {
  if (
    store.IsOnlineCapable &&
    store.IsDeliveryStore &&
    store.IsOpen &&
    store.ServiceIsOpen.Delivery &&
    store.MinDistance < distance
  ) {
    distance = store.MinDistance
    storeID = store.StoreID
    console.log(store)
  }
}

if (storeID == 0) {
  throw ReferenceError('No Open Stores')
}

const order = new Order(customer)
order.storeID = storeID

order.addItem(pizza)

await order.validate()
await order.price()

const myCard = new Payment({
  amount: order.amountsBreakdown.customer,
  number: '4100-1234-2234-3234',
  expiration: '01/35',
  securityCode: '867',
  postalCode: '93940',
  tipAmount: 4,
})

order.payments.push(myCard)

try {
  await order.place()

  const tracking = new Tracking()
  const trackingResult = await tracking.byPhone(customer.phone)
} catch (err) {
  console.dir(order.placeResponse, { depth: 5 })
}

// todo: add types for useInternational?

const myCountriesURLs = {
  referer: 'https://order.dominos.nz/en/pages/order/',
  sourceUri: 'order.dominos.nz',
  location: {
    find: urls.location.find,
  },
  store: {
    find:
      'https://order.dominos.nz/power/store-locator?s=${line1}&c=${line2}&type=${type}',
    info: 'https://order.dominos.nz/power/store/${storeID}/profile',
    menu:
      'https://order.dominos.nz/power/store/${storeID}/menu?lang=${lang}&structured=true',
  },
  order: {
    validate: 'https://order.dominos.nz/power/validate-order',
    price: 'https://order.dominos.nz/power/price-order',
    place: 'https://order.dominos.nz/power/place-order',
  },
  track: 'https://order.dominos.nz/orderstorage/GetTrackerData?',
}

useInternational(myCountriesURLs)

const address = new Address({
  street: '900 Clark Ave',
  city: 'St. Louis',
  region: 'MO',
  postalCode: '63102',
})

const address = new Address('900 Clark Ave, St. Louis, MO, 63102')

const address = new Address({
  street: '900 Clark Ave',
  city: 'St. Louis',
  postalCode: '63102',
})

const address = new Address('900 Clark Ave, St. Louis, 63102')

const fullAddressObject = new Address({
  street: '900 Clark Ave',
  postalCode: '63102',
})

const address = new Address('900 Clark Ave, 63102')

const fullAddressObject = new Address({
  postalCode: '63102',
})

const onlyZip = new Address('63102')

// todo: is there a way to throw an error if no await?
const menu = await new Menu(4337)

const productCode = 'S_PIZPX'
const savePath = './'

const pepperoniPizza = await new Image(productCode)

pepperoniPizza.base64Image

pepperoniPizza.saveSync(
  pepperoniPizza.base64Image,
  savePath,
  productCode + '.jpg'
)
