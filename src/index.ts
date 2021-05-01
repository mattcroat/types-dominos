import { Item } from 'dominos'

// https://github.com/microsoft/TypeScript/issues/8335
// https://www.typescriptlang.org/docs/handbook/modules.html

// console.log(
//   Object.getOwnPropertyNames(Item).filter((f) => typeof Item[f] === 'function')
// )

const pizza = new Item({
  ID: 1,
  code: '14SCREEN',
  options: {
    X: { '1/1': '1' },
    C: { '1/1': '2' },
  },
})
