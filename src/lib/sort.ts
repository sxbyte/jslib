type SortArr = {
  index: number
  value: any
}[]
type OrderBy = 'asc' | 'desc'

function mergeSort(arr: SortArr, orderBy: OrderBy = 'asc'): SortArr {
  if (arr.length < 2) {
    return [...arr]
  }

  function isNone(obj: any): boolean {
    return obj === void 0 || obj === null || Object.is(obj, NaN)
  }
  function merge(left: SortArr, right: SortArr, orderBy: string): SortArr {
    let result: SortArr = []
    while (left.length > 0 && right.length > 0) {
      let a = left[0].value
      let b = right[0].value
      if (orderBy === 'desc') {
        [a, b] = [b, a]
      }
      if (isNone(a)) {
        result.push(left.shift()!)
      } else if (isNone(b)) {
        result.push(right.shift()!)
      } else if (a <= b) {
        result.push(left.shift()!)
      } else {
        result.push(right.shift()!)
      }
    }
    result = result.concat(left, right)
    return result
  }

  const middle = Math.ceil(arr.length / 2)
  const left = arr.slice(0, middle)
  const right = arr.slice(middle)
  return merge(mergeSort(left, orderBy), mergeSort(right, orderBy), orderBy)
}

export function sort<T>(arr: T[], orderBy: OrderBy = 'asc'): T[] {
  return mergeSort(arr.map((value, index) => ({ index, value })), orderBy).map((x) => x.value)
}

export function sortWithKeys<T extends { [k: string]: any }>(
  arr: T[],
  args: { [k in keyof T]?: OrderBy }
): T[] {
  function sort(arr: T[], args: [keyof T, OrderBy?][]): T[] {
    if (args.length < 2) {
      return [...arr]
    }
    const [key, orderBy] = args.shift()!
    const sortArr = mergeSort(arr.map((x, index) => ({ index, value: x[key] })), orderBy)
    const groups = [[arr[sortArr[0].index]]]
    for (let i = 1; i < sortArr.length; i++) {
      const group = groups[groups.length - 1]
      const el = sortArr[i]
      if (el.value === group[0][key]) {
        group.push(arr[el.index])
      } else {
        groups.push([arr[el.index]])
      }
    }
    const result: T[] = []
    for (let i = 0; i < groups.length; i++) {
      result.push(...sort(groups[i], args))
    }
    return result
  }
  return sort(arr, Object.entries(args))
}
