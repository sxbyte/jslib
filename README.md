## Install

```shell
npm i github:sxbyte/jslib#<version>
```

## Usage

```js
import * as _ from 'jslib'

// cls
console.log(_.cls({ 'my-class': true }))

// delay
await _.delay(1000)

// debounce
const debounceFn = _.debounce(() => 'debounce', 1000)
console.log(await debounceFn())

// throttle
const throttleFn = _.throttle(() => 'throttle', 1000)
console.log(throttleFn())

// uid
console.log(_.uid())

// sort
console.log(_.sort([1, 2, 3], 'asc'))
console.log(_.sort([1, 2, 3], 'desc'))

// sortWithKeys
console.log(_.sortWithKeys(
  [
    { id: 1, name: 'a' },
    { id: 2, name: 'b' },
    { id: 3, name: 'c' },
    { id: 4, name: 'c' }
  ],
  { name: 'desc', id: 'asc' }
))

// search
const data = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 3, name: 'c' },
  { id: 4, name: 'c' }
]
console.log(_.search(data, { id: 1 }))
console.log(_.search(data, { id: { $eq: 1 } })) // $eq, $ne, $gt, $gte, $lt, $lte
console.log(_.search(data, { id: { $in: [1, 2] } })) // $in, $nin
console.log(_.search(data, { name: { $regex: /a/ } }))
console.log(_.search(data, { id: { $fn: (v) => v === 1 } }))
console.log(_.search(data, { $not: { id: 1 } }))
console.log(_.search(data, { $and: [{ id: 3 }, { name: 'c' }] })) // $and, $or, $nor
console.log(_.search(data, { name: 'c' }, { skip: 1 }))
console.log(_.search(data, { name: 'c' }, { limit: 1 }))
```
