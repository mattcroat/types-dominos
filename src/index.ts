import { Item } from 'dominos'

// todo: add types for members
// todo: add types for options
// https://stackoverflow.com/questions/46969551/constructor-in-typescript-interface
const pizza = new Item({
  code: '16SCREEN',
  options: {
    X: { '1/1': '1' },
    C: { '1/1': '2' },
    P: { '1/2': '2' },
  },
})

console.dir(pizza)
