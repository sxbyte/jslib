type OrderBy = 'asc' | 'desc';
export declare function sort<T>(arr: T[], orderBy?: OrderBy): T[];
export declare function sortWithKeys<T extends {
    [k: string]: any;
}>(arr: T[], args: {
    [k in keyof T]?: OrderBy;
}): T[];
export {};
