function mergeSort(arr, orderBy = 'asc') {
    if (arr.length < 2) {
        return [...arr];
    }
    function isNone(obj) {
        return obj === void 0 || obj === null || Object.is(obj, NaN);
    }
    function merge(left, right, orderBy) {
        let result = [];
        while (left.length > 0 && right.length > 0) {
            let a = left[0].value;
            let b = right[0].value;
            if (orderBy === 'desc') {
                [a, b] = [b, a];
            }
            if (isNone(a)) {
                result.push(left.shift());
            }
            else if (isNone(b)) {
                result.push(right.shift());
            }
            else if (a <= b) {
                result.push(left.shift());
            }
            else {
                result.push(right.shift());
            }
        }
        result = result.concat(left, right);
        return result;
    }
    const middle = Math.ceil(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    return merge(mergeSort(left, orderBy), mergeSort(right, orderBy), orderBy);
}
export function sort(arr, orderBy = 'asc') {
    return mergeSort(arr.map((value, index) => ({ index, value })), orderBy).map((x) => x.value);
}
export function sortWithKeys(arr, args) {
    function sort(arr, args) {
        if (args.length < 2) {
            return [...arr];
        }
        const [key, orderBy] = args.shift();
        const sortArr = mergeSort(arr.map((x, index) => ({ index, value: x[key] })), orderBy);
        const groups = [[arr[sortArr[0].index]]];
        for (let i = 1; i < sortArr.length; i++) {
            const group = groups[groups.length - 1];
            const el = sortArr[i];
            if (el.value === group[0][key]) {
                group.push(arr[el.index]);
            }
            else {
                groups.push([arr[el.index]]);
            }
        }
        const result = [];
        for (let i = 0; i < groups.length; i++) {
            result.push(...sort(groups[i], args));
        }
        return result;
    }
    return sort(arr, Object.entries(args));
}
