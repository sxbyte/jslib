function match(item, query) {
    let isMatch = true;
    for (let k in query) {
        const v = query[k];
        if (k.startsWith('$')) {
            switch (k) {
                case '$eq':
                    isMatch = item === v;
                    break;
                case '$ne':
                    isMatch = item !== v;
                    break;
                case '$gt':
                    isMatch = item > v;
                    break;
                case '$gte':
                    isMatch = item >= v;
                    break;
                case '$lt':
                    isMatch = item < v;
                    break;
                case '$lte':
                    isMatch = item <= v;
                    break;
                case '$in':
                    isMatch = v.includes(item);
                    break;
                case '$nin':
                    isMatch = !v.includes(item);
                    break;
                case '$regex':
                    isMatch = v.test(item);
                    break;
                case '$fn':
                    isMatch = v(item);
                    break;
                case '$not':
                    isMatch = !match(item, v);
                    break;
                case '$and':
                    isMatch = v.every((q) => match(item, q));
                    break;
                case '$or':
                    isMatch = v.some((q) => match(item, q));
                    break;
                case '$nor':
                    isMatch = v.every((q) => !match(item, q));
                    break;
                case '$some':
                    isMatch = item?.some((x) => match(x, v));
                    break;
                case '$every':
                    isMatch = item?.every((x) => match(x, v));
                    break;
                default:
                    break;
            }
        }
        else if (typeof v === 'object') {
            isMatch = match(item[k], v);
        }
        else {
            isMatch = item[k] === v;
        }
        if (!isMatch) {
            break;
        }
    }
    return isMatch;
}
export function search(arr, query, options) {
    const { skip = 0, limit } = options ?? {};
    const result = [];
    let num = 0;
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (match(item, query)) {
            num++;
            if (num > skip) {
                result.push(item);
            }
        }
        if (result.length === limit) {
            break;
        }
    }
    return result;
}
