interface Query {
    $eq: any;
    $ne: any;
    $gt: any;
    $gte: any;
    $lt: any;
    $lte: any;
    $in: any[] | string;
    $nin: any[] | string;
    $regex: RegExp;
    $fn: Function;
    $not: Query;
    $and: Query;
    $or: Query;
    $nor: Query;
    $some: Query[];
    $every: Query[];
    [k: string]: any;
}
export declare function search<T>(arr: T[], query: Query, options?: {
    skip?: number;
    limit?: number;
}): T[];
export {};
